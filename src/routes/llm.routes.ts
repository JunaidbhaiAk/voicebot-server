import { streamLLMResponse } from "@/services/llm.service";
import { Router, Request, Response } from "express";
import { logger } from "@/config/logger"; // ✅ Import centralized logger

const router = Router();

/**
 * GET /api/stream
 * This endpoint streams LLM responses in Server-Sent Events (SSE) format.
 * - Accepts a query param `question`
 * - Returns real-time streamed chunks from the LLM
 * - Logs request lifecycle for debugging and monitoring
 */
router.get("/stream", async (req: Request, res: Response) => {
  const { question } = req.query;

  // 📝 Validate input
  if (!question || typeof question !== "string") {
    logger.warn("❌ Missing or invalid question in request");
    return res.status(400).json({ error: "Question is required" });
  }

  logger.info({ question }, "📥 Received request to /api/stream");

  // ⚙️ Configure Server-Sent Events (SSE) headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  try {
    // 🚀 Stream chunks from LLM
    await streamLLMResponse(question, (chunk) => {
      logger.debug({ chunk }, "📤 Streaming chunk"); // log each chunk
      res.write(`data: ${chunk}\n\n`);
    });

    logger.info("✅ Finished streaming response");
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    // ❌ Log error and return to client
    logger.error({ err: error }, "💥 Error while streaming LLM response");
    res.status(500).json({ error: "Failed to stream response" });
  }
});

export default router;
