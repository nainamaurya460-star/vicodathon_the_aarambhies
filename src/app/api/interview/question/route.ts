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

    activeTopic = topic;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Identify Selected Interview Round
    const roundLower = topic.toLowerCase();
    const isHR = roundLower.includes("hr") || roundLower.includes("behavioral");
    const isCoding = roundLower.includes("coding") || roundLower.includes("dsa");
    const isSystemDesign = roundLower.includes("system design") || roundLower.includes("architecture");

    let prompt = "";

    // 1. General HR & Behavioral Round
    if (isHR) {
      prompt = `You are an HR Manager conducting an HR interview for a ${seniority} ${role}.`;
      if (previousAnswer) {
        prompt += `\nThe candidate previously answered: "${previousAnswer}".
Ask a concise follow-up behavioral or situational question based on their response. Do NOT ask technical coding or architecture questions. Focus on team collaboration, conflict resolution, work ethic, or career goals.`;
      } else {
        prompt += `\nAsk a warm, opening HR question like self-introduction, career motivation, or handling workplace challenges. Do NOT ask technical questions.`;
      }
    } 
    // 2. Coding & DSA Round
    else if (isCoding) {
      prompt = `You are a Technical Lead conducting a Coding and Data Structures/Algorithms (DSA) round for a ${seniority} ${role}.`;
      if (previousAnswer) {
        prompt += `\nThe candidate previously answered: "${previousAnswer}".
Ask a concise follow-up question regarding algorithmic time/space complexity ($O(N)$), edge cases, data structure choices, or code optimization based on their answer.`;
      } else {
        prompt += `\nAsk a practical coding or DSA problem-solving question (e.g. arrays, strings, trees, or dynamic programming logic) suited for a ${seniority} level.`;
      }
    } 
    // 3. System Design Round
    else if (isSystemDesign) {
      prompt = `You are a Principal Systems Architect conducting a System Design interview for a ${seniority} ${role}.`;
      if (previousAnswer) {
        prompt += `\nThe candidate previously answered: "${previousAnswer}".
Ask a concise follow-up question on scalability, API design, database partitioning, caching, or handling bottlenecks based on their answer.`;
      } else {
        prompt += `\nAsk a real-world system design question (e.g. designing a URL shortener, rate limiter, or chat service notification engine).`;
      }
    } 
    // 4. Default Technical Core Round
    else {
      prompt = `You are a Senior Technical Interviewer conducting a technical core round for a ${seniority} ${role}. Focus Domain: ${topic}.`;
      if (previousAnswer) {
        prompt += `\nThe candidate previously answered: "${previousAnswer}".
Ask a concise follow-up technical question based directly on their answer to evaluate deeper domain expertise.`;
      } else {
        prompt += `\nAsk a sharp, practical opening technical question related to ${topic}.`;
      }
    }

    prompt += `\nReturn ONLY the interview question text. Keep it under 25 words. No markdown formatting, bullet points, or extra dialogue.`;

    const result = await model.generateContent(prompt);
    const generatedQuestion = result.response.text().trim();

    return NextResponse.json({ question: generatedQuestion });
  } catch (error) {
    console.error("Gemini Question API Error:", error);

    // Fallback Questions Categorized by Selected Round
    const roundLower = activeTopic.toLowerCase();
    
    if (roundLower.includes("hr") || roundLower.includes("behavioral")) {
      const hrFallbacks = [
        "Could you introduce yourself and walk me through your professional background?",
        "Tell me about a time you faced a disagreement within a team and how you resolved it.",
        "Why are you interested in this role and what drives your career choices?",
        "How do you handle tight project deadlines and prioritize stressful workloads?"
      ];
      return NextResponse.json({ question: hrFallbacks[Math.floor(Math.random() * hrFallbacks.length)] });
    }

    if (roundLower.includes("coding") || roundLower.includes("dsa")) {
      const codingFallbacks = [
        "How would you optimize a two-pointer approach vs hash map for finding duplicate elements?",
        "What is the time and space complexity of sorting algorithms like QuickSort vs MergeSort?",
        "How do you handle edge cases like null pointers and stack overflows in recursive functions?",
        "Describe how you would implement a LRU cache using basic data structures."
      ];
      return NextResponse.json({ question: codingFallbacks[Math.floor(Math.random() * codingFallbacks.length)] });
    }

    if (roundLower.includes("system design") || roundLower.includes("architecture")) {
      const designFallbacks = [
        "How would you design a rate limiter to prevent API abuse in microservices?",
        "What strategies do you use for database sharding and read-replica sync?",
        "How do you handle state management and caching across distributed servers?",
        "How would you design a real-time notification engine using WebSockets and message queues?"
      ];
      return NextResponse.json({ question: designFallbacks[Math.floor(Math.random() * designFallbacks.length)] });
    }

    // Default Technical Fallbacks
    const techFallbacks = [
      `What are the key performance considerations when scaling ${activeTopic}?`,
      "How do you handle error boundaries and asynchronous state management in production?",
      "Describe your approach to API caching and data fetching optimizations.",
      "How do you ensure test coverage and maintainability across a large codebase?"
    ];

    return NextResponse.json({ question: techFallbacks[Math.floor(Math.random() * techFallbacks.length)] });
  }
}