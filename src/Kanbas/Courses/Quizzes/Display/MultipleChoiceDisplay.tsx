import React from "react";

interface MultipleChoiceDisplayProps {
    question: any;
    questionId: number;
    answer: any;
    setMultipleChoiceAnswerIndex: (
        questionId: number,
        multipleChoiceAnswerIndex: number
    ) => void;
}

const MultipleChoiceDisplay: React.FC<MultipleChoiceDisplayProps> = ({
    question,
    questionId,
    answer,
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
                            checked={answer === index}
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
