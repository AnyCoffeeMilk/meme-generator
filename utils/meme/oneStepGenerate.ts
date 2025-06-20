"use server";

import { getOpenRouter } from "@/utils/openRouter";
import stripCodeFences from "../stripCodeFences";

const openRouter = getOpenRouter();

/* 
  Use internet slang settings
*/

export async function oneStepGenerate(imageBase64: string, keyword: string): Promise<string[]> {
  const response = await openRouter.chat.completions.create({
    // model: "google/gemini-2.0-flash-001",
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
              You are a creative and humorous meme caption generator.
              Inputs:
              - A meme image.
              - A user-provided keyword or phrase (may be short, vague, or unstructured, like “school boring” or a full sentence).
              Your task:
              - Combine the image theme and {user-provided keyword} to generate a short, funny, and expressive meme caption that reflects the user’s mood or message.
              - The caption should be witty, sarcastic, exaggerated, or emotionally relatable—use the user’s keywords to guide the tone.
              - Avoid directly repeating the image keywords; instead, use them as inspiration to create humor or irony.
              - Keep it short (1–2 lines max), and meme-appropriate.
              - If the user input is vague, interpret it creatively and connect it meaningfully with the image.
              - Do not be too literal, formal, or boring—make sure the result is engaging and fun.
              Output only an JSON array of 5 strings. No explanations, no formatting.
              {user-provided keyword}: ${keyword}
            `.trim(),
          },
          {
            type: "image_url",
            image_url: { url: imageBase64 },
          },
        ],
      },
    ],
  });

  console.log(response)
  console.log(response.choices)

  const result = response.choices?.[0]?.message?.content;

  if (!result) throw new Error("Caption generation failed");

  const parsed = typeof result === "string" ? JSON.parse(stripCodeFences(result)) : result;

  if (!Array.isArray(parsed)) throw new Error("Invalid response format from caption model");

  return parsed;
}
