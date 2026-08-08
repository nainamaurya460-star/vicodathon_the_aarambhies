import { NextResponse } from "next/server";
import { getInterviewModel } from "@/lib/ai/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, seniority, topic, questionIndex } = body;

    const model = getInterviewModel();

    const systemPrompt = `You are a Senior Technical Interviewer conducting a mock interview for a ${seniority || "Intermediate"} ${role || "Software Engineer"} specializing in ${topic || "General"}.
    
Generate question #${questionIndex || 1}. Return STRICT JSON format matching this schema:
{
  "questionId": "q_${Date.now()}",
  "questionText": "Clear technical question here",
  "category": "Architecture | System Design | Theoretical | Problem Solving",
  "difficulty": "Easy" | "Medium" | "Hard",
  "expectedKeyPoints": ["Point 1", "Point 2", "Point 3"]
}`;

    const result = await model.generateContent(systemPrompt);
    const parsedData = JSON.parse(result.response.text());

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate question" },
      { status: 500 }
    );
  }
}