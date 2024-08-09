import { useEffect } from "react";
import MultipleChoicePreview from "./MultipleChoicePreview";
import TrueFalsePreview from "./TrueFalsePreview";
import FillInTheBlankPreview from "./FillInTheBlankPreview";

export default function BaseQuestioPreview({
    question,
    questionIndex,
}: {
    question: any;
    questionIndex: number;
}) {
    const isMultipleChoice = question.type === "Multiple Choice";
    const isTrueFalse = question.type === "True/False";
    const isFillInTheBlank = question.type === "Fill in the Blank";
    return (
        <div className="container mb-5 border">
            <div className="d-flex align-items-center mt-3">
                <h4 className="me-2">Question {questionIndex + 1}</h4>
            </div>
            <hr />
            {isMultipleChoice && (
                <MultipleChoicePreview
                    question={question}
                    questionIndex={questionIndex}
                />
            )}
            {isTrueFalse && (
                <TrueFalsePreview
                    question={question}
                    questionIndex={questionIndex}
                />
            )}
            {isFillInTheBlank && (
                <FillInTheBlankPreview
                    question={question}
                    questionIndex={questionIndex}
                />
            )}
            <br />
            <br />
        </div>
    );
}
