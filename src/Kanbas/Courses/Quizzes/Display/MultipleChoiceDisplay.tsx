import React from "react";

interface MultipleChoiceDisplayProps {
    question: any;
    questionId: number;
    selectedAnswer: any;
    setMultipleChoiceAnswerIndex: (
        questionId: number,
        multipleChoiceAnswerIndex: number
    ) => void;
}

const MultipleChoiceDisplay: React.FC<MultipleChoiceDisplayProps> = ({
    question,
    questionId,
    selectedAnswer,
    setMultipleChoiceAnswerIndex,
}) => {
    return (
        <div>
            <hr />
            {question.multipleChoices?.map(
                (multipleChoice: any, index: number) => (
                    <div key={index}>
                        <input
                            type="radio"
                            checked={selectedAnswer === index}
                            onChange={() =>
                                setMultipleChoiceAnswerIndex(questionId, index)
                            }
                        />{" "}
                        <label>{multipleChoice.text}</label>
                        <hr />
                    </div>
                )
            )}
        </div>
    );
};

export default MultipleChoiceDisplay;
