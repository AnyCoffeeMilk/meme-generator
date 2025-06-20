"use server";

import { analyzeStyle, generateCaptions, filterCaptions, oneStepGenerate, chineseTranslater } from "@/utils/meme";

const useOneStepGenerate = false;
const withFilter = false;
const useChineseTranslater = true;

export async function generateMemeCaptions(base64: string, keyword: string) {
  if (useOneStepGenerate) {
    const captions = await oneStepGenerate(base64, keyword);
    return captions;    
  }

  const styleAdvice = await analyzeStyle(base64, keyword);
  const captions = await generateCaptions(base64, keyword, styleAdvice);

  if (useChineseTranslater) {
    const translated = await chineseTranslater(captions, base64, keyword);
    return translated;
  }

  if (withFilter) {
    const filtered = await filterCaptions(captions, base64, keyword);
    return filtered;
  }
  return captions;
}
