"use client";

import React, { useState } from "react";
import QuestionsSections from "./_components/QuestionsSections";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StartInterviewClient({ interviewData, questions }) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const handlePrev = () => {
    setActiveQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveQuestionIndex((prev) =>
      Math.min(prev + 1, questions.length - 1)
    );
  };

  if (!questions.length || !interviewData) {
    return <div className="p-10">No questions to display.</div>;
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Main grid: Questions + Recording */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions section */}
        <QuestionsSections
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={questions}
        />

        {/* Video / Audio Recording section */}
        <RecordAnswerSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={questions}
          interviewData={interviewData}
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button type="button" onClick={handlePrev}>
            Previous Question
          </Button>
        )}

        {activeQuestionIndex < questions.length - 1 && (
          <Button type="button" onClick={handleNext}>
            Next Question
          </Button>
        )}

        {activeQuestionIndex === questions.length - 1 && (
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
