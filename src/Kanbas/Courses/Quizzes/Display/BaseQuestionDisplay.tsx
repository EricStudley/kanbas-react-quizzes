import React from "react";
import MultipleChoiceDisplay from "./MultipleChoiceDisplay";
import TrueFalseDisplay from "./TrueFalseDisplay";
import FillInTheBlankDisplay from "./FillInTheBlankDisplay";

interface BaseQuestionDisplayProps {
    question: any;
    questionId: number;
    selectedAnswer: any;
    setMultipleChoiceAnswerIndex: (
        questionId: number,
        multipleChoiceAnswerIndex: number
    ) => void;
    setTrueFalseAnswer: (questionId: number, trueFalseAnswer: string) => void;
    setFillInTheBlankAnswer: (
        questionId: number,
        fillInTheBlankAnswer: string
    ) => void;
}

const BaseQuestionDisplay: React.FC<BaseQuestionDisplayProps> = ({
    question,
    questionId,
    selectedAnswer,
    setMultipleChoiceAnswerIndex,
    setTrueFalseAnswer,
    setFillInTheBlankAnswer,
}) => {
    const isMultipleChoice = question.type === "Multiple Choice";
    const isTrueFalse = question.type === "True/False";
    const isFillInTheBlank = question.type === "Fill in the Blank";
    return (
        <div className="question-container mb-5 p-3 border rounded">
            <div
                className="question-text"
                dangerouslySetInnerHTML={{ __html: question.question }}
            />
            {isMultipleChoice && (
                <MultipleChoiceDisplay
                    question={question}
                    questionId={questionId}
                    selectedAnswer={selectedAnswer?.multipleChoiceAnswerIndex}
                    setMultipleChoiceAnswerIndex={setMultipleChoiceAnswerIndex}
                />
            )}
            {isTrueFalse && (
                <TrueFalseDisplay
                    question={question}
                    questionId={questionId}
                    selectedAnswer={selectedAnswer?.trueFalseAnswer}
                    setTrueFalseAnswer={setTrueFalseAnswer}
                />
            )}
            {isFillInTheBlank && (
                <FillInTheBlankDisplay
                    question={question}
                    questionId={questionId}
                    selectedAnswer={selectedAnswer?.fillInTheBlankAnswer}
                    setFillInTheBlankAnswer={setFillInTheBlankAnswer}
                />
            )}
        </div>
    );
};

export default BaseQuestionDisplay;
