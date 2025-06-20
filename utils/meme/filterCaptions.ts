"use server";

import { getOpenRouter } from "@/utils/openRouter";
import stripCodeFences from "../stripCodeFences";

const openRouter = getOpenRouter();

export async function filterCaptions(captions: string[], imageBase64: string, keyword: string): Promise<string[]> {
  const response = await openRouter.chat.completions.create({
    model: "google/gemini-2.0-flash-lite-001",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
              You're a meme quality filter.
              Given a list of meme captions, style advice, the meme image, and keyword(s).
              Remove boring, generic, unfunny, off-tone, or repetitive lines.
              Keep captions that match the humor, vibe, cultural context of the meme image and keyword theme.
              Return only the best 5 captions
              Respond ONLY with a JSON array of the filtered captions, no code fences or extra text.
              Keyword: ${keyword}
              Captions: ${JSON.stringify(captions)}
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

  const result = response.choices?.[0]?.message?.content;

  if (!result) throw new Error("Filtering failed");
  console.log(result);

  return typeof result === "string" ? JSON.parse(stripCodeFences(result)) : result;
}
