"use server";

import { getOpenRouter } from "@/utils/openRouter";
import stripCodeFences from "../stripCodeFences";

const openRouter = getOpenRouter();

/* 
  Use internet slang settings
*/

export async function generateCaptions(imageBase64: string, styleAdvice: string, keyword: string): Promise<string[]> {
  const response = await openRouter.chat.completions.create({
    // model: "google/gemini-2.0-flash-001",
    model: "openai/gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            // text: `
            //   Generate 10 meme captions for a meme image.
            //   Each caption must:
            //   - Be relevant to the {memeImage} in mood or cultural context
            //   - Be relate to the {keywords} in theme or subject
            //   - Be funny, absurd, ironic, or emotionally exaggerated
            //   - Be easy to understand and not boring or literal
            //   - Match the style, structure, cultural context and tone described in {styleAdvice}
            //   - Use meme grammar when needed
            //   - Be a single sentence with no more than 12 words.
            //   Output only an array of 10 strings. No explanations, no formatting.
            //   {styleAdvice}: ${styleAdvice}
            //   {keywords}: ${keyword}
            // `.trim(),
            text: `
              You are a creative and humorous meme caption generator.
              Inputs:
              - A list of neutral image keywords from an image analyzer.
              - A user-provided keyword or phrase (may be short, vague, or unstructured, like “school boring” or a full sentence).
              Your task:
              - Combine the image keywords and the user input to generate a short, funny, and expressive meme caption that reflects the user’s mood or message.
              - Use the language of {user-provided keyword}
              - The caption should be witty, sarcastic, exaggerated, or emotionally relatable—use the user’s keywords to guide the tone.
              - Avoid directly repeating the image keywords; instead, use them as inspiration to create humor or irony.
              - Keep it short (1–2 lines max), and meme-appropriate.
              - If the user input is vague, interpret it creatively and connect it meaningfully with the image.
              - Do not be too literal, formal, or boring—make sure the result is engaging and fun.
              - Use first-person perspective in the first 3 captions, as if the meme is speaking directly to the viewer and do not mention the main subject in the image.
              - Do not use first-person perspective in the last 2 captions, as if the meme is an objective observation and mentioning the main subject in the image is allowed but not forced.
              Output only an array of 5 strings. No explanations, no formatting.
              {image analyzer}: ${styleAdvice}
              {user-provided keyword}: ${keyword}
              当{user-provided keyword}不是英文是中文:
              - 使用中文
              - 文案要贴近中文 meme 风格，不要中式英语或直译英文梗
            `.trim(),
          },
          // {
          //   type: "image_url",
          //   image_url: { url: imageBase64 },
          // },
        ],
      },
    ],
  });

  const result = response.choices?.[0]?.message?.content;
  console.log(result);

  if (!result) throw new Error("Caption generation failed");

  const parsed = typeof result === "string" ? JSON.parse(stripCodeFences(result)) : result;

  if (!Array.isArray(parsed)) throw new Error("Invalid response format from caption model");

  return parsed;
}
