"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || "development",
    apiKey: process.env.API_KEY || "your-default-api-key",
    frontendUrl: [process.env.FRONTEND_URL],
    branchTokens: {
        3268: process.env.TOKEN_TUTORAX_TUTORAT || "",
        7673: process.env.TOKEN_TUTORAX_CANADA || "",
        8427: process.env.TOKEN_TUTORAX_ORTHOPEDAGOGIE || "",
        15751: process.env.TOKEN_TUTORAX_USA || "",
        14409: process.env.TOKEN_TUTORAX_ORTHOPHONIE || "",
        5737: process.env.TOKEN_TUTORAX_STIMULATION || "",
        3269: process.env.TOKEN_TUTORAX_ADMIN || "",
    },
};
