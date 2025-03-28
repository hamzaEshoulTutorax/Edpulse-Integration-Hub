"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventWorker = void 0;
exports.initializeEventWorker = initializeEventWorker;
const axios_1 = __importDefault(require("axios"));
const eventQueue_1 = require("../queues/eventQueue");
const webhooks_1 = require("../constants/webhooks");
const webhookRegistry_1 = require("../services/webhookRegistry");
class EventWorker {
    constructor() {
        this.REQUEST_TIMEOUT = 20000; // 20 seconds timeout for each webhook
        // Set up the processor for our queue
        eventQueue_1.eventQueue.process("process-event", async (job) => {
            try {
                console.log(`🏃 Processing job ${job.id}:`);
                // Get event and folderId from the job data
                const { event, folderId } = job.data;
                // Process and dispatch the event to all relevant webhooks
                await this.dispatchToWebhooks(event, folderId);
                console.log(`✅ Successfully processed job ${job.id}`);
            }
            catch (error) {
                console.error(`❌ Error processing job ${job.id}:`, error);
                throw error; // Bull will handle retry
            }
        });
        // Listen for failed jobs
        eventQueue_1.eventQueue.on("failed", (job, error) => {
            console.error(`❌ Job ${job.id} failed permanently:`, error);
        });
    }
    async dispatchToWebhooks(event, folderId) {
        if (!event || !event.action) {
            throw new Error("Invalid event format: missing action property");
        }
        if (!folderId) {
            throw new Error("Invalid job data: missing folderId");
        }
        // Get the action ID from our mapping
        const action = webhooks_1.WEBHOOKS_ACTIONS_LIST[event.action];
        if (!action) {
            console.log(`⚠️ No action mapping found for: ${event.action}`);
            return;
        }
        // Find all webhooks registered for this action ID and folder
        const relevantWebhooks = await webhookRegistry_1.webhookRegistry.getWebhooksForFolderAndAction(folderId, action.id);
        console.log("RELEVANT WEBHOOKS", relevantWebhooks);
        if (!relevantWebhooks || relevantWebhooks.length === 0) {
            console.log(`ℹ️ No webhooks registered for action: ${event.action} (ID: ${action.id}) in folder: ${folderId}`);
            return;
        }
        // Create an array of promises for all webhooks
        const promises = relevantWebhooks.map((webhook) => this.sendToWebhook(webhook, event));
        // Execute all promises concurrently and wait for all to settle
        const results = await Promise.allSettled(promises);
        // Extract failed webhooks directly from the results
        const failedResults = results.filter((result) => result.status === "rejected");
        // Log summary
        console.log(`📊 Webhook dispatch summary: ${results.length - failedResults.length} succeeded, ${failedResults.length} failed out of ${relevantWebhooks.length} total`);
        // Queue failed webhooks for retry if any
        if (failedResults.length > 0) {
            console.warn(`⚠️ ${failedResults.length} webhooks failed for action: ${event.action}, queueing for retry`);
            this.queueFailedWebhooksForRetry(failedResults, event, folderId);
        }
    }
    queueFailedWebhooksForRetry(failedResults, event, folderId) {
        // Add each failed webhook to the retry queue
        failedResults.forEach((failedResult) => {
            const webhook = failedResult.reason.webhook;
            eventQueue_1.retryQueue.add("retry-webhook", {
                webhook,
                event,
                folderId,
                timestamp: new Date(),
            }, {
                attempts: 10,
                backoff: {
                    type: "exponential",
                    delay: 60000,
                },
                removeOnComplete: 100,
                removeOnFail: 500,
                delay: 60000,
            });
            console.log(`🔄 Queued webhook ${webhook.name || webhook.id} (${webhook.url}) for retry`);
        });
    }
    async sendToWebhook(webhook, formattedEvent) {
        const webhookName = webhook.name || `ID: ${webhook.id}`;
        console.log(`🔔 Sending event to webhook: ${webhookName} (${webhook.url})`);
        const modifiedEvent = {
            ...formattedEvent,
            timestamp: "bull",
        };
        const payload = {
            request_time: "bull",
            events: [modifiedEvent],
        };
        try {
            // Create a properly configured axios instance
            const response = await (0, axios_1.default)({
                method: "post",
                url: webhook.url,
                data: payload,
                timeout: this.REQUEST_TIMEOUT,
                headers: {
                    "Content-Type": "application/json",
                    "X-Webhook-ID": webhook.id,
                },
            });
            console.log(`✅ Successfully sent to webhook ${webhookName}: status ${response.status}`);
            return {
                webhook,
                success: true,
                status: response.status,
            };
        }
        catch (error) {
            console.error(`❌ Error sending to webhook ${webhookName}:`, error.message);
            // Throw an error with the webhook info so we can identify it later
            throw {
                webhook,
                success: false,
                error: error.message,
            };
        }
    }
}
exports.EventWorker = EventWorker;
function initializeEventWorker() {
    return new EventWorker();
}
