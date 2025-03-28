"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignLiveCM = void 0;
const LiveCMAssigner_1 = require("../scripts/LiveCMAssigner");
const assignLiveCM = async (req, res) => {
    try {
        const { branchId } = req.body;
        if (!branchId) {
            res.status(400).json({ error: "Le portail est requis" });
            return;
        }
        const assigner = new LiveCMAssigner_1.LiveCMAssigner(branchId);
        assigner.execute();
        res.status(202).json({
            message: "Script de distribution lancé",
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "Erreur lors de l'exécution du script",
            details: error.message,
        });
    }
};
exports.assignLiveCM = assignLiveCM;
