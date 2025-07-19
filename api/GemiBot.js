import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import showdown from "showdown";

dotenv.config();
const converter = new showdown.Converter();

// Access your API key as an environment variable (see "Set up your API key" above)

export default async function run(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const resMarkdown = result.response.text();
  const resHtml = converter.makeHtml(resMarkdown);
  return resHtml;
}

// const text = await run("rekomendasi laptop gaming spek dewa");
// console.log(text)
