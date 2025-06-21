"use client";

import { JSX, useEffect, useRef, useState, useTransition } from "react";
import NextStepBtn from "./components/NextStepBtn";
import FormStep from "./components/FormStep";
import SelectStep from "./components/SelectStep";
import EditorStep from "./components/EditorStep";
import DownloadStep from "./components/DownloadStep";
import BackBtn from "./components/BackBtn";
import imageToBase64 from "@/utils/imageToBase64";
import { generateMemeCaptions } from "@/actions/generateMemeCaptions";
import { useDictionary } from "./context/DictionaryProvider";

type StepIndex = 1 | 2 | 3 | 4;

export default function Home() {
  const [step, setStep] = useState<StepIndex>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [imgBase64, setImgBase64] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [captions, setCaptions] = useState<Array<string>>([]);
  const [selected, setSelected] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dictionary = useDictionary();

  useEffect(() => {
    if (captions.length === 0) return;
    setCaptions([]);
    setSelected("");
  }, [keyword, imgBase64]);

  const handleImgUpload = async (image: File) => {
    const url = URL.createObjectURL(image);
    const base64 = await imageToBase64(image);
    setPreviewUrl(url);
    setImgBase64(base64);
  };

  const handleNextStep = () => {
    switch (step) {
      case 1:
        if (!keyword || !imgBase64) return;
        setStep(2);
        if (captions.length === 0) {
          startTransition(async () => {
            const captions = await generateMemeCaptions(imgBase64, keyword);
            setCaptions(captions);
          });
        }
        break;
      case 2:
        if (!selected) return;
        setStep(3);
        break;
      case 3:
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        break;
    }
  };

  const isNextStepDisabled = !keyword || !imgBase64 || isPending || (!selected && step >= 2);

  const stepComponent: JSX.Element = {
    1: <FormStep keyword={keyword} onKeywordChange={setKeyword} previewUrl={previewUrl} onUpload={handleImgUpload} />,
    2: <SelectStep captions={captions} isPending={isPending} selected={selected} onSelect={setSelected} />,
    3: <EditorStep ref={canvasRef} caption={selected} imgBase64={imgBase64} />,
    4: <DownloadStep />,
  }[step];

  return (
    <main className="flex-1 w-full sm:px-8 lg:w-[768px] sm:max-h-screen grid grid-rows-[auto_1fr] py-8 gap-8">
      <div className="grid gap-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-center">{dictionary.header.title}</h1>
        <h2 className="text-sm sm:text-base text-fgSecondary text-center">{dictionary.header.subtitle}</h2>
      </div>
      <div className="grid grid-rows-[1fr_auto] gap-4 border p-4 border-bgSecondary rounded-lg shadow-lg">
        {stepComponent}
        <div className="flex gap-2 sm:gap-4 w-full text-sm sm:text-base">
          {step > 1 && (
            <BackBtn onClick={() => setStep((cur) => (cur - 1) as StepIndex)} disabled={step === 1 || isPending} />
          )}
          <NextStepBtn isLastStep={step === 3} onClick={handleNextStep} disabled={isNextStepDisabled} />
        </div>
      </div>
    </main>
  );
}
