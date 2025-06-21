import { useDropdown } from "@/hooks/useDropdown";
import { FontFamilyOptions, FontFamily } from "@/hooks/useCaptionStyle";
import SelectorBtn from "../../SelectorBtn";

interface Props {
  value: FontFamily;
  onChange: (fontFamily: FontFamily) => void;
}

export default function FontSelector({ value, onChange }: Props) {
  const { ref, isActive, toggle } = useDropdown<HTMLDivElement>();

  return (
    <div ref={ref} className="relative rounded-md my-auto w-42">
      <SelectorBtn style={{ fontFamily: value.font }} text={value.label} onClick={() => toggle()} />
      {isActive && (
        <ul className="container-md absolute z-40 mt-2 w-full overflow-hidden shadow-lg">
          {FontFamilyOptions.map(({font, label}) => (
            <li key={font}>
              <button
                className={`w-full flex text-left justify-between px-3 py-2 hover:bg-fgSecondary ${
                  value.font === font && "bg-bgSecondary"
                }`}
                style={{ fontFamily: font }}
                onClick={() => {
                  onChange({font, label} as FontFamily);
                  toggle();
                }}
              >
                {label}
                {value.font === font && <span className="text-fgSecondary text-sm my-auto font-bold">✔</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
