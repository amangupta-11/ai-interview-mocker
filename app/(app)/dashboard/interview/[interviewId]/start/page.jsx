import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import StartInterviewClient from "./StartInterviewClient";

export default async function StartInterviewPage({ params }) {
  // Next.js 15 me params Promise ho sakta hai, isliye await safe hai
  const { interviewId } = await params;

  if (!interviewId) {
    return <div className="p-10">Invalid interview id.</div>;
  }

  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, interviewId));

  if (!result.length) {
    return <div className="p-10 text-red-500">Interview not found.</div>;
  }

  const row = result[0];

  let parsed;
  try {
    parsed = JSON.parse(row.jsonMockResp);
  } catch (err) {
    console.error("JSON parse error:", err);
    return (
      <div className="p-10 text-red-500">
        Invalid questions format. Please regenerate the interview.
      </div>
    );
  }

  // 1) [ {...}, {...} ]
  // 2) { questions: [ {...}, ... ] }
  const questions = Array.isArray(parsed)
    ? parsed
    : parsed.questions || [];

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="p-10 text-red-500">
        No questions generated. Please create a new interview.
      </div>
    );
  }

  return (
    <StartInterviewClient
      interviewData={row}
      questions={questions}
    />
  );
}
