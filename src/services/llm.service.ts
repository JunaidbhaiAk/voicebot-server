import { llmChain } from "@/config/llm";

export const streamLLMResponse = async (
  question: string,
  onChunk: (chunk: string) => void
) => {
  const result = await llmChain.stream({ question });

  for await (const chunk of result) {
    if (chunk.content) {
      onChunk(String(chunk.content));
    }
  }
};
