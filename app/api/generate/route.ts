"use server";

import encodeImageToBase64 from "@/utils/encodeImageToBase64";
import { getOpenRouter } from "@/utils/openRouter";
import { NextRequest, NextResponse } from "next/server";

const openRouter = getOpenRouter();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const img = formData.get("img") as null;
  const keyword = formData.get("keyword") as string | null;

  if (!(img && keyword)) {
    throw new Error("Missing material");
  }

  const base64Image = await encodeImageToBase64(img);
  const completion = await openRouter.chat.completions.create({
    model: "meta-llama/llama-4-maverick:free",
    messages: [
      {
        role: "system",
        content: `
          Analyze the meme image style and tone.
          Generate one short, punchy, emotionally resonant meme caption about "{keyword}".
          Match the image’s meme personality—e.g., ironic, self-deprecating, sarcastic, playful,
          exaggerated slang, absurdist, wholesome, dry humor, dark humor, or surreal.
          Use concise, casual internet slang.
          Max 1 sentence, no more than 12 words.
          Make it hit like a real meme—funny, weird, or painfully relatable.
          No explanations, only the caption.
        `.trim(),
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: keyword,
          },
          {
            type: "image_url",
            image_url: {
              url: base64Image,
            },
          },
        ],
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "meme",
        strict: true,
        schema: {
          type: "string",
          description: "The Meme text",
        },
      },
    },
  });

  console.log(completion)

  return NextResponse.json({ text: completion.choices?.[0]?.message?.content ?? "No result"});
};
