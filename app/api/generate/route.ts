import { NextResponse } from "next/server";
import { Leap } from "@leap-ai/sdk";

export async function GET(request: Request) {
  return new Response("Hello from server!!!");
}

export async function POST(request: Request) {
  const res = await request.json();
  const prompt = res.prompt;

  const apiKey = process.env.LEAP_API_KEY as string;

  if (!prompt || prompt.length === 0) {
    return NextResponse.json(
      { error: "Invalid request. Check key and prompt." },
      { status: 400 }
    );
  }

  // List of pre-trained models: https://docs.tryleap.ai/reference/pre-trained-models
  const MODEL_ID = "1e7737d7-545e-469f-857f-e4b46eaa151d"; // Model: OpenJourney v4
  const IMAGE_WIDTH = 512;
  const IMAGE_HEIGHT = 512;
  const NUMBER_OF_IMAGES = 1;

  const leap = new Leap(apiKey);
  const { data, error } = await leap.generate.generateImage({
    modelId: MODEL_ID,
    prompt: prompt,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    numberOfImages: NUMBER_OF_IMAGES,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // console.log("YOUR PROMPT: ", prompt);

  return NextResponse.json({ data }, { status: 200 });
}
