import React from "react";

export default function Loading() {
  return (
    <div
      className="
        absolute self-center rounded-full inline-block animate-spin box-border
        w-12 h-12 border-4
        border-fgSecondary border-b-fgTheme"
    />
  );
}
