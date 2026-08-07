import { NextResponse } from "next/server";
import { getInterviewModel } from "@/lib/ai/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionText, candidateAnswer, role, expectedKeyPoints } = body;

    const model = getInterviewModel();

    const systemPrompt = `Evaluate the candidate's response for a ${role || "Software Engineer"} position.
Question Asked: "${questionText}"
Expected Key Points: ${JSON.stringify(expectedKeyPoints || [])}
Candidate Answer: "${candidateAnswer}"

Analyze technical accuracy, clarity, and STAR method coverage. Return STRICT JSON in this exact structure:
{
  "score": 85,
  "technicalAccuracy": 80,
  "communicationScore": 90,
  "feedback": "Concise summary of candidate's answer strength and weakness.",
  "coveredPoints": ["Points candidate got right"],
  "missingPoints": ["Points candidate missed"],
  "idealAnswer": "A model senior-level response to this question."
}`;

    const result = await model.generateContent(systemPrompt);
    const parsedData = JSON.parse(result.response.text());

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}