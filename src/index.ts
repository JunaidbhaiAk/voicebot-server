import { env } from "./config/env";
import { logger } from "./config/logger";
import { createApp } from "./server";

const app = createApp();

const PORT = parseInt(env.PORT, 10);
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
