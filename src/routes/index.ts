import { Router } from "express";
import { validateApiKey } from "../middleware/auth";
import { BranchUtils } from "../utils/branch.utils";
import { TutorCruncherClient } from "../clients/tutor-cruncher.client";
import { ResourceType } from "../enums/tc-resource-type.enums";

const router = Router();

router.use(validateApiKey);

router.get("/test", async (req: any, res: any) => {
  try {
    // Get branchId from query parameters
    const branchId = req.query.branchId as string;
    const clientID = req.query.clientId as string;

    // Initialize TutorCruncher client with the token
    const tutorCruncherClient = new TutorCruncherClient(branchId);

    const payload = {
      user: {
        last_name: "HAMZA TESTING",
        email: "hamza+55@tutorax.com",
      },
    };

    // Get all clients - no parameters
    const clientsData = await tutorCruncherClient.getResourceById(
      ResourceType.CONTRACTORS,
      clientID
    );

    const responseData = {
      msg: "TutorCruncher API Test - Get All Clients",
      branchId,
      branchName: BranchUtils.getBranchName(branchId),
      clients: clientsData,
    };

    return res.status(200).json(responseData);
  } catch (error: any) {
    console.error("Error in test route:", error);
    return res.status(500).json({
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

export const testRoutes = router;
