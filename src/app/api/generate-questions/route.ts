import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { role, experience, difficulty } = await req.json();

    // Mock response structure for Gemini AI dynamic question generation
    const generatedQuestions = [
      {
        id: 1,
        question: `As a ${role} (${experience} level), how do you handle state management and performance optimization in complex applications?`,
        category: "Technical",
      },
      {
        id: 2,
        question: `Describe a challenging bug you encountered in a ${difficulty} difficulty project and how you resolved it using debugging tools.`,
        category: "Problem Solving",
      },
      {
        id: 3,
        question: "Explain how you structure your code to ensure readability, scalability, and maintainability across a team.",
        category: "Best Practices",
      },
    ];

    return NextResponse.json({
      success: true,
      questions: generatedQuestions,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}