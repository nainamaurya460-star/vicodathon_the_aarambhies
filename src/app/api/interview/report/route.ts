import { NextResponse } from "next/server";

// Force Next.js to bypass caching and render fresh report every time
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { qaHistory, config } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // 1. Guard Clause: If history is empty, return zero scores
    if (!qaHistory || !Array.isArray(qaHistory) || qaHistory.length === 0) {
      return NextResponse.json({
        overallScore: 0,
        technicalScore: 0,
        communicationScore: 0,
        confidenceScore: 0,
        readinessBadge: "0% Need Practice",
        summary: "No interview questions were completed in this session.",
        skillGaps: ["Did not attempt questions"],
        strengths: []
      });
    }

    // 2. Build Strict Evaluation Prompt with Candidate's Real QA Data
    const prompt = `
You are a Lead Hiring Manager evaluating a candidate's complete interview performance.

Candidate Role: ${config?.role || "Software Engineer"} (${config?.seniority || "Mid-Level"})
Interview Question-Answer History:
${JSON.stringify(qaHistory, null, 2)}

CRITICAL EVALUATION INSTRUCTIONS:
1. Calculate realistic percentage scores strictly based on the candidate's actual provided answers in the history above.
2. If answers are missing, blank, or extremely weak, assign low/zero scores accordingly.
3. Return ONLY valid JSON in the exact structure below:

{
  "overallScore": <0-100 number>,
  "technicalScore": <0-100 number>,
  "communicationScore": <0-100 number>,
  "confidenceScore": <0-100 number>,
  "readinessBadge": "<e.g., '88% Job Ready' or 'Needs Improvement'>",
  "summary": "<2-sentence comprehensive executive summary of performance>",
  "skillGaps": ["<specific gap 1>", "<specific gap 2>"],
  "strengths": ["<key strength 1>", "<key strength 2>"]
}
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { 
            responseMimeType: "application/json",
            temperature: 0.2 // Strict and deterministic evaluation
          },
        }),
      }
    );

    const data = await response.json();
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (textResponse) {
      const parsedReport = JSON.parse(textResponse);
      return NextResponse.json(parsedReport);
    }

    return NextResponse.json(
      { error: "Failed to parse final scorecard report" },
      { status: 500 }
    );

  } catch (error) {
    console.error("Report Generation API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during report generation" },
      { status: 500 }
    );
  }
}