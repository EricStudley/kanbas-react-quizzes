import React from "react";

interface FillInTheBlankDisplayProps {
    question: any;
    questionId: number;
    selectedAnswer: string;
    setFillInTheBlankAnswer: (
        questionId: number,
        fillInTheBlankAnswer: string
    ) => void;
}

const FillInTheBlankDisplay: React.FC<FillInTheBlankDisplayProps> = ({
    question,
    questionId,
    selectedAnswer,
    setFillInTheBlankAnswer,
}) => {
    return (
        <div>
            <input
                type="text"
                value={selectedAnswer}
                onChange={(e) =>
                    setFillInTheBlankAnswer(questionId, e.target.value)
                }
            />
        </div>
    );
};

export default FillInTheBlankDisplay;
