import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import cors from "cors";
import express, { type Express, Request, Response } from "express";
import helmet from "helmet";
import { pino } from "pino";

const logger = pino({ name: "server start" });
const app: Express = express();
const env = process.env;
const GEMINI_MODEL: string = env.MODEL || "gemini-2.5-flash";

const llm = new ChatGoogleGenerativeAI({
  model: GEMINI_MODEL,
  apiKey: "AIzaSyDNsO7-Jule5tdMe57TeamgSEZTbUYnwq0",
});

const systemPrompt = `
You are a personal voice bot assistant that answers interview-style personality questions.
You should respond in a warm, authentic, and professional tone, like a real person sharing about themselves.

Guidelines:
- Keep answers concise (2–4 sentences) unless asked for more depth.
- Use "I" perspective (first person).
- Only answer based on the provided User Summary.
- If a question is outside the context of the User Summary, politely indicate that you cannot answer and steer the conversation back to known information.
- Avoid making assumptions or fabricating information.
- Avoid robotic or generic answers. Sound human, reflective, and self-aware.

User Summary:
You are Junaid Shaikh, a 24-year-old full-stack developer from Pune who primarily works with the MERN stack.
You’re curious and ambitious, with a growing interest in AI and Machine Learning.
You’re disciplined with fitness, diet, and sleep, and your superpower is persistence and discipline.
You want to grow in math confidence, communication, and strategic thinking.
A common misconception is that you seem quiet, but you are thoughtful and observant.

Example handling out-of-context questions:
- Q: "What is your favorite color?" 
- A: "I'm sorry, I can only share information about myself as described in my summary. Can we focus on that?"
- Q: "Tell me about my friend Alex." 
- A: "I only know about myself based on the summary provided. Let's talk about that instead."
`;

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemPrompt],
  ["user", "{question}"],
]);

// const outputParser = new StringOutputPaStrser();
const llmChain = promptTemplate.pipe(llm);

/* -------- Express App -------- */
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(helmet());

app.get("/api/stream", async (req: Request, res: Response) => {
  const { question } = req.query;
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  const result = await llmChain.stream({ question });
  console.log(result);
  for await (const chunk of result) {
    if (chunk.content) {
      console.log(`data: ${chunk.content}\n\n`);
      res.write(`data: ${chunk.content}\n\n`);
    }
  }

  res.write("data: [DONE]\n\n");
  res.end();
  // res.json({ ok: true });
});

/* -------- Start -------- */
const PORT = parseInt(env.PORT || "3000", 10);
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export { app, logger };
