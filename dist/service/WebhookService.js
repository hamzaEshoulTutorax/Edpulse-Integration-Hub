"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
class WebhookService {
    constructor() {
        this.webhookUrl = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZlMDYzMDA0M2Q1MjZhNTUzNTUxMzAi_pc";
        this.delayBetweenRequests = 30000;
    }
    async wait() {
        await new Promise((resolve) => setTimeout(resolve, this.delayBetweenRequests));
    }
    async sendClientData(clientId, branchId) {
        try {
            const payload = {
                clientId: clientId.toString(),
                branchId: branchId.toString(),
            };
            const response = await fetch(this.webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`Webhook request failed with status: ${response.status}`);
            }
            console.log(`📤 Sent webhook for client ${clientId}`);
        }
        catch (error) {
            console.error(`❌ Error sending webhook for client ${clientId}:`, error);
            throw error;
        }
    }
    async sendBatchToWebhook(clientIds, branchId) {
        console.log(`\n🌐 Starting webhook notifications for ${clientIds.length} clients...`);
        for (let i = 0; i < clientIds.length; i++) {
            try {
                console.log(`\n📡 Sending webhook ${i + 1}/${clientIds.length}`);
                await this.sendClientData(clientIds[i], branchId);
                if (i < clientIds.length - 1) {
                    // Don't wait after the last request
                    console.log(`⏳ Waiting 30 seconds before next webhook...`);
                    await this.wait();
                }
            }
            catch (error) {
                console.error(`❌ Failed to send webhook for client ${clientIds[i]}`);
                // Continue with next client even if one fails
            }
        }
        console.log(`\n✅ Webhook notifications completed!`);
    }
}
exports.WebhookService = WebhookService;
