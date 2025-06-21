import Image from "next/image";

interface Props {
  previewUrl: string | null;
  onUploadImg: (file: File) => void;
}

export default function ImageInput({ previewUrl, onUploadImg }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadImg(file);
    }
  };

  return (
    <div className="flex-center flex-1 relative">
      <input
        className="
          clickable h-full flex-1 rounded-md border-dashed 
          z-10 p-4 border-2 
          border-bgSecondary text-transparent 
          hover:border-fgSecondary"
        name="img"
        type="file"
        autoComplete="false"
        accept="image/*"
        onChange={handleChange}
      />
      {(previewUrl && <img className="absolute w-full h-full p-4 object-contain" src={previewUrl} alt="Preview" />) || (
        <Image
          className="dark:invert absolute"
          src="/upload.svg"
          alt="Upload Image"
          draggable={false}
          width={50}
          height={50}
          priority
        />
      )}
    </div>
  );
}
