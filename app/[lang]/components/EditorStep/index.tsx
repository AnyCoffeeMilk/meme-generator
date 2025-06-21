import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useParams } from "next/navigation";
import StepTitle from "../StepTitle";
import StylingPanel from "./StylingPanel";
import { useDictionary } from "../../context/DictionaryProvider";
import { useCaptionStyle } from "@/hooks/useCaptionStyle";
import { useRndBox } from "@/hooks/useRndBox";
import EditableTextBox from "./EditableTextBox";

interface Props {
  imgBase64: string;
  caption: string;
}

const EditorStep = forwardRef<HTMLCanvasElement, Props>(({ imgBase64, caption }, ref) => {
  const { lang } = useParams();
  const { position, size, handlers } = useRndBox();
  const { styles, setStyles } = useCaptionStyle();
  const dictionary = useDictionary();

  const [text, setText] = useState<string>(caption)

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => canvasRef.current!, []);

  useEffect(() => {
    if (lang === "zh") {
      setStyles.setFontFamily({ font: "Source Han Sans", label: "思源黑体" });
    }
  }, [lang]);

  useEffect(() => {
    setText(caption);
  }, [caption]);

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

      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      if (!wrapperRect) return;

      const canvasOffsetX = (wrapperRect.width - canvas.clientWidth) / 2;
      const canvasOffsetY = (wrapperRect.height - canvas.clientHeight) / 2;

      const scaleX = canvas.width / canvas.clientWidth;
      const scaleY = canvas.height / canvas.clientHeight;

      console.log(canvasOffsetY, canvasOffsetX, scaleY, scaleX)

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);

      const scaledFontSize = styles.fontSize * scaleY;

      ctx.font = `${scaledFontSize}px "${styles.fontFamily.font}"`;
      ctx.textBaseline = "top";
      ctx.textAlign = styles.textAlign;
      ctx.lineWidth = 2 * scaleY;
      ctx.strokeStyle = styles.outlineColor;
      ctx.fillStyle = styles.textColor;
      ctx.miterLimit = 2;

      const padding = 4;
      const borderWidth = 1.6;

      const boxX = (position.x + padding - canvasOffsetX + borderWidth) * scaleX;
      const boxY = (position.y + padding + canvasOffsetY + borderWidth) * scaleY - (canvasOffsetY - borderWidth) * 2;
      const boxWidth = size.width * scaleX - padding * 2 * scaleX - borderWidth * 2 * scaleX;

      const lines = wrapTextByChar(ctx, text, boxWidth);
      const lineHeight = scaledFontSize * 1.2;

      const xPos = {
        left: boxX,
        center: boxX + boxWidth / 2,
        right: boxX + boxWidth,
      }[styles.textAlign];

      lines.forEach((line, i) => {
        const y = boxY + i * lineHeight;
        ctx.strokeText(line, xPos, y, boxWidth);
        ctx.fillText(line, xPos, y, boxWidth);
      });
    };

    function wrapTextByChar(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
      const lines: string[] = [];
      const chars = Array.from(text.match(/[\u4e00-\u9fa5]|[a-zA-Z0-9]+|[^\u4e00-\u9fa5a-zA-Z0-9]/g) || []);
      let line = "";

      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const testLine = line + char;
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && line !== "") {
          const isPunctuation = /[，。！？]/.test(char);

          if (isPunctuation && line.length > 0) {
            const prevChar = line[line.length - 1];
            line = line.slice(0, -1);
            if (line) lines.push(line);
            line = prevChar + char;
          } else {
            lines.push(line);
            line = char;
          }
        } else {
          line += char;
        }
      }

      if (line) lines.push(line);
      return lines;
    }
  }, [imgBase64, text, styles, position, size]);

  return (
    <div className="flex flex-1 flex-col h-full gap-4">
      <StepTitle step={3}>{dictionary.instructions.edit}</StepTitle>
      <div className="flex flex-col flex-1 gap-2">
        <StylingPanel styles={styles} setStyles={setStyles} />
        <div ref={wrapperRef} className="flex flex-col flex-1">
          <div className="flex-center w-full h-full relative border-2 border-dashed border-bgSecondary rounded-md">
            <canvas ref={canvasRef} className="absolute max-w-full max-h-full object-contain" />
          </div>
          <EditableTextBox
            size={size}
            position={position}
            onDragStop={handlers.onDragStop}
            onResizeStop={handlers.onResizeStop}
            text={text}
            onInput={setText}
            styles={styles}
          />
        </div>
      </div>
    </div>
  );
});

export default EditorStep;
