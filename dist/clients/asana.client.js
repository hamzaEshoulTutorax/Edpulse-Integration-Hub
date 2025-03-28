"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsanaClient = void 0;
const axios_1 = __importDefault(require("axios"));
class AsanaClient {
    constructor() {
        this.baseUrl = "https://app.asana.com/api/1.0";
        this.accessToken = process.env.ASANA_ACCESS_TOKEN || "";
        if (!this.accessToken) {
            console.warn("ASANA_ACCESS_TOKEN not set in environment variables");
        }
    }
    async createTask(taskData) {
        try {
            const response = await (0, axios_1.default)({
                method: "POST",
                url: `${this.baseUrl}/tasks`,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json",
                },
                data: taskData,
            });
            return response.data;
        }
        catch (error) {
            console.error("Error creating Asana task:", error);
            throw error;
        }
    }
}
exports.AsanaClient = AsanaClient;
