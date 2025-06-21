import Image from "next/image";

export default function DragHandle() {
  return (
    <div
      className="
        drag-handle 
        absolute cursor-move select-none rounded-md 
        -top-2.5 -right-2.5 z-30 w-5 h-5 
        bg-fgTheme hover:bg-bgTheme"
    >
      <Image
        className="dark:invert select-none"
        draggable={false}
        src="/move.svg"
        alt="Drag"
        width={50}
        height={50}
        priority
      />
    </div>
  );
}
