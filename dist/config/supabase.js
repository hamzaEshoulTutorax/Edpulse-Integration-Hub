"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseClient = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
// Validate URL before creating client
if (!supabaseUrl || !supabaseUrl.startsWith("https://")) {
    throw new Error("Invalid SUPABASE_URL. Must be a valid URL starting with https://");
}
if (!supabaseKey) {
    throw new Error("SUPABASE_SERVICE_KEY is not defined");
}
exports.supabaseClient = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
