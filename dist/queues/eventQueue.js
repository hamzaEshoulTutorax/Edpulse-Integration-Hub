"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryQueue = exports.eventQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const redis_1 = require("../config/redis");
// Create our main event queue
const eventQueue = new bull_1.default("webhook-events", {
    redis: redis_1.redisConfig,
    settings: {
        lockDuration: 60000,
        maxStalledCount: 0,
    },
    limiter: {
        max: 90, // Maximum 90 jobs per 15-second window
        duration: 15000, // Time window in ms (15 seconds)
    },
});
exports.eventQueue = eventQueue;
// Create a dedicated retry queue with lower rate limit
const retryQueue = new bull_1.default("webhook-retries", {
    redis: redis_1.redisConfig,
    settings: {
        lockDuration: 60000, // Increase from 30 seconds to 60 seconds
        maxStalledCount: 0, // Prevent reprocessing of stalled retry jobs
    },
    limiter: {
        max: 100, // Lower limit for retries
        duration: 300000, // 5 minute window (300,000 milliseconds)
    },
});
exports.retryQueue = retryQueue;
