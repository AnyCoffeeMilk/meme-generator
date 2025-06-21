import { useDropdown } from "@/hooks/useDropdown";
import { ChromePicker } from "react-color";

interface Props {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: Props) {
  const { ref, isActive, toggle } = useDropdown<HTMLDivElement>();

  return (
    <div ref={ref} className="relative inline-block my-auto h-[30px] w-[40px] text-sm flex-none items-end">
      <div className="container-md clickable relative inline-block h-full w-full p-1 hover:border-fgSecondary hover:bg-bgSecondary">
        <button
          onClick={() => toggle()}
          className="w-full h-full clickable rounded border border-fgSecondary"
          style={{ backgroundColor: value }}
        />
        {isActive && (
          <ChromePicker
            disableAlpha
            className="
              !container-md absolute !font-mono
              top-[100%] right-[-100%] mt-2 z-40
              [&_input]:!shadow-none [&_input]:!border 
              [&_input]:!border-bgSecondary [&_input]:!text-fgPrimary 
              [&_label]:!text-fgSecondary [&_label]:!font-bold
              [&_svg]:!fill-fgSecondary [&_svg]:ml-2 [&_svg]:hover:!bg-bgSecondary"
            color={value}
            onChange={(color) => onChange(color.hex)}
          />
        )}
      </div>
    </div>
  );
}
