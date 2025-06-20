const dictionaries = {
  "en": () => import("@/lang/en-US.json").then((module) => module.default),
  "zh": () => import("@/lang/zh-CN.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const loadDictionary = dictionaries[locale as keyof typeof dictionaries];
  if (loadDictionary) {
    return loadDictionary();
  }
  return dictionaries["en"]();
};

type DictionariesType = typeof dictionaries;

export const locales = Object.keys(dictionaries);
export type Dictionary = Awaited<ReturnType<DictionariesType[keyof DictionariesType]>>;
