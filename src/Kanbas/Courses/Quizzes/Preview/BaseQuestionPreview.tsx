import React from "react";
import MultipleChoicePreview from "./MultipleChoicePreview";
import TrueFalsePreview from "./TrueFalsePreview";
import FillInTheBlankPreview from "./FillInTheBlankPreview";

interface BaseQuestionPreviewProps {
    question: any;
    questionId: number;
    answer: any;
    setMultipleChoiceAnswerIndex: (questionId: number, multipleChoiceAnswerIndex: number) => void;
    setTrueFalseAnswer: (questionId: number, trueFalseAnswer: string) => void;
    setFillInTheBlankAnswer: (questionId: number, fillInTheBlankAnswer: string) => void;
}

const BaseQuestionPreview: React.FC<BaseQuestionPreviewProps> = ({
    question,
    questionId,
    answer,
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
                <MultipleChoicePreview
                    question={question}
                    questionId={questionId}
                    answer={answer?.multipleChoiceAnswerIndex}
                    setMultipleChoiceAnswerIndex={setMultipleChoiceAnswerIndex}
                />
            )}
            {isTrueFalse && (
                <TrueFalsePreview
                    question={question}
                    questionId={questionId}
                    answer={answer?.trueFalseAnswer}
                    setTrueFalseAnswer={setTrueFalseAnswer}
                />
            )}
            {isFillInTheBlank && (
                <FillInTheBlankPreview
                    question={question}
                    questionId={questionId}
                    answer={answer?.fillInTheBlankAnswer}
                    setFillInTheBlankAnswer={setFillInTheBlankAnswer}
                />
            )}
        </div>
    );
};

export default BaseQuestionPreview;
