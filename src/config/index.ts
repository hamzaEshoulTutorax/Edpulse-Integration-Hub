import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || "development",
  apiKey: process.env.API_KEY || "your-default-api-key",
  frontendUrl: [process.env.FRONTEND_URL!] as string[],
  branchTokens: {
    3268: process.env.TOKEN_TUTORAX_TUTORAT || "",
    7673: process.env.TOKEN_TUTORAX_CANADA || "",
    8427: process.env.TOKEN_TUTORAX_ORTHOPEDAGOGIE || "",
    15751: process.env.TOKEN_TUTORAX_USA || "",
    14409: process.env.TOKEN_TUTORAX_ORTHOPHONIE || "",
    5737: process.env.TOKEN_TUTORAX_STIMULATION || "",
    3269: process.env.TOKEN_TUTORAX_ADMIN || "",
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USERNAME || "",
      pass: process.env.SMTP_PASSWORD || "",
    },
  },
};
