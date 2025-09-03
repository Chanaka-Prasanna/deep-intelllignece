import { NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    // Validate and parse request body safely
    const BodySchema = z.object({
      type: z.string().min(1),
      role: z.string().min(1),
      level: z.string().min(1),
      techstack: z.string().min(1),
      amount: z.union([z.number(), z.string()]),
      userid: z.string().min(1),
    });

    const json = await request.json().catch(() => null);
    if (!json) {
      return NextResponse.json(
        { success: false, error: "Invalid or empty JSON body" },
        { status: 400 }
      );
    }

    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { type, role, level, techstack, amount, userid } = parsed.data;

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    // Robustly parse model output into a string array
    const parseQuestions = (raw: string): string[] => {
      const tryParse = (s: string) => {
        try {
          const v = JSON.parse(s);
          return Array.isArray(v) ? v : null;
        } catch {
          return null;
        }
      };

      // First attempt: direct JSON.parse
      let arr = tryParse(raw);

      // If that fails, try extracting the first JSON array substring
      if (!arr) {
        const start = raw.indexOf("[");
        const end = raw.lastIndexOf("]");
        if (start !== -1 && end !== -1 && end > start) {
          arr = tryParse(raw.slice(start, end + 1));
        }
      }

      if (!arr) return [];

      // Normalize: ensure all items are strings and trim
      return arr
        .map((q: unknown) => (typeof q === "string" ? q.trim() : ""))
        .filter((q: string) => q.length > 0);
    };

    const parsedQuestions = parseQuestions(questions);
    if (!parsedQuestions.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Model did not return a valid questions array",
        },
        { status: 502 }
      );
    }

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error)?.message ?? "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: true, data: "Thank you!" },
    { status: 200 }
  );
}
