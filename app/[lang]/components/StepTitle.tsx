interface Props {
  step: number;
  children: string;
}

export default function StepTitle({ step, children }: Props) {
  return (
    <div className="flex items-center text-sm sm:text-base gap-4">
      <label
        className="
          flex-center rounded text-center
          min-w-[1.5em] min-h-[1.5em] 
          bg-fgSecondary text-bgPrimary font-extrabold"
      >
        {step}
      </label>
      <div className="font-bold">{children}</div>
    </div>
  );
}
