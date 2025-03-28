"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const branch_utils_1 = require("../utils/branch.utils");
const router = (0, express_1.Router)();
router.use(auth_1.validateApiKey);
router.get("/test", async (req, res) => {
    try {
        // Get branchId from query parameter
        const branchId = req.query.branchId;
        // Use BranchUtils to get the branch name and token
        const branchName = branch_utils_1.BranchUtils.getBranchName(branchId);
        const branchToken = branch_utils_1.BranchUtils.getBranchToken(branchId);
        const testResponse = {
            msg: "Hi",
            branchId: branchId,
            branchName: branchName,
            branchToken: branchToken,
        };
        return res.status(200).json(testResponse);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.testRoutes = router;
