"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../config");
exports.corsMiddleware = (0, cors_1.default)({
    origin: config_1.config.frontendUrl,
    methods: ["GET", "POST"],
    credentials: true,
});
