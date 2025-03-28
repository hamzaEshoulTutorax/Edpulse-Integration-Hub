"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorCruncherService = void 0;
const adminMapping_1 = require("../constants/adminMapping");
class TutorCruncherService {
    constructor(apiKey, branchId) {
        this.baseUrl = "https://secure.tutorcruncher.com/api";
        this.rateLimit = 650; // ~92 requests/minute
        this.apiKey = apiKey;
        this.eligibleAdminIds = adminMapping_1.BRANCH_ADMIN_MAPPING[branchId.toString()] || [];
    }
    get headers() {
        return {
            Authorization: `token ${this.apiKey}`,
            "Content-Type": "application/json",
        };
    }
    formatDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    async wait() {
        await new Promise((resolve) => setTimeout(resolve, this.rateLimit));
    }
    async getRecentLiveClients() {
        const clients = [];
        const threeWeeksAgo = new Date();
        threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 35);
        const createdAfter = this.formatDate(threeWeeksAgo);
        let hasNextPage = true;
        let currentUrl = `${this.baseUrl}/clients/?status=live&user__date_created__gte=${createdAfter}`;
        console.log("🔍 Starting to fetch recent live clients...");
        console.log(`📅 Looking for clients created after: ${createdAfter}`);
        while (hasNextPage) {
            await this.wait();
            console.log(`📃 Fetching page: ${currentUrl}`);
            try {
                const response = await fetch(currentUrl, { headers: this.headers });
                if (!response.ok) {
                    throw new Error(`❌ HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                clients.push(...data.results.map((client) => ({
                    id: client.id,
                    url: client.url,
                })));
                console.log(`✨ Found ${data.results.length} clients on this page`);
                console.log(`📊 Total clients collected so far: ${clients.length}`);
                hasNextPage = !!data.next;
                currentUrl = data.next;
            }
            catch (error) {
                console.error(`❌ Error processing page:`, error);
                hasNextPage = false;
            }
        }
        console.log(`🎉 Successfully collected ${clients.length} recent live clients!`);
        return clients;
    }
    async filterClientsWithoutManager(clients) {
        const unassignedClientIds = [];
        console.log(`\n🔍 Starting to check ${clients.length} clients for manager assignment...`);
        for (let i = 0; i < clients.length; i++) {
            await this.wait();
            try {
                console.log(`👀 Checking client ${i + 1}/${clients.length} (ID: ${clients[i].id})`);
                const response = await fetch(clients[i].url, { headers: this.headers });
                if (!response.ok) {
                    console.log(`⚠️ Skipping client ${clients[i].id} - HTTP error ${response.status}`);
                    continue;
                }
                const clientData = await response.json();
                const hasNoAdmin = !clientData.associated_admin;
                const hasIneligibleAdmin = clientData.associated_admin &&
                    !this.eligibleAdminIds.includes(clientData.associated_admin.id);
                if (hasNoAdmin || hasIneligibleAdmin) {
                    unassignedClientIds.push(clients[i].id);
                    const reason = hasNoAdmin
                        ? "no manager assigned"
                        : `ineligible manager (${clientData.associated_admin.email})`;
                    console.log(`🎯 Found client ${clients[i].id} with ${reason}`);
                }
            }
            catch (error) {
                console.error(`❌ Error checking client ${clients[i].id}:`, error);
            }
        }
        console.log(`\n✅ Check complete! Found ${unassignedClientIds.length} clients needing manager assignment`);
        return unassignedClientIds;
    }
}
exports.TutorCruncherService = TutorCruncherService;
