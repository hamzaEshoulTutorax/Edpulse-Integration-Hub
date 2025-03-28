import { Router } from "express";
import { validateApiKey } from "../middleware/auth";
import { BranchUtils } from "../utils/branch.utils";

const router = Router();

router.use(validateApiKey);

router.get("/test", async (req: any, res: any) => {
  try {
    // Get branchId from query parameter
    const branchId = req.query.branchId as string;

    // Use BranchUtils to get the branch name and token
    const branchName = BranchUtils.getBranchName(branchId);
    const branchToken = BranchUtils.getBranchToken(branchId);

    const testResponse = {
      msg: "Hi",
      branchId: branchId,
      branchName: branchName,
      branchToken: branchToken,
    };

    return res.status(200).json(testResponse);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export const testRoutes = router;
