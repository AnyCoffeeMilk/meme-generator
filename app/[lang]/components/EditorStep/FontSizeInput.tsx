interface Props {
  value: number | "NaN";
  onChange: (size: number) => void;
}

export default function FontSizeInput({ value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(isNaN(newValue) ? 0 : newValue)
  }

  return (
    <div className="container-md flex items-center gap-1 w-18 overflow-hidden">
      <input
        type="number"
        value={value}
        min={8}
        max={99}
        onChange={handleChange}
        className="
          appearance-none text-end 
          py-2 bg-bgPrimary text-sm 
          focus:outline-none 
          hover:border-fgPrimary 
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-webkit-outer-spin-button]:appearance-none"
      />
      <label className="text-sm text-fgSecondary pointer-events-none">px</label>
    </div>
  );
}
