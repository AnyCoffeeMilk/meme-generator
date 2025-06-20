"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Dictionary } from "@/utils/getDictionary";

export const DictionaryContext = createContext<Dictionary>({} as Dictionary);

interface Props {
  dict: Dictionary;
  children: ReactNode;
}

export function DictionaryProvider({ dict, children }: Props) {
  return <DictionaryContext.Provider value={dict}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  return useContext(DictionaryContext);
}
