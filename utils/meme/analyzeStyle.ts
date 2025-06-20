"use server";

import { getOpenRouter } from "@/utils/openRouter";

const openRouter = getOpenRouter();

export async function analyzeStyle(imageBase64: string, keyword: string): Promise<string> {
  const response = await openRouter.chat.completions.create({
    model: "google/gemini-2.0-flash-001",
    // model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            // text: `
            //   Analyze the meme image to identify its style, tone, and cultural context.
            //   Describe:
            //   - Meme type or genre
            //   - Emotion or theme
            //   - Typical Caption structure and tone
            //   - How to incorporate the keyword(s): "${keyword}" naturally into captions
            //   Write 2–3 short sentences giving specific writing advice to match the meme's format. No extra text.
            // `.trim(),
            text: `
              Analyze the uploaded image and briefly describe the following:
              - Main subjects in the image (people, animals, objects)
              - Key actions, facial expressions, or emotional cues
              - Background and setting (location, time of day, situation)
              Use short, clear sentences. Focus only on what is visually obvious—do not infer meaning, emotions, or jokes.
              The goal is to provide enough context for a caption generator to understand the scene, while leaving room for creative interpretation.
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

  const result = response.choices?.[0]?.message?.content?.trim();

  if (!result) throw new Error("Style analysis failed");
  console.log(result);

  return result;
}
