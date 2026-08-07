import { NextResponse } from "next/server";
import { getInterviewModel } from "@/lib/ai/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, role, seniority, transcript } = body;

    if (!transcript || !Array.isArray(transcript)) {
      return NextResponse.json(
        { success: false, error: "Invalid transcript payload provided." },
        { status: 400 }
      );
    }

    const model = getInterviewModel();

    const systemPrompt = `You are a Lead Hiring Manager evaluating a technical candidate.
Session ID: ${sessionId || "session_default"}
Target Role: ${seniority || "Mid-Level"} ${role || "Software Engineer"}
Full Interview Transcript & Evaluations: ${JSON.stringify(transcript)}

Synthesize the full performance and generate a comprehensive diagnostic report. Return STRICT JSON matching this exact schema:
{
  "overallScore": 82,
  "technicalRating": 80,
  "communicationRating": 85,
  "summaryFeedback": "Detailed summary of how the candidate performed during the interview.",
  "keyStrengths": ["Strength 1", "Strength 2"],
  "areasForImprovement": ["Weakness 1", "Weakness 2"],
  "roadmapRecommendations": ["Action item 1", "Action item 2"],
  "hiringVerdict": "Strong Hire | Hire | Weak Hire | No Hire"
}`;

    const result = await model.generateContent(systemPrompt);
    const parsedData = JSON.parse(result.response.text());

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate report" },
      { status: 500 }
    );
  }
}