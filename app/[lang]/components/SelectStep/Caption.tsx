interface Props {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function Caption({ text, isSelected, onSelect }: Props) {
  return (
    <div
      className={`
        container-md clickable flex items-center group
        px-4 gap-4 ${isSelected && "bg-bgSecondary"} 
        hover:bg-bgSecondary`}
      onClick={onSelect}
    >
      <span className={`${isSelected ? "text-fgPrimary" : "text-fgSecondary"} group-hover:text-fgPrimary `}>
        "{text}"
      </span>
    </div>
  );
}
