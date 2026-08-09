import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer } = body;

    // 1. STRICT VALIDATION: Khali ya bohot chote answers par ZERO marks return karein
    const trimmedAnswer = answer ? answer.trim() : "";

    if (!trimmedAnswer || trimmedAnswer.length < 5) {
      return NextResponse.json({
        technicalScore: 0,
        communicationScore: 0,
        confidenceScore: 0,
        overallScore: 0,
        synergyPoints: 0,
        feedback: "No meaningful answer provided. Please attempt to answer the question verbally or in writing to receive scores.",
        strengths: [],
        improvements: ["Provide a complete technical explanation next time"],
        modelAnswer: "A complete answer should address key concepts and practical implementation details relevant to the question."
      });
    }

    // 2. Gemini API Key Verification
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // 3. Strict Prompt Construction
    const prompt = `
You are an expert technical interviewer evaluating a candidate's answer strictly based on merit and correctness.

Question Asked: "${question}"
Candidate Answer: "${trimmedAnswer}"

CRITICAL INSTRUCTIONS:
1. Evaluate the answer objectively based on technical accuracy, clarity, and relevance.
2. If the candidate answer is incorrect, nonsensical, or off-topic, assign scores near 0-30 accordingly.
3. Return ONLY valid JSON in the exact structure below:

{
  "technicalScore": <0-100 number>,
  "communicationScore": <0-100 number>,
  "confidenceScore": <0-100 number>,
  "overallScore": <0-100 number>,
  "feedback": "<2-sentence constructive feedback>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"],
  "modelAnswer": "<An ideal response to this question>"
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
            temperature: 0.2 // Lower temperature for consistent, strict scoring
          },
        }),
      }
    );

    const data = await response.json();
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (textResponse) {
      const parsedData = JSON.parse(textResponse);
      return NextResponse.json(parsedData);
    }

    // Safe fallback if response parsing fails (without giving free high scores)
    return NextResponse.json({
      technicalScore: 0,
      communicationScore: 0,
      confidenceScore: 0,
      overallScore: 0,
      feedback: "Answer evaluation failed due to a parsing issue. Please try resubmitting.",
      strengths: [],
      improvements: ["Try answering clearly again"],
      modelAnswer: "An ideal response addresses key technical concepts directly."
    });

  } catch (error) {
    console.error("Evaluation API Error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}