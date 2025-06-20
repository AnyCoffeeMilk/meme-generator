import { useDropdown } from "@/hooks/useDropdown";
import SelectorBtn from "../SelectorBtn";

interface Props {
  value: string;
  onChange: (font: string) => void;
}

const FONT_OPTIONS = ["Impact", "Arial", "Comic Sans MS", "Times New Roman"];

export default function FontSelector({ value, onChange }: Props) {
  const { ref, isActive, toggle } = useDropdown<HTMLDivElement>();

  return (
    <div ref={ref} className="relative rounded-md w-48">
      <SelectorBtn text={value} onClick={() => toggle()} />
      {isActive && (
        <ul className="container-md absolute z-10 mt-2 w-48 overflow-hidden shadow-lg">
          {FONT_OPTIONS.map((font) => (
            <li key={font}>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-bgSecondary ${value === font && "bg-bgSecondary"}`}
                style={{ fontFamily: font }}
                onClick={() => {
                  onChange(font);
                  toggle();
                }}
              >
                {font}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
