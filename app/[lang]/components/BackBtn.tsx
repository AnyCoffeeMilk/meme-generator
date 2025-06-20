import { useDictionary } from "../context/DictionaryProvider";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export default function BackBtn({ onClick, disabled }: Props) {
  const dictionary = useDictionary();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        container-md clickable whitespace-nowrap leading-tight uppercase
        py-4 px-8 text-fgPrimary font-bold
        hover:bg-bgSecondary
        disabled:text-bgSecondary disabled:bg-bgPrimary"
    >
      {dictionary.buttons.back}
    </button>
  );
}
