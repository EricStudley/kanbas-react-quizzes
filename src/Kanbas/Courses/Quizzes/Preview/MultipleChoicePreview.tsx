import React from "react";

interface MultipleChoicePreviewProps {
    question: any;
    questionId: number;
    answer: any;
    setMultipleChoiceAnswerIndex: (questionId: number, multipleChoiceAnswerIndex: number) => void;
}

const MultipleChoicePreview: React.FC<MultipleChoicePreviewProps> = ({
    question,
    questionId,
    answer,
    setMultipleChoiceAnswerIndex,
}) => {
    return (
        <div>
            {question.multipleChoices?.map((multipleChoice: any, index: number) => (
                <div key={index}>
                    <input
                        type="radio"
                        checked={answer === index}
                        onChange={() => setMultipleChoiceAnswerIndex(questionId, index)}
                    />
                    <label>{multipleChoice.text}</label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoicePreview;
