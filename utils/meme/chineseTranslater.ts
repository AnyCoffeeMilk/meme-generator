"use server";

import { getOpenRouter } from "@/utils/openRouter";
import stripCodeFences from "../stripCodeFences";

const openRouter = getOpenRouter();
//               - 仅返回最佳的 5 个{captions}
export async function chineseTranslater(captions: string[], imageBase64: string, keyword: string): Promise<string[]> {
  const response = await openRouter.chat.completions.create({
    // model: "google/gemini-2.0-flash-lite-001",
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
              你是梗图文本质量优化器。
              输入：一张梗图、几句根据梗图生成的文本{captions}、和用戶提供的关键词{keywords}。
              任务：
              - 修改{captions}各句使其符合中文的日常语法
              - 删除枯燥、一般、无趣、失调或重复的{captions}。
              - 保留与梗图和用戶提供关键词{keywords}主题的幽默、氛围、文化背景相匹配的{captions}。
              - 前3句保留第一人称视角。
              - 后2句保留不采用第一人称视角。
              仅回复一个包含5句已优化文本的JSON数组，无代码栅栏或额外文本。
              {keywords}: ${keyword}
              {captions}: ${JSON.stringify(captions)}
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
