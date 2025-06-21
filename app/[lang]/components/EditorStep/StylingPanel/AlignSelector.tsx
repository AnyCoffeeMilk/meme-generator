import { useDropdown } from "@/hooks/useDropdown";
import SelectorBtn from "../../SelectorBtn";
import { Align } from "@/hooks/useCaptionStyle";
import { useDictionary } from "../../../context/DictionaryProvider";

interface Props {
  value: Align;
  onChange: (align: Align) => void;
}

export default function AlignSelector({ value, onChange }: Props) {
  const { ref, isActive, toggle } = useDropdown<HTMLDivElement>();

  const dictionary = useDictionary();

  const alignText: Record<Align, string> = {
    left: dictionary.align.left,
    center: dictionary.align.center,
    right: dictionary.align.right,
  };

  return (
    <div ref={ref} className="relative my-auto rounded-md w-20">
      <SelectorBtn text={alignText[value]} onClick={() => toggle()} />
      {isActive && (
        <ul className="container-md absolute z-40 mt-2 w-full overflow-hidden shadow-lg">
          {Object.entries(alignText).map(([align, text]) => (
            <li key={align}>
              <button
                className={`w-full flex text-left justify-between px-3 py-2 hover:bg-fgSecondary ${
                  value === align && "bg-bgSecondary"
                }`}
                onClick={() => {
                  onChange(align as Align);
                  toggle();
                }}
              >
                {text}
                {value === align && <span className="text-fgSecondary font-bold">✔</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
