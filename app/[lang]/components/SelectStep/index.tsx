import Caption from "./Caption";
import StepTitle from "../StepTitle";
import Loading from "./Loading";
import { useDictionary } from "../../context/DictionaryProvider";

interface Props {
  captions: Array<string>;
  isPending: Boolean;
  selected: string;
  onSelect: (selected: string) => void;
};

export default function SelectStep({ captions, isPending, selected, onSelect }: Props) {
  const dictionary = useDictionary();

  const handleSelect = (caption: string) => {
    onSelect(caption);
  };

  return (
    <div className="flex flex-col gap-4">
      <StepTitle step={2}>{dictionary.instructions.select}</StepTitle>
      <div className="flex flex-col relative justify-center flex-1">
        {isPending && (
          <Loading />
        )}
        <div className="grid text-sm sm:text-base font-semibold flex-1 gap-2">
          {captions.map((item, index) => (
            <Caption key={index} text={item} isSelected={selected === item} onSelect={() => handleSelect(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}
