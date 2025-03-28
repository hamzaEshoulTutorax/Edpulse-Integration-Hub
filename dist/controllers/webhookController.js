"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = void 0;
const eventProducer_1 = require("../producers/eventProducer");
const producer = new eventProducer_1.EventProducer();
const handleWebhook = async (req, res) => {
    try {
        const { events } = req.body;
        const { folderId } = req.params;
        if (!events) {
            res.status(400).json({
                status: "error",
                message: "Missing 'events' property in request body",
            });
            return;
        }
        if (!folderId) {
            res.status(400).json({
                status: "error",
                message: "Missing 'folderId' parameter in request URL",
            });
            return;
        }
        const results = await Promise.all(events.map(async (event) => {
            const jobId = await producer.produceEvent(event, folderId);
            return {
                action: event.action,
                queued: jobId !== null,
                jobId,
            };
        }));
        res.status(200).json({
            status: "received",
            timestamp: new Date().toISOString(),
            processed: results,
        });
    }
    catch (error) {
        console.error("❌ Error processing webhook:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.handleWebhook = handleWebhook;
