"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeJobRequest = void 0;
const analysis_1 = require("../services/analysis");
const analyzeJobRequest = async (req, res) => {
    try {
        const { jobId, branchId } = req.body;
        if (!branchId) {
            res.status(400).json({ error: "Le portail est requis" });
            return;
        }
        if (!jobId) {
            res.status(400).json({ error: "L'identifiant du mandat est requis" });
            return;
        }
        const analysis = await (0, analysis_1.analyzeJob)(jobId, branchId);
        res.json(analysis);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "Erreur lors de l'analyse du mandat",
            details: error.message,
        });
    }
};
exports.analyzeJobRequest = analyzeJobRequest;
