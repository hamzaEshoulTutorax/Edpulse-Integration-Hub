"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateCache = void 0;
const webhookRegistry_1 = require("../services/webhookRegistry");
const invalidateCache = async (req, res) => {
    try {
        const { folderId } = req.body;
        if (folderId) {
            console.log(`🔄 Manual cache invalidation requested for folder: ${folderId}`);
            await webhookRegistry_1.webhookRegistry.invalidateCache(folderId);
        }
        else {
            console.log("🔄 Manual cache invalidation requested for all folders");
            await webhookRegistry_1.webhookRegistry.invalidateCache();
        }
        res.json({
            status: "success",
            message: folderId
                ? `Webhook cache for folder ${folderId} invalidated successfully`
                : "All webhook caches invalidated successfully",
        });
    }
    catch (error) {
        console.error("❌ Failed to invalidate webhook cache:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to invalidate cache",
        });
    }
};
exports.invalidateCache = invalidateCache;
