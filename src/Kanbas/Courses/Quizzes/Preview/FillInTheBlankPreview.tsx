import React from 'react';

interface FillInTheBlankPreviewProps {
    question: any;
    questionIndex: number;
    answer: any;
    onAnswerChange: (answer: any) => void;
}

const FillInTheBlankPreview: React.FC<FillInTheBlankPreviewProps> = ({
    question,
    questionIndex,
    answer,
    onAnswerChange,
}) => {
    return (
        <div>
            <input
                type="text"
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
            />
        </div>
    );
};

export default FillInTheBlankPreview;
