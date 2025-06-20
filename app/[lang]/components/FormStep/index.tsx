import ImageInput from "./ImageInput";
import KeywordInput from "./KeywordInput";
import StepTitle from "../StepTitle";
import { useEffect, useState } from "react";
import TagSuggestions from "./TagSuggestions";
import { useDictionary } from "../../context/DictionaryProvider";

interface Props {
  keyword: string;
  onKeywordChange: (newKeyword: string) => void;
  previewUrl: string | null;
  onUpload: (file: File) => void;
}

const defaultKeywords = ["上课", "无聊", "办公室", "工作", "学习", "放松", "旅行", "吃饭"];

export default function FormStep({ keyword, onKeywordChange, previewUrl, onUpload }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const dictionary = useDictionary();

  useEffect(() => {
    const fetchKeywords = async () => {
      setSuggestions(defaultKeywords);
    };
    fetchKeywords();
  }, []);

  const handleTagClick = (tag: string) => onKeywordChange(`${keyword.trim()} ${tag}`.trim());

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <StepTitle step={1}>{dictionary.instructions.form}</StepTitle>
      <ImageInput previewUrl={previewUrl} onUploadImg={onUpload} />
      <div className="grid gap-2">
        <KeywordInput keyword={keyword} onKeywordChange={onKeywordChange} />
        <TagSuggestions suggestions={suggestions} onTagClick={handleTagClick} />
      </div>
    </div>
  );
}
