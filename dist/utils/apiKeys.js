"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTCApiClient = void 0;
// backend/src/utils/apiKeys.ts
const axios_1 = __importDefault(require("axios"));
const createTCApiClient = (branchId) => {
    const apiKey = process.env[`TC_API_KEY_${branchId}`];
    return axios_1.default.create({
        baseURL: "https://secure.tutorcruncher.com/api",
        headers: {
            Authorization: `Token ${apiKey}`,
        },
    });
};
exports.createTCApiClient = createTCApiClient;
