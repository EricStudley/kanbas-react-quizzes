import React from 'react';

interface MultipleChoicePreviewProps {
    question: any;
    questionIndex: number;
    answer: any;
    onAnswerChange: (answer: any) => void;
}

const MultipleChoicePreview: React.FC<MultipleChoicePreviewProps> = ({
    question,
    questionIndex,
    answer,
    onAnswerChange,
}) => {
    return (
        <div>
            {question.multipleChoices.map((choice: any, index: number) => (
                <div key={index}>
                    <input
                        type="radio"
                        checked={answer === choice.text}
                        onChange={() => onAnswerChange(choice.text)}
                    />
                    <label>{choice.text}</label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoicePreview;
