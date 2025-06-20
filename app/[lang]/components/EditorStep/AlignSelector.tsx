import { useDropdown } from "@/hooks/useDropdown";
import SelectorBtn from "../SelectorBtn";
import { useDictionary } from "../../context/DictionaryProvider";

export type Align = "top" | "center" | "bottom";

interface Props {
  value: Align;
  onChange: (align: Align) => void;
}

export default function AlignSelector({ value, onChange }: Props) {
  const { ref, isActive, toggle } = useDropdown<HTMLDivElement>();

  const dictionary = useDictionary();

  const alignText: Record<Align, string> = {
    top: dictionary.align.top,
    center: dictionary.align.center,
    bottom: dictionary.align.bottom,
  };

  return (
    <div ref={ref} className="relative rounded-md w-48">
      <SelectorBtn text={alignText[value]} onClick={() => toggle()} />
      {isActive && (
        <ul className="container-md absolute z-10 mt-2 w-48 overflow-hidden shadow-lg">
          {Object.entries(alignText).map(([align, text]) => (
            <li key={align}>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-bgSecondary ${value === align && "bg-bgSecondary"}`}
                onClick={() => {
                  onChange(align as Align);
                  toggle();
                }}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
