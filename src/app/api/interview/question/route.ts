import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  let activeTopic = "Technical Core";

  try {
    const body = await req.json();
    const role: string = body?.role || "Software Engineer";
    const seniority: string = body?.seniority || "Mid-Level";
    const topic: string = body?.topic || "Technical Core";
    const previousAnswer: string = body?.previousAnswer || "";
    
    // Context Customization Parameters (Optional)
    const jdText: string = body?.jdText || "";
    const resumeText: string = body?.resumeText || "";

    activeTopic = topic;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Round Persona Identification
    const roundLower = topic.toLowerCase();
    const isHR = roundLower.includes("hr") || roundLower.includes("behavioral");
    const isCoding = roundLower.includes("coding") || roundLower.includes("dsa");
    const isSystemDesign = roundLower.includes("system design") || roundLower.includes("architecture");

    let prompt = `You are an interviewer conducting a ${seniority} level interview for the role of ${role}. Focus Round: ${topic}.\n`;

    // Inject Context Customization if provided
    if (jdText.trim()) {
      prompt += `\nTarget Job Description Context: "${jdText.trim().slice(0, 500)}". Ask questions relevant to these skills.`;
    }
    if (resumeText.trim()) {
      prompt += `\nCandidate Resume Context: "${resumeText.trim().slice(0, 500)}". Frame questions around candidate's past work or technologies listed here.`;
    }

    // Round-Specific Prompt Logic
    if (isHR) {
      prompt += `\nRole: HR Manager. Focus on soft skills, teamwork, situational behavior, or career motivations. Do NOT ask technical questions.`;
    } else if (isCoding) {
      prompt += `\nRole: Tech Lead. Focus on data structures, algorithms, time/space complexity ($O(N)$), or edge cases.`;
    } else if (isSystemDesign) {
      prompt += `\nRole: Principal Architect. Focus on scalability, microservices, database design, caching, or API architecture.`;
    } else {
      prompt += `\nRole: Senior Technical Interviewer. Focus on core technical domain knowledge and hands-on concepts.`;
    }

    if (previousAnswer) {
      prompt += `\nThe candidate previously answered: "${previousAnswer}". Ask a sharp, concise follow-up question based directly on their response.`;
    } else {
      prompt += `\nAsk an opening question to start the interview session.`;
    }

    prompt += `\nReturn ONLY the interview question text. Keep it under 25 words. No markdown bullet points or conversational filler.`;

    const result = await model.generateContent(prompt);
    const generatedQuestion = result.response.text().trim();

    return NextResponse.json({ question: generatedQuestion });
  } catch (error) {
    console.error("Gemini Question API Error:", error);

    const hrFallbacks = [
      "Could you introduce yourself and walk me through your professional background?",
      "Tell me about a time you faced a disagreement within a team and how you resolved it.",
    ];
    const techFallbacks = [
      `What are the key performance considerations when scaling ${activeTopic}?`,
      "How do you handle error boundaries and asynchronous state management in production?",
    ];

    const isHR = activeTopic.toLowerCase().includes("hr") || activeTopic.toLowerCase().includes("behavioral");
    const selectedFallbacks = isHR ? hrFallbacks : techFallbacks;
    
    return NextResponse.json({ 
      question: selectedFallbacks[Math.floor(Math.random() * selectedFallbacks.length)] 
    });
  }
}