import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  let activeTopic = "Software Engineering";

  try {
    const body = await req.json();
    const role: string = body?.role || "Software Engineer";
    const seniority: string = body?.seniority || "Mid-Level";
    const topic: string = body?.topic || "Software Engineering";
    const previousAnswer: string = body?.previousAnswer || "";

    activeTopic = topic;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = `You are a Senior Technical Interviewer conducting an interview for a ${seniority} ${role}.
Focus Topic: ${topic}.`;

    if (previousAnswer) {
      prompt += `\nThe candidate previously answered: "${previousAnswer}".
Ask a concise follow-up technical question based directly on their answer to evaluate deeper domain expertise. Do not ask generic questions.`;
    } else {
      prompt += `\nAsk a sharp, practical opening technical question to start the interview.`;
    }

    prompt += `\nReturn ONLY the interview question text. Keep it under 25 words. No markdown formatting or extra dialogue.`;

    const result = await model.generateContent(prompt);
    const generatedQuestion = result.response.text().trim();

    return NextResponse.json({ question: generatedQuestion });
  } catch (error) {
    console.error("Gemini Question API Error:", error);

    const fallbackQuestions = [
      `What are the main performance considerations when scaling ${activeTopic}?`,
      `How do you handle error boundaries and asynchronous state in production?`,
      `Describe your approach to API caching and data fetching optimizations.`,
      `How do you ensure test coverage and maintainability across a large codebase?`
    ];
    const randomIndex = Math.floor(Math.random() * fallbackQuestions.length);

    return NextResponse.json({ question: fallbackQuestions[randomIndex] });
  }
}