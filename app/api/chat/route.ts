import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Limit for incoming messages
const MAX_MESSAGE_COUNT = 20;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages provided" },
        { status: 400 }
      );
    }

    // Prevent empty message content
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (!message.content || message.content.trim().length === 0) {
        return NextResponse.json(
          { error: "Message content cannot be empty" },
          { status: 400 }
        );
      }
    }

    // Check message count
    if (messages.length > MAX_MESSAGE_COUNT) {
      return NextResponse.json(
        {
          error: `Message count exceeds the maximum limit of ${MAX_MESSAGE_COUNT}`,
        },
        { status: 400 }
      );
    }

    // Use Vercel AI SDK to stream the response
    const result = await streamText({
      model: openai("gpt-3.5-turbo"), // You can switch to gpt-4 or another model
      messages,
    });

    return result.toDataStreamResponse(); // Stream the result to the frontend
  } catch (error: unknown) {
    console.error("Error in API handler:", error);

    // Handle errors properly
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}
