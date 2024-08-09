import React from "react";

interface TrueFalsePreviewProps {
    question: any;
    questionId: number;
    answer: string;
    setTrueFalseAnswer: (questionId: number, trueFalseAnswer: string) => void;
}

const TrueFalsePreview: React.FC<TrueFalsePreviewProps> = ({
    question,
    questionId,
    answer,
    setTrueFalseAnswer,
}) => {
    return (
        <div>
            <div>
                <input
                    type="radio"
                    checked={answer === "true"}
                    onChange={() => setTrueFalseAnswer(questionId, "true")}
                />
                <label>True</label>
            </div>
            <div>
                <input
                    type="radio"
                    checked={answer === "false"}
                    onChange={() => setTrueFalseAnswer(questionId, "false")}
                />
                <label>False</label>
            </div>
        </div>
    );
};

export default TrueFalsePreview;
