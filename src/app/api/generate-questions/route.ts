import { NextResponse } from "next/server";

// Prevent Vercel/Next.js from caching dynamic interview questions
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, seniority, topic, previousAnswer } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Dynamic timestamp seed to break deterministic AI response caching
    const timestampSeed = Date.now();

    const prompt = `
You are an expert technical interviewer conducting a live interactive session.

Candidate Details:
- Role: ${role || "Software Engineer"}
- Seniority Level: ${seniority || "Mid-Level"}
- Round / Topic: ${topic || "Technical Core"}
- Previous Response: "${previousAnswer || "None (First Question of the Session)"}"
- Session Seed: ${timestampSeed}

INSTRUCTION:
1. Generate ONE concise, clear, and challenging technical interview question tailored to this role and topic.
2. If a previous answer is provided, probe deeper into their explanation or pivot logically to a relevant follow-up topic.
3. NEVER repeat generic questions.
4. Return ONLY valid JSON with no markdown formatting around it:

{
  "question": "<Your dynamic question text here?>"
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
            temperature: 0.8 // High randomness to ensure distinct questions
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

    // Dynamic Fallback in case API parsing encounters an issue
    return NextResponse.json({
      question: `Could you explain the key performance trade-offs you consider when architecting solutions for ${topic || "Technical Core"}?`
    });

  } catch (error) {
    console.error("Question Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate dynamic question" },
      { status: 500 }
    );
  }
}