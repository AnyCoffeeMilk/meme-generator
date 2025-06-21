import { useDictionary } from "../context/DictionaryProvider";

interface Props {
  isLastStep: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function NextStepBtn({ isLastStep, onClick, disabled }: Props) {
  const dictionary = useDictionary();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        clickable rounded-md flex-1 whitespace-nowrap leading-tight uppercase
        py-3 text-fgPrimary font-bold
        bg-fgTheme hover:bg-bgTheme 
        disabled:text-bgPrimary disabled:bg-bgSecondary"
    >
      {isLastStep ? dictionary.buttons.download : dictionary.buttons.next}
    </button>
  );
}
