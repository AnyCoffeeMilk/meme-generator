import { useDropdown } from "@/hooks/useDropdown";

interface Props {
  value: number | "NaN";
  onChange: (size: number) => void;
}

export default function FontSizeInput({ value, onChange }: Props) {
  const { ref, isActive, toggle } = useDropdown<HTMLDivElement>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(isNaN(newValue) ? 0 : newValue);
  };

  return (
    <div ref={ref} className="relative inline-block my-auto w-[60px] text-sm flex-none items-end">
      <button
        type="button"
        className="
            container-md clickable w-full inline-flex justify-center gap-0.5 items-center group
            py-1 shadow-sm text-sm
            hover:bg-bgSecondary"
        onClick={() => toggle()}
      >
        <div className="ctext-sm">{value}</div>
        <label className="text-sm text-fgSecondary pointer-events-none">px</label>
      </button>
      {isActive && (
        <ul className="container-md absolute left-[-40%] z-40 mt-2 pt-1 w-30 px-2 shadow-lg">
          <input type="range" min={1} max={99} step={1} value={value} onChange={handleChange} className="w-full" />
        </ul>
      )}
    </div>
  );
}
