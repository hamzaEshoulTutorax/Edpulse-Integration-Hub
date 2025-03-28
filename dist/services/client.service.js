"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const tutor_cruncher_client_1 = require("../clients/tutor-cruncher.client");
const supabase_client_1 = require("../clients/supabase.client");
const asana_client_1 = require("../clients/asana.client");
const branch_service_1 = require("./branch.service");
const client_utils_1 = require("../utils/client.utils");
const date_utils_1 = require("../utils/date.utils");
const string_utils_1 = require("../utils/string.utils");
const reason_constants_1 = require("../constants/reason.constants");
class ClientService {
    constructor() {
        this.tutorCruncherClient = new tutor_cruncher_client_1.TutorCruncherClient();
        this.supabaseClient = new supabase_client_1.SupabaseClient();
        this.asanaClient = new asana_client_1.AsanaClient();
        this.branchService = new branch_service_1.BranchService();
    }
    async deleteClient(clientId, metadata) {
        try {
            console.log(`Starting deletion process for client ${clientId}`);
            // Extract necessary data from metadata
            const branchId = metadata.branch_id;
            const adminName = metadata.admin_name || metadata.admin_email;
            const reasonId = metadata.reason_id;
            const deletionReason = reason_constants_1.REASON_ID_TO_TEXT[reasonId] || "Autre";
            const otherReason = (0, string_utils_1.sanitize)(metadata.other_reason || "");
            // Get branch token and name
            const branchToken = this.branchService.getBranchToken(branchId);
            const branchName = this.branchService.getBranchName(branchId);
            if (!branchToken) {
                throw new Error(`Invalid branch ID or missing token: ${branchId}`);
            }
            // Step 1: Check if client exists
            const clientData = await this.tutorCruncherClient.getClient(clientId, branchToken);
            if (!clientData || !clientData.id) {
                return {
                    doesClientExist: 0,
                    message: "Client does not exist",
                };
            }
            // Step 2: Format client data before deletion (for logging/reference)
            const formattedClientData = (0, client_utils_1.formatClientData)(clientData, branchId);
            // Step 3: Update client notes with deletion information
            const todayDate = (0, date_utils_1.getTodayDateShort)();
            const noteToAdd = `${todayDate} : ${otherReason} (${adminName})`;
            const notesFieldName = (0, client_utils_1.getNotesFieldName)(branchId);
            await this.tutorCruncherClient.updateClientNotes(clientData, notesFieldName, noteToAdd, branchToken);
            // Step 4: Store client data in Supabase
            await this.storeDeletedClientInSupabase(clientId, formattedClientData, adminName, deletionReason, otherReason, branchName);
            // Step 5: Update client status in KPIs
            try {
                await this.supabaseClient.updateClientStatusInKpis(clientId, adminName);
                console.log(`Updated KPI status for client ${clientId}`);
            }
            catch (error) {
                console.error(`Failed to update KPI status for client ${clientId}:`, error);
                // Non-critical error, continue with deletion
            }
            // Step 6: Create Asana task
            try {
                await this.createAsanaTask(clientId, formattedClientData, adminName, reasonId, otherReason, branchId);
                console.log(`Created Asana task for client ${clientId}`);
            }
            catch (error) {
                console.error(`Failed to create Asana task for client ${clientId}:`, error);
                // Non-critical error, continue with deletion
            }
            // Step 7: Delete the client from TutorCruncher
            await this.tutorCruncherClient.deleteClient(clientId, branchToken);
            console.log(`Completed deletion for client ${clientId}`);
            // Return result
            return {
                doesClientExist: 1,
                formattedClientData,
                message: "Client deleted successfully",
            };
        }
        catch (error) {
            console.error(`Error deleting client ${clientId}:`, error);
            return {
                doesClientExist: 0,
                error: error.message,
            };
        }
    }
    async storeDeletedClientInSupabase(clientId, formattedClientData, adminName, deletionReason, deletionDetails, branch) {
        try {
            // Check if client already exists in deleted_clients table
            const clientExists = await this.supabaseClient.clientExistsInDeletedClients(clientId);
            if (clientExists) {
                console.log(`Client ${clientId} already exists in deleted_clients table. Skipping insertion.`);
                return;
            }
            // Store in Supabase
            await this.supabaseClient.addDeletedClient({
                client_id: clientId,
                client_name: formattedClientData.fullName,
                admin_name: adminName,
                deletion_reason: deletionReason,
                deletion_details: deletionDetails,
                branch: branch,
                client_created_at: formattedClientData.dateCreated,
            });
            console.log(`Successfully stored client ${clientId} in Supabase`);
        }
        catch (error) {
            console.error(`Error storing client ${clientId} in Supabase:`, error);
            // We don't throw the error as this is not a critical failure
            // The main deletion process can continue even if Supabase storage fails
        }
    }
    async createAsanaTask(clientId, formattedClientData, adminName, reasonId, deletionDetails, branchId) {
        try {
            // Get Asana section ID for the branch
            const asanaSectionId = this.branchService.getAsanaSectionId(branchId);
            if (!asanaSectionId) {
                console.error(`No Asana section ID found for branch ${branchId}`);
                return null;
            }
            // Get Asana reason field ID
            const asanaReasonId = this.getAsanaReasonFieldId(reasonId);
            if (!asanaReasonId) {
                console.error(`No Asana reason field ID found for reason ${reasonId}`);
                return null;
            }
            // Prepare client data for Asana
            const clientDataWithId = {
                ...formattedClientData,
                clientId,
            };
            // Format task data for Asana
            const taskData = this.asanaClient.formatClientDeletionTask(clientDataWithId, adminName, asanaReasonId, asanaSectionId, deletionDetails);
            // Create task in Asana
            const result = await this.asanaClient.createTask(taskData);
            console.log(`Successfully created Asana task for client ${clientId}: ${result.data.gid}`);
            return result;
        }
        catch (error) {
            console.error(`Error creating Asana task for client ${clientId}:`, error);
            return null;
        }
    }
    getAsanaReasonFieldId(reasonId) {
        const reasonToAsanaMap = {
            "1": "1209197544798629",
            "2": "1209197544798630",
            "3": "1209201980313987",
            "4": "1209201980313988",
            "5": "1209201980313989",
            "6": "1209201980313990",
            "7": "1209201980313991",
            "8": "1209214405946351",
            "9": "1209224081168964",
            "10": "1209272868265029",
            "11": "1209272868265030",
            "12": "1209291950476030",
            "14": "1209322474529206",
            "15": "1209380651874666",
        };
        return reasonToAsanaMap[reasonId] || null;
    }
}
exports.ClientService = ClientService;
