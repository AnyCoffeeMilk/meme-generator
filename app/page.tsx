"use client";

import ImageInput from "./_components/ImageInput";
import KeywordInput from "./_components/KeywordInput";
import StartBtn from "./_components/StartBtn";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<Array<String>>([]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult([]);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setResult(data.textArray || ["No result"]);
    } catch (error) {
      setResult(["Error occurred"]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 lg:w-[1024px] grid grid-rows-[auto_1fr_auto] py-16 font-mono">
      <div className="font-mono grid gap-4 mb-16">
        <h1 className="text-6xl font-extrabold tracking-widest text-center">MemeGen</h1>
        <h2 className="text-2xl text-fgSecondary text-center">
          Generate Meme Caption by Image and keywords.
        </h2>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-8 font-mono">
        <ImageInput />
        <div className="flex flex-col sm:flex-row text-2xl gap-8 w-full text-fgPrimary">
          <KeywordInput />
          <StartBtn disabled={loading} />
        </div>
      </form>
      {loading && <p className="text-center text-3xl mt-16 font-bold">Generating...</p>}
      {result && (
        <div className="text-3xl mt-16 font-semibold">
          {result.map((item, index) => (
            <p className="flex gap-4 my-4 group cursor-pointer">
              <span>-</span>
              <span className="group-hover:underline" key={index}>
                {item}
              </span>
            </p>
          ))}
        </div>
      )}
    </main>
  );
}
