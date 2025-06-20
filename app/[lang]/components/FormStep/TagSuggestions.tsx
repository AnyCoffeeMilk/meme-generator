import { shuffleArray } from "@/utils/shuffleArray";

interface Props {
  suggestions: string[];
  onTagClick: (tag: string) => void;
}

export default function TagSuggestions({ suggestions, onTagClick }: Props) {
  const visibleSuggestions = shuffleArray(suggestions).slice(0, 5);

  return (
    <div className="flex px-2 gap-2">
      {visibleSuggestions.map((keyword, index) => (
        <label
          key={index}
          onClick={() => onTagClick(keyword)}
          className="
            container-md clickable rounded-full 
            px-2 py-1 text-fgSecondary text-sm font-semibold
            hover:border-fgSecondary hover:bg-fgSecondary hover:text-bgPrimary"
        >
          #{keyword}
        </label>
      ))}
    </div>
  );
}
