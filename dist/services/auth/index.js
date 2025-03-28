"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySecretKey = void 0;
const token_1 = require("./helpers/token");
const verifySecretKey = (secretKey, source) => {
    let correctKey;
    if (source == "Tutorax")
        correctKey = process.env.API_SECRET_KEY;
    if (source == "SOSprof")
        correctKey = process.env.API_SECRET_KEY_SOSPROF;
    if (secretKey !== correctKey) {
        throw new Error("Invalid secret key");
    }
    return (0, token_1.generateToken)();
};
exports.verifySecretKey = verifySecretKey;
