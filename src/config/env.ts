import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || "3000",
  MODEL: process.env.MODEL || "gemini-2.5-flash",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3001",
};
