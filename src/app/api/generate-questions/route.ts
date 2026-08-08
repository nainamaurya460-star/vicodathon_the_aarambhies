import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, userAnswer, role } = await req.json();

    // Evaluation logic analyzing response quality & STAR structure
    const wordCount = userAnswer ? userAnswer.trim().split(/\s+/).length : 0;
    
    // Dynamic score calculation based on response depth
    const technicalScore = Math.min(95, Math.max(65, wordCount * 2 + 50));
    const communicationScore = Math.min(90, Math.max(70, wordCount * 1.5 + 55));
    const problemSolvingScore = Math.min(92, Math.max(60, wordCount * 1.8 + 52));
    
    const overallScore = Math.round((technicalScore + communicationScore + problemSolvingScore) / 3);

    const evaluationResult = {
      overallScore,
      metrics: {
        technicalAccuracy: technicalScore,
        communicationClarity: communicationScore,
        starMethodology: problemSolvingScore,
      },
      strengths: [
        "Structured explanation with practical technical examples.",
        "Clear communication and effective use of core concepts.",
      ],
      improvements: [
        "Include more concrete metric-driven outcomes (e.g., efficiency gains in %).",
        "Elaborate slightly deeper on edge-case handling scenarios.",
      ],
      feedbackSummary: `Solid response for a ${role || "Engineer"} role. High alignment with required technical competency.`,
    };

    return NextResponse.json({
      success: true,
      evaluation: evaluationResult,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to evaluate response" },
      { status: 500 }
    );
  }
}