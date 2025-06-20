import React, { use } from "react";
import { useDictionary } from "../../context/DictionaryProvider";

interface Props {
  keyword: string;
  onKeywordChange: (newKeyword: string) => void;
}

export default function KeywordInput({ keyword, onKeywordChange }: Props) {
  const dictionary = useDictionary();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(e.target.value);
  };

  return (
    <input
      name="keyword"
      type="text"
      autoComplete="false"
      className="
        w-full container-md
        p-4  text-fgPrimary text-base sm:text-lg 
        autofill:text-fgPrimary 
        hover:border-fgSecondary 
        focus:border-fgSecondary"
      placeholder={dictionary.placeholder.keywords}
      value={keyword}
      onChange={handleChange}
    />
  );
}
