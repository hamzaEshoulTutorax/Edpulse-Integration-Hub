"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventProducer = void 0;
const webhooks_1 = require("../constants/webhooks");
const eventQueue_1 = require("../queues/eventQueue");
const webhookRegistry_1 = require("../services/webhookRegistry");
class EventProducer {
    async produceEvent(event, folderId) {
        try {
            if (!(await this.isRelevantEvent(event, folderId))) {
                console.log(`🚫 Filtered out irrelevant event: ${event.action} for folder: ${folderId}`);
                return null;
            }
            // Add relevant event to queue with folderId
            const job = await eventQueue_1.eventQueue.add("process-event", {
                event,
                folderId,
            }, {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 20000,
                },
                removeOnComplete: 400,
                removeOnFail: 500,
            });
            console.log(`✅ Event queued successfully: ${job.id} for folder: ${folderId}`);
            return job.id;
        }
        catch (error) {
            console.error("❌ Error producing event:", error);
            throw error;
        }
    }
    async isRelevantEvent(event, folderId) {
        if (!event || !event.action) {
            console.log("⚠️ Event missing 'action' property");
            return false;
        }
        if (!folderId) {
            console.log("⚠️ Missing folderId");
            return false;
        }
        // Get the action ID directly from the constants mapping
        const action = webhooks_1.WEBHOOKS_ACTIONS_LIST[event.action];
        if (!action) {
            console.log(`⚠️ No action mapping found for: ${event.action}`);
            return false;
        }
        const actionId = action.id;
        console.log(`ACTION ID: ${actionId}, FOLDER ID: ${folderId}`);
        // Check if this folder has any integrations interested in this action
        const hasRelevantIntegrations = await webhookRegistry_1.webhookRegistry.hasFolderIntegrationsForAction(folderId, actionId);
        console.log(`🔍 Action ${event.action} (ID: ${actionId}) for folder ${folderId} is ${hasRelevantIntegrations ? "relevant" : "not relevant"}`);
        return hasRelevantIntegrations;
    }
}
exports.EventProducer = EventProducer;
