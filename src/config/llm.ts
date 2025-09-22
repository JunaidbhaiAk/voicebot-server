import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "./env";
import { promptTemplate } from "./prompt";

const llm = new ChatGoogleGenerativeAI({
  model: env.MODEL,
  apiKey: env.GOOGLE_API_KEY,
});

export const llmChain = promptTemplate.pipe(llm);
