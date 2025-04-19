"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";




export default function SpeechToTextComponent({ onError, mockInterViewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, [error, onError]);

  const handleTranscriptUpdate = (transcript) => {
    setUserAnswer((prevAns) => prevAns + transcript);
  };



  useEffect(()=>{
    if(!isRecording&&userAnswer.length>10){
      UpdateUserAnswerInDb();
    }
    // if (userAnswer?.length < 10) {
    //   setLoading(false)
    //   toast("Error while saving your answer, Please record again");
    //   return;
    // }

  },[userAnswer])

  const UpdateUserAnswerInDb=async()=>{
    setLoading(true);
    const feedbackPromt = `Question: ${mockInterViewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Based on the question and the user's answer, please provide a rating 1 to 10 for the answer and feedback in the form of areas for improvement, if any. The feedback should in JSON format only nothing else field should be rating and feeback only, in just 3 to 5 lines.`;
    const result = await chatSession.sendMessage(feedbackPromt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    const JsonFeedbackResp=JSON.parse(mockJsonResp)
    const resp=await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question:mockInterViewQuestion[activeQuestionIndex]?.question,
      correctAns:mockInterViewQuestion[activeQuestionIndex]?.answer,
      userAns:userAnswer,
      feedback:JsonFeedbackResp?.feedback,
      rating:JsonFeedbackResp?.rating,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-yyyy')


    })
    
    if(resp){

      toast('User Answer recorded successfully!')
      setUserAnswer('')
      setResults([])
    }
    setResults([])
    setLoading(false)
  }

  useEffect(() => {
    if (results?.length > 0) {
      const lastResult = results[results.length - 1];
      if (lastResult?.transcript) {
        handleTranscriptUpdate(lastResult.transcript);
      }
    }
  }, [results]);

  const handleRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      console.log('Recording stopped', isRecording);
    } else {
      await startSpeechToText();
      console.log('Recording started', isRecording);
    }
  };

  return (
    <Button disabled={loading} variant="outline" onClick={handleRecording} className="my-10">
      {isRecording ? (
        <h2 className="flex items-center justify-center text-red-600 gap-2">
          <StopCircle />
          Recording...
        </h2>
      ) : (
        <h2 className="flex items-center justify-center gap-2">
          <Mic />
          Start Recording
        </h2>
      )}
    </Button> 
  );
}
