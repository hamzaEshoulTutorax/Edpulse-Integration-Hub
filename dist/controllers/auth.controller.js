"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyKey = void 0;
const auth_1 = require("../services/auth");
const verifyKey = async (req, res) => {
    try {
        const { secretKey, source } = req.body;
        if (!secretKey) {
            res.status(400).json({ message: "La clé secrète est requise" });
            return;
        }
        const token = (0, auth_1.verifySecretKey)(secretKey, source);
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ message: "La clé secrète est invalide" });
    }
};
exports.verifyKey = verifyKey;
