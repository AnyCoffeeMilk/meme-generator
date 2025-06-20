import { useDropdown } from "@/hooks/useDropdown";
import { useDictionary } from "../../context/DictionaryProvider";

interface Props {
  value: string;
  onChange: (newCaption: string) => void;
}

export default function CaptionEditor({ value, onChange }: Props) {
  const { ref, isActive, toggle } = useDropdown<HTMLDivElement>();
  const dictionary = useDictionary();

  return (
    <div ref={ref} className="relative rounded-md w-48">
      <button
        type="button"
        className="
          container-md clickable w-full uppercase group
          px-4 py-2
          text-sm font-bold shadow-sm
          hover:bg-bgSecondary"
        onClick={() => toggle()}
      >
        {dictionary.buttons.editCaption}
      </button>
      {isActive && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={dictionary.placeholder.caption}
          className="
            container-md absolute bottom-[100%] right-0 resize-none
            min-h-[100px] z-10 mb-2 w-48 p-3
            text-sm text-fgPrimary shadow-lg
            focus:outline-none focus:border-fgSecondary"
        />
      )}
    </div>
  );
}
