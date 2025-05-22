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
          Analyze the image to infer the meme style — such as Doge-speak, sarcastic tweet, rage comic, or any other recognizable meme format.
          Generate 5 short, punchy, emotionally resonant meme captions about "{keyword}".
          Each caption must:
          - Match the image’s meme personality — e.g., ironic, self-deprecating, sarcastic, playful, exaggerated slang, absurdist, wholesome, dry humor, dark humor, or surreal.
          - Use concise, casual internet slang.
          - Be a single sentence with no more than 12 words.
          - Hit like a real meme — funny, weird, or painfully relatable.
          Output only an array of 5 strings. No explanations or formatting.
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
    // response_format: {
    //   type: "json_schema",
    //   json_schema: {
    //     name: "meme_list",
    //     strict: true,
    //     schema: {
    //       type: "array",
    //       items: {
    //         type: "string",
    //         description: "One meme caption",
    //       },
    //       minItems: 5,
    //       maxItems: 5,
    //       description: "An array of 5 meme captions",
    //     },
    //   },
    // },
  });

  console.log(completion.choices?.[0]?.message);

  const result = completion.choices?.[0]?.message?.content

  return NextResponse.json({ textArray: result ? JSON.parse(result) : ["No result"] });
}
