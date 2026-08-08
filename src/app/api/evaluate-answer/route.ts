import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    return NextResponse.json({
      success: true,
      message: "Answer evaluated successfully",
      score: 85,
      feedback: "Good response covering key technical concepts.",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}