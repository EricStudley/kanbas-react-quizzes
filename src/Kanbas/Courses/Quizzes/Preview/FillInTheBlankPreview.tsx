import React from "react";

interface FillInTheBlankPreviewProps {
    question: any;
    questionId: number;
    answer: string;
    setFillInTheBlankAnswer: (questionId: number, fillInTheBlankAnswer: string) => void;
}

const FillInTheBlankPreview: React.FC<FillInTheBlankPreviewProps> = ({
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

export default FillInTheBlankPreview;
