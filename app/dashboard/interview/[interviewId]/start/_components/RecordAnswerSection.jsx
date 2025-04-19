"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import dynamic from 'next/dynamic';
import { toast } from "sonner";


// Create a client-side only component for speech-to-text
const SpeechToTextComponent = dynamic(
  () => import('./SpeechToTextComponent'),
  { ssr: false }
);

function RecordAnswerSection({ activeQuestionIndex, mockInterViewQuestion, interviewData }) {
  const handleError = (error) => {
    toast(error);
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          alt="Webcam icon"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: "50vh",
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <SpeechToTextComponent
        onError={handleError}
        mockInterViewQuestion={mockInterViewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData = {interviewData}
      />
    </div>
  );
}

export default RecordAnswerSection;