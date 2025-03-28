import express from "express";
import cors from "cors";

import { config } from "./config";
import { testRoutes } from "./routes";

// Initialize Express app
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: config.frontendUrl,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Set up routes
app.use("/api", testRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
