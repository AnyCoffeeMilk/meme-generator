import Image from "next/image";
import React, { useState } from "react";

export default function ImageInput() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="flex-center min-h-[300px] flex-1 w-full relative">
      <input
        className="h-full flex-1 cursor-pointer z-10 p-4 border-2 border-dashed text-transparent border-bgSecondary hover:border-fgSecondary rounded-md"
        name="img"
        type="file"
        autoComplete="false"
        accept="image/*"
        onChange={handleChange}
      />
      {(previewUrl && <img className="absolute w-full h-full p-4 object-contain" src={previewUrl} alt="Preview" />) || (
        <Image className="dark:invert absolute" src="/upload.svg" alt="Next.js logo" width={50} height={50} priority />
      )}
    </div>
  );
}
