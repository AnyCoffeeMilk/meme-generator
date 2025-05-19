import OpenAI from 'openai';

let openRouter: null | OpenAI;

export const getOpenRouter = () => {
  if (!openRouter) {
    openRouter = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.API_KEY,
    });
  }
  return openRouter;
};