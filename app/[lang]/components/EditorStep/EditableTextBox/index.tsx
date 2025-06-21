import { Rnd } from "react-rnd";
import { CaptionStyles } from "@/hooks/useCaptionStyle";
import DragHandle from "./DragHandle";
import { useEffect, useRef } from "react";

interface Props {
  size: { width: number; height: number };
  position: { x: number; y: number };
  onDragStop: (e: any, d: any) => void;
  onResizeStop: (e: any, dir: any, ref: any, delta: any, pos: any) => void;
  text: string;
  onInput: (text: string) => void;
  styles: CaptionStyles;
}

const enableResizing = {
  top: true,
  right: true,
  bottom: true,
  left: true,
  topRight: true,
  bottomRight: true,
  bottomLeft: true,
  topLeft: true,
};

export default function EditableTextBox({ size, position, onDragStop, onResizeStop, text, onInput, styles }: Props) {
  return (
    <Rnd
      size={size}
      minWidth={80}
      minHeight={40}
      position={position}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      bounds="parent"
      enableResizing={enableResizing}
      className="absolute z-20 border-2 border-dashed border-bgSecondary rounded"
      dragHandleClassName="drag-handle"
      enableUserSelectHack={false}
    >
      <DragHandle />
      <div
        className="
          absolute insert-0 bottom-0 left-0 w-full h-full overflow-hidden outline-none 
          text-bgPrimary bg-transparent whitespace-pre-wrap
          text-xl p-1"
        style={{
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily.font,
          textAlign: styles.textAlign,
          WebkitTextStroke: `2px ${styles.outlineColor}`,
          WebkitTextFillColor: `${styles.outlineColor}`,
          lineHeight: `${styles.fontSize * 1.2}px`,
        }}
      >
        {text}
      </div>
      <textarea
        value={text}
        onChange={(e) => onInput(e.target.value)}
        className="
          absolute insert-0 w-full h-full overflow-hidden break-words outline-none resize-none
          text-fgPrimary bg-transparent 
          top-0 left-0 p-1"
        style={{
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily.font,
          color: styles.textColor,
          textAlign: styles.textAlign,
          lineHeight: `${styles.fontSize * 1.2}px`,
        }}
      />
    </Rnd>
  );
}
