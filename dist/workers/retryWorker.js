"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryWorker = void 0;
exports.initializeRetryWorker = initializeRetryWorker;
const eventQueue_1 = require("../queues/eventQueue");
const axios_1 = __importDefault(require("axios"));
class RetryWorker {
    constructor() {
        this.REQUEST_TIMEOUT = 10000; // 10 seconds timeout for each webhook retry
        // Set up the processor for our retry queue
        eventQueue_1.retryQueue.process("retry-webhook", async (job) => {
            try {
                const { webhook, event, folderId } = job.data;
                console.log(`🔄 Retrying webhook: ${webhook.name} (${webhook.url}) for folder: ${folderId}`);
                if (!webhook || !event || !folderId) {
                    throw new Error("Invalid job data: missing webhook, event, or folderId");
                }
                // Send the webhook
                await this.sendToWebhook(webhook, event);
                console.log(`✅ Successfully retried webhook: ${webhook.name}`);
                return { success: true, webhook: webhook.name };
            }
            catch (error) {
                console.error(`❌ Retry failed for webhook:`, error);
                throw error; // Let Bull handle further retry attempts
            }
        });
        // Listen for retry queue events
        eventQueue_1.retryQueue.on("failed", (job, error) => {
            console.error(`❌ Retry job ${job.id} failed permanently after all attempts:`, error);
        });
        eventQueue_1.retryQueue.on("completed", (job) => {
            console.log(`✅ Retry job ${job.id} completed successfully`);
        });
        console.log("👂 Retry worker initialized and listening for failed webhooks");
    }
    async sendToWebhook(webhook, formattedEvent) {
        try {
            const modifiedEvent = {
                ...formattedEvent,
                timestamp: "bull",
            };
            const payload = {
                request_time: "bull",
                events: [modifiedEvent],
            };
            // Create a properly configured axios instance
            const response = await (0, axios_1.default)({
                method: "post",
                url: webhook.url,
                data: payload,
                timeout: this.REQUEST_TIMEOUT,
                headers: {
                    "Content-Type": "application/json",
                    "X-Webhook-ID": webhook.id,
                    "X-Retry": "true",
                },
            });
            return {
                webhook,
                success: true,
                status: response.status,
            };
        }
        catch (error) {
            console.error(`❌ Error retrying webhook ${webhook.name}:`, error.message);
            // Throw an error with the webhook info
            throw {
                webhook,
                success: false,
                error: error.message,
            };
        }
    }
}
exports.RetryWorker = RetryWorker;
// Export a function to initialize the worker
function initializeRetryWorker() {
    return new RetryWorker();
}
