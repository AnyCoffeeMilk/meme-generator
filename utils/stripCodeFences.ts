export default function stripCodeFences(str: string) {
  const regex = /\[([^\[\]]*(?:\[[^\[\]]*\][^\[\]]*)*)\]/g;
  const match = regex.exec(str);
  if (!match) return "[]";

  const jsonContent = match[1].trim().replace(/,\s*$/, "");
  return `[${jsonContent}]`;
}