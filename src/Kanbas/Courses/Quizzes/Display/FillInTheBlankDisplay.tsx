import React from "react";

interface FillInTheBlankDisplayProps {
    question: any;
    questionId: number;
    answer: string;
    setFillInTheBlankAnswer: (questionId: number, fillInTheBlankAnswer: string) => void;
}

const FillInTheBlankDisplay: React.FC<FillInTheBlankDisplayProps> = ({
    question,
    questionId,
    answer,
    setFillInTheBlankAnswer,
}) => {
    return (
        <div>
            <input
                type="text"
                value={answer}
                onChange={(e) => setFillInTheBlankAnswer(questionId, e.target.value)}
            />
        </div>
    );
};

export default FillInTheBlankDisplay;
