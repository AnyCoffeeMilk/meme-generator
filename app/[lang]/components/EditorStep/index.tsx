import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import StepTitle from "../StepTitle";
import FontSelector from "./FontSelector";
import ColorPicker from "./ColorPicker";
import FontSizeInput from "./FontSizeInput";
import AlignSelector, { Align } from "./AlignSelector";
import CaptionEditor from "./CaptionEditor";
import { useDictionary } from "../../context/DictionaryProvider";

interface Props {
  imgBase64: string;
  caption: string;
}

const EditorStep = forwardRef<HTMLCanvasElement, Props>(({ imgBase64, caption }, ref) => {
  const [edited, setEdited] = useState("");
  const [fontSize, setFontSize] = useState<number>(0);
  const [fontFamily, setFontFamily] = useState("Impact");
  const [textColor, setTextColor] = useState("#ffffff");
  const [captionAlign, setCaptionAlign] = useState<Align>("bottom");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dictionary = useDictionary();

  useImperativeHandle(ref, () => canvasRef.current!, []);

  useEffect(() => {
    setEdited(caption);
  }, [caption]);

  useEffect(() => {
    const image = new Image();
    image.src = imgBase64;
    image.onload = () => {
      setFontSize(Math.floor(image.width * 0.05));
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgBase64) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = imgBase64;
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);

      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      const lineHeight = fontSize * 1.2;
      const yStart = {
        top: fontSize + 10,
        center: height / 2 - (lineHeight * (edited.split("\n").length - 1)) / 2,
        bottom: height - 40 - lineHeight * (edited.split("\n").length - 1),
      }[captionAlign];

      const lines = edited.split("\n");
      lines.forEach((line, i) => {
        ctx.strokeText(line, width / 2, yStart + i * lineHeight);
        ctx.fillText(line, width / 2, yStart + i * lineHeight);
      });
    };
  }, [imgBase64, edited, fontSize, fontFamily, textColor, captionAlign]);

  return (
    <div className="flex flex-1 flex-col h-full gap-4">
      <StepTitle step={3}>{dictionary.instructions.edit}</StepTitle>
      <div className="flex flex-col sm:flex-row flex-1 gap-4">
        <div className="flex-center flex-1 min-h-[200px] relative border-2 border-dashed border-bgSecondary rounded-md">
          <canvas ref={canvasRef} className="absolute max-w-full max-h-full object-contain" />
        </div>

        <div className="flex flex-col justify-center gap-4 py-4">
          <div className="text-left">
            <label className="block text-sm font-semibold mb-1">{dictionary.labels.font}</label>
            <div className="flex gap-2">
              <FontSizeInput value={fontSize} onChange={setFontSize} />
              <FontSelector value={fontFamily} onChange={setFontFamily} />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-sm font-semibold mb-1">{dictionary.labels.align}</label>
            <div className="flex gap-2">
              <AlignSelector value={captionAlign} onChange={setCaptionAlign} />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-sm font-semibold mb-1">{dictionary.labels.text}</label>
            <div className="flex gap-2">
              <CaptionEditor value={edited} onChange={setEdited} />
              <ColorPicker value={textColor} onChange={setTextColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditorStep;
