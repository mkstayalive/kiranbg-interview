import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // In mock mode, branching is handled client-side.
  // This endpoint would call the LLM to regenerate downstream events for a modified branch.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({
    success: true,
    message: "Branch created (mock mode — branching is handled client-side)",
  });
}
