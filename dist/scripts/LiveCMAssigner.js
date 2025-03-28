"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveCMAssigner = void 0;
const TutorCruncherService_1 = require("../service/TutorCruncherService");
const WebhookService_1 = require("../service/WebhookService");
class LiveCMAssigner {
    constructor(branchId) {
        this.apiKeyMap = {
            3268: "fa64205f2c24a986ddbf4ba223957c2b40390ce6",
            7673: "47160bd5d5e601cf56aa2ab86226b7033de22162",
            8427: "3005ae7c151f1d104c82e7ff6a232898c29ed1f1",
            15751: "0ad0746cfe4309661c0c26c6a9368b0a3d2ec169",
            14409: "b9042d2577ba92415f47a66b826ed11f517e082e",
            5737: "3df70ef7b74e0a34c7a6e3620b13c4fc3cdb8c57",
            3269: "b4e57c43ac08ca011fe75b5097da9a2ab261a235",
        };
        this.branchId = branchId;
        const apiKey = this.getApiKey(branchId);
        this.tcAPI = new TutorCruncherService_1.TutorCruncherService(apiKey, branchId);
        this.webhookService = new WebhookService_1.WebhookService();
    }
    getApiKey(branchId) {
        const key = this.apiKeyMap[branchId.toString()];
        if (!key) {
            throw new Error(`No API key found for branch ${branchId}`);
        }
        return key;
    }
    async execute() {
        try {
            console.log(`🚀 Starting CM assignment script for branch ${this.branchId}`);
            const recentLiveClients = await this.tcAPI.getRecentLiveClients();
            console.log(`📋 Found total of ${recentLiveClients.length} recent live clients`);
            const unassignedClientIds = await this.tcAPI.filterClientsWithoutManager(recentLiveClients);
            console.log(`\n📊 Final Report:`);
            console.log(`⚠️ Clients without managers: ${unassignedClientIds.length}`);
            console.log(`🎯 Unassigned client IDs: ${JSON.stringify(unassignedClientIds)}`);
            if (unassignedClientIds.length > 0) {
                await this.webhookService.sendBatchToWebhook(unassignedClientIds, this.branchId);
            }
            else {
                console.log(`\n📝 No clients to notify webhook about`);
            }
        }
        catch (error) {
            console.error("❌ Script execution failed:", error);
        }
    }
}
exports.LiveCMAssigner = LiveCMAssigner;
