import { pino } from "pino";

export const logger = pino({
  name: "voice-bot-server",
  level: process.env.LOG_LEVEL || "info",
});
