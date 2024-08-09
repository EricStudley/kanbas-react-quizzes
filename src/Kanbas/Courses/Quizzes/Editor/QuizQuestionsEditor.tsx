import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as client from "./../client";
import { setQuizzes, updateQuiz } from "../reducer";
import BaseQuestion from "./Question/BaseQuestion";

export default function QuizDetailsEditor({
    quiz,
    addNewQuestion,
    setQuestionTitle,
    setQuestionType,
    setQuestionText,
    setQuestionPoints,
    setMultipleChoiceAnswerCorrect,
    setMultipleChoiceAnswerText,
    addAnotherMultipleChoiceAnswer,
    setQuestionTrueFalseCorrect,
}: {
    quiz: any;
    addNewQuestion: () => void;
    setQuestionTitle: (questionIndex: number, questionTitle: string) => void;
    setQuestionType: (questionIndex: number, questionType: string) => void;
    setQuestionText: (questionIndex: number, questionText: string) => void;
    setQuestionPoints: (questionIndex: number, questionPoints: number) => void;
    setMultipleChoiceAnswerCorrect: (
        questionIndex: number,
        answerIndex: number
    ) => void;
    setMultipleChoiceAnswerText: (
        questionIndex: number,
        answerIndex: number,
        answerText: string
    ) => void;
    addAnotherMultipleChoiceAnswer: (questionIndex: number) => void;
    setQuestionTrueFalseCorrect: (questionIndex: number, correct: boolean) => void;
}) {
    return (
        <div>
            <div className="text-center">
                <button
                    className="btn btn-primary m-4"
                    onClick={addNewQuestion}
                >
                    + New Question
                </button>
            </div>
            {quiz.questions &&
                quiz.questions.map((question: any, index: number) => {
                    return (
                        <BaseQuestion
                            question={question}
                            questionIndex={index}
                            setQuestionTitle={setQuestionTitle}
                            setQuestionType={setQuestionType}
                            setQuestionText={setQuestionText}
                            setQuestionPoints={setQuestionPoints}
                            setMultipleChoiceAnswerCorrect={
                                setMultipleChoiceAnswerCorrect
                            }
                            setMultipleChoiceAnswerText={
                                setMultipleChoiceAnswerText
                            }
                            addAnotherMultipleChoiceAnswer={
                                addAnotherMultipleChoiceAnswer
                            }
                            setQuestionTrueFalseCorrect={
                                setQuestionTrueFalseCorrect
                            }
                        />
                    );
                })}
        </div>
    );
}
