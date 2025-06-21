import { useState } from "react";

export type Align = "left" | "center" | "right";
export type FontFamily = (typeof FontFamilyOptions)[number];

export const FontFamilyOptions = [
  { font: "Impact", label: "Impact" },
  { font: "Arial", label: "Arial" },
  { font: "Comic Sans MS", label: "Comic Sans MS" },
  { font: "Times New Roman", label: "Times New Roman" },
  { font: "Source Han Sans", label: "思源黑体" },
];

export function useCaptionStyle() {
  const [fontSize, setFontSize] = useState<number>(20);
  const [fontFamily, setFontFamily] = useState<FontFamily>(FontFamilyOptions[0]);
  const [textColor, setTextColor] = useState("#ffffff");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [textAlign, setTextAlign] = useState<Align>("center");

  return {
    styles: {
      fontSize,
      fontFamily,
      textColor,
      textAlign,
      outlineColor,
    },
    setStyles: {
      setFontSize,
      setFontFamily,
      setTextColor,
      setTextAlign,
      setOutlineColor,
    },
  };
}

export type CaptionStyles = ReturnType<typeof useCaptionStyle>["styles"];
export type CaptionStylesSetters = ReturnType<typeof useCaptionStyle>["setStyles"];