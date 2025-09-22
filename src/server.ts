import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env";
import llmRoutes from "./routes/llm.routes";

export const createApp = (): Express => {
  const app = express();

  app.set("trust proxy", true);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
  app.use(helmet());

  app.use("/api", llmRoutes);

  return app;
};
