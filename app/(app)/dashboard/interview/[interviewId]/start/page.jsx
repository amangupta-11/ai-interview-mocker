"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSections from "./_components/QuestionsSections";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const GetInterviewDetail = async () => {
      try {
        if (!params?.interviewId) return;

        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (!result.length) {
          setErrorMsg("Interview not found");
          setLoading(false);
          return;
        }

        const row = result[0];

        console.log("RAW jsonMockResp FROM DB:", row.jsonMockResp);

        let parsed;
        try {
          parsed = JSON.parse(row.jsonMockResp);
        } catch (err) {
          console.error("JSON parse error:", err);
          setErrorMsg("Invalid questions format. Please regenerate interview.");
          setLoading(false);
          return;
        }

        // Handle 2 possible formats:
        // 1) [ { ... }, { ... } ]
        // 2) { questions: [ { ... }, ... ] }
        const questions = Array.isArray(parsed)
          ? parsed
          : parsed.questions || [];

        if (!Array.isArray(questions) || questions.length === 0) {
          setErrorMsg("No questions generated. Please create a new interview.");
          setLoading(false);
          return;
        }

        setMockInterviewQuestion(questions);
        setInterviewData(row);
        setActiveQuestionIndex(0);
      } catch (err) {
        console.error("Error fetching interview:", err);
        setErrorMsg("Something went wrong while loading the interview.");
      } finally {
        setLoading(false);
      }
    };

    GetInterviewDetail();
  }, [params?.interviewId]);

  const handlePrev = () => {
    setActiveQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveQuestionIndex((prev) =>
      Math.min(prev + 1, mockInterviewQuestion.length - 1)
    );
  };

  // -------- RENDER ----------

  if (loading) {
    return <div className="p-10">Loading interview...</div>;
  }

  if (errorMsg) {
    return <div className="p-10 text-red-500">{errorMsg}</div>;
  }

  if (!mockInterviewQuestion.length || !interviewData) {
    return <div className="p-10">No questions to display.</div>;
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Main grid: Questions + Recording */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions section */}
        <QuestionsSections
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={mockInterviewQuestion}
        />

        {/* Video / Audio Recording section */}
        <RecordAnswerSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            type="button"
            onClick={handlePrev}
          >
            Previous Question
          </Button>
        )}

        {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
          <Button
            type="button"
            onClick={handleNext}
          >
            Next Question
          </Button>
        )}

        {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
          <Link
            href={`/dashboard/interview/${interviewData.mockId}/feedback`}
          >
            <Button type="button">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
