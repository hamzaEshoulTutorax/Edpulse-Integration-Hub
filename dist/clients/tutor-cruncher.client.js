"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorCruncherClient = void 0;
const axios_1 = __importDefault(require("axios"));
class TutorCruncherClient {
    constructor() {
        this.baseUrl = "https://secure.tutorcruncher.com/api";
    }
    async apiRequest(endpoint, method = "GET", token, body = null) {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const config = {
                method,
                url,
                headers: {
                    Authorization: `token ${token}`,
                    "Content-Type": "application/json",
                },
                data: body ? body : undefined,
            };
            const response = await (0, axios_1.default)(config);
            return response.data;
        }
        catch (error) {
            console.error(`TutorCruncher API Error: ${error.message}`, error);
            return null;
        }
    }
    async getClient(clientId, token) {
        return this.apiRequest(`/clients/${clientId}`, "GET", token);
    }
    async deleteClient(clientId, token) {
        return this.apiRequest(`/clients/${clientId}`, "DELETE", token);
    }
}
exports.TutorCruncherClient = TutorCruncherClient;
