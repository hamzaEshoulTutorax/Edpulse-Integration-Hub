"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRegistry = exports.WebhookRegistry = void 0;
const redis_1 = require("../config/redis");
const supabase_1 = require("../config/supabase");
const ioredis_1 = __importDefault(require("ioredis"));
class WebhookRegistry {
    constructor() {
        this.syncInterval = null;
        this.initialized = false;
        this.redis = new ioredis_1.default(redis_1.redisConfig);
        this.supabase = supabase_1.supabaseClient;
        this.CACHE_KEY = "webhook_registry";
        this.CACHE_TTL = 60 * 120; // 2 hours in seconds
        console.log("📋 Webhook Registry created");
    }
    initialize() {
        if (this.initialized) {
            console.log("📋 Webhook Registry already initialized");
            return this;
        }
        // Do initial sync of all webhooks
        this.syncAllWebhooks();
        // Schedule periodic refresh every 2 hours
        this.syncInterval = setInterval(() => this.syncAllWebhooks(), 1000 * 60 * 120);
        this.initialized = true;
        console.log("📋 Webhook Registry initialized and syncing started");
        return this;
    }
    cleanup() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
        console.log("📋 Webhook Registry sync stopped");
    }
    async syncAllWebhooks() {
        try {
            console.log("🔄 Starting sync of ALL webhooks across all folders...");
            // Get all folders first
            const { data: folders, error: foldersError } = await this.supabase
                .schema("secure")
                .from("webhook_relay_folders")
                .select("id");
            if (foldersError) {
                console.error("❌ Error fetching folders from Supabase:", foldersError);
                throw foldersError;
            }
            console.log(`📂 Found ${folders.length} folders to sync`);
            // Sync each folder's webhooks
            for (const folder of folders) {
                await this.syncFolderWebhooks(folder.id);
            }
            console.log("✅ Completed sync of ALL folders and their webhooks");
            return true;
        }
        catch (error) {
            console.error("❌ Failed to sync all webhooks:", error);
            return false;
        }
    }
    // Sync webhooks for a specific folder
    async syncFolderWebhooks(folderId) {
        try {
            console.log(`🔄 Syncing webhooks for folder ID: ${folderId}...`);
            const { data: integrations, error } = await this.supabase
                .schema("secure")
                .from("webhook_relay_integrations")
                .select(`
          id,
          action_ids,
          name,
          folder_id,
          webhooks:webhook_relay_webhook_urls(
            id,
            url,
            is_active
          )
        `)
                .eq("folder_id", folderId);
            if (error) {
                console.error(`❌ Error fetching integrations for folder ${folderId}:`, error);
                throw error;
            }
            // Process the data to filter out inactive webhooks
            const processedData = integrations.map((integration) => ({
                ...integration,
                webhooks: integration.webhooks.filter((webhook) => webhook.is_active),
            }));
            console.log(`📥 Fetched ${processedData.length} integrations with webhooks for folder ${folderId}`);
            // Store in Redis with a folder-specific key
            const folderCacheKey = `${this.CACHE_KEY}:folder:${folderId}`;
            await this.redis.set(folderCacheKey, JSON.stringify(processedData), "EX", this.CACHE_TTL);
            console.log(`✅ Synced webhooks for folder ${folderId} to Redis cache`);
            return processedData;
        }
        catch (error) {
            console.error(`❌ Failed to sync webhooks for folder ${folderId}:`, error);
            return [];
        }
    }
    async getWebhooksForFolderAndAction(folderId, actionId) {
        try {
            console.log(`🔍 Getting webhooks for folder ID: ${folderId} and action ID: ${actionId}`);
            // Try to get cached data for this specific folder
            const folderCacheKey = `${this.CACHE_KEY}:folder:${folderId}`;
            let cachedData = await this.redis.get(folderCacheKey);
            let integrations;
            // If no folder-specific cache exists, fetch from database
            if (!cachedData) {
                console.log(`🔄 Cache miss for folder ${folderId}, fetching data from Supabase`);
                integrations = await this.syncFolderWebhooks(folderId);
            }
            else {
                console.log(`✅ Cache hit for folder ${folderId}`);
                integrations = JSON.parse(cachedData);
            }
            // Find integrations that are interested in this action
            const relevantIntegrations = integrations.filter((integration) => integration.action_ids && integration.action_ids.includes(actionId));
            console.log(`📊 Found ${relevantIntegrations.length} relevant integrations in folder ${folderId}`);
            // Collect all active webhooks from these integrations
            const webhooks = relevantIntegrations.flatMap((integration) => integration.webhooks);
            console.log(`🔎 Found ${webhooks.length} active webhooks for action ID: ${actionId} in folder ${folderId}`);
            return webhooks;
        }
        catch (error) {
            console.error("❌ Failed to get webhooks:", error);
            return [];
        }
    }
    async hasFolderIntegrationsForAction(folderId, actionId) {
        try {
            console.log(`🔍 Checking if folder ${folderId} has integrations for action ${actionId}`);
            // Try to get cached data for this specific folder
            const folderCacheKey = `${this.CACHE_KEY}:folder:${folderId}`;
            let cachedData = await this.redis.get(folderCacheKey);
            let integrations;
            // If no folder-specific cache exists, fetch from database
            if (!cachedData) {
                console.log(`🔄 Cache miss for folder ${folderId}, fetching data from Supabase`);
                integrations = await this.syncFolderWebhooks(folderId);
            }
            else {
                console.log(`✅ Cache hit for folder ${folderId}`);
                integrations = JSON.parse(cachedData);
            }
            // Check if any integration has this action ID and active webhooks
            const hasRelevantIntegration = integrations.some((integration) => integration.action_ids &&
                integration.action_ids.includes(actionId) &&
                integration.webhooks &&
                integration.webhooks.length > 0);
            console.log(`🔍 Folder ${folderId} ${hasRelevantIntegration ? "has" : "does not have"} integrations for action ${actionId}`);
            return hasRelevantIntegration;
        }
        catch (error) {
            console.error(`❌ Error checking if folder ${folderId} has integrations for action ${actionId}:`, error);
            return false;
        }
    }
    async invalidateCache(folderId) {
        if (folderId) {
            console.log(`🔄 Invalidating webhook cache for folder ${folderId}`);
            await this.syncFolderWebhooks(folderId);
        }
        else {
            console.log("🔄 Invalidating all webhook caches");
            await this.syncAllWebhooks();
        }
        return true;
    }
    static getInstance() {
        if (!WebhookRegistry.instance) {
            WebhookRegistry.instance = new WebhookRegistry();
        }
        return WebhookRegistry.instance;
    }
}
exports.WebhookRegistry = WebhookRegistry;
exports.webhookRegistry = WebhookRegistry.getInstance();
