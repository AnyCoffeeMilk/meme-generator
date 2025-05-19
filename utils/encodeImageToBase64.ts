export default async function encodeImageToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const mime = file.type;
  return `data:${mime};base64,${base64}`;
}
