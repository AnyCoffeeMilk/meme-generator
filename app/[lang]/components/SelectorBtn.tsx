import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

export default function SelectorBtn({ text, onClick }: Props) {
  return (
    <button
      type="button"
      className="
        container-md clickable w-full inline-flex justify-between items-center group
        px-4 py-2 shadow-sm text-sm
        hover:bg-bgSecondary"
      onClick={onClick}
    >
      {text}
      <svg
        className="w-4 h-4 ml-2 text-bgSecondary group-hover:text-fgSecondary"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.1 1.02l-4.25 4.65a.75.75 0 01-1.1 0L5.25 8.29a.75.75 0 01-.02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
