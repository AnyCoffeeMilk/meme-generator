export default function KeywordInput() {
  return (
    <input
      name="keyword"
      type="text"
      autoComplete="false"
      className="flex-1 p-4 border-2 bg-bgPrimary text-fgPrimary autofill:text-fgPrimary border-bgSecondary focus:border-fgSecondary rounded-md"
      placeholder="Enter some keywords"
    />
  );
}
