"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseClient = void 0;
const supabase_1 = require("../config/supabase");
class SupabaseClient {
    async updateClientStatusInKpis(clientId, adminName, updatedAt = new Date().toISOString()) {
        const { data, error } = await supabase_1.supabaseClient
            .from("tutorax_sales")
            .update({
            current_status: "deleted",
            action_by: adminName,
            sales_agent: adminName,
            updated_at: updatedAt,
            converted: false,
        })
            .eq("client_id", clientId);
        if (error) {
            console.error("Error updating client status in KPIs:", error);
            throw error;
        }
        return data;
    }
    async addDeletedClient(clientData) {
        const { data, error } = await supabase_1.supabaseClient
            .from("deleted_clients")
            .insert([
            {
                ...clientData,
                deleted_at: new Date().toISOString(),
            },
        ]);
        if (error) {
            console.error("Error storing deleted client in Supabase:", error);
            throw error;
        }
        return data;
    }
    async clientExistsInDeletedClients(clientId) {
        const { data, error } = await supabase_1.supabaseClient
            .from("deleted_clients")
            .select("client_id")
            .eq("client_id", clientId)
            .limit(1);
        if (error) {
            console.error("Error checking client in Supabase:", error);
            throw error;
        }
        return data && data.length > 0;
    }
    async getDeletedClients(limit = 100, branch) {
        let query = supabase_1.supabaseClient
            .from("deleted_clients")
            .select("*")
            .order("deleted_at", { ascending: false })
            .limit(limit);
        if (branch) {
            query = query.eq("branch", branch);
        }
        const { data, error } = await query;
        if (error) {
            console.error("Error fetching deleted clients from Supabase:", error);
            throw error;
        }
        return data;
    }
}
exports.SupabaseClient = SupabaseClient;
