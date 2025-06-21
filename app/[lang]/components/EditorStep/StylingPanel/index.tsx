import { useCaptionStyle } from "@/hooks/useCaptionStyle";
import { useDictionary } from "@/app/[lang]/context/DictionaryProvider";
import FontSizeInput from "./FontSizeInput";
import FontSelector from "./FontSelector";
import AlignSelector from "./AlignSelector";
import ColorPicker from "./ColorPicker";

interface Props {
  styles: ReturnType<typeof useCaptionStyle>["styles"];
  setStyles: ReturnType<typeof useCaptionStyle>["setStyles"];
}

export default function StylingPanel({ styles, setStyles }: Props) {
  const dictionary = useDictionary();

  return (
    <div className="flex gap-4">
      <div className="flex gap-2">
        <label className="my-auto text-sm font-semibold">{dictionary.labels.font}</label>
        <div className="flex gap-2">
          <FontSizeInput value={styles.fontSize} onChange={setStyles.setFontSize} />
          <FontSelector value={styles.fontFamily} onChange={setStyles.setFontFamily} />
        </div>
      </div>

      <div className="flex gap-2">
        <label className="my-auto text-sm font-semibold">{dictionary.labels.align}</label>
        <div className="flex gap-2">
          <AlignSelector value={styles.textAlign} onChange={setStyles.setTextAlign} />
        </div>
      </div>

      <div className="flex gap-2">
        <label className="my-auto text-sm font-semibold">{dictionary.labels.color}</label>
        <div className="flex gap-2">
          <ColorPicker value={styles.textColor} onChange={setStyles.setTextColor} />
        </div>
      </div>

      <div className="flex gap-2">
        <label className="my-auto text-sm font-semibold">{dictionary.labels.outline}</label>
        <div className="flex gap-2">
          <ColorPicker value={styles.outlineColor} onChange={setStyles.setOutlineColor} />
        </div>
      </div>
    </div>
  );
}
