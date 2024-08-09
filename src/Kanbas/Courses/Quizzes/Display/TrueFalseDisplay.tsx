import React from "react";

interface TrueFalseDisplayProps {
    question: any;
    questionId: number;
    selectedAnswer: string;
    setTrueFalseAnswer: (questionId: number, trueFalseAnswer: string) => void;
}

const TrueFalseDisplay: React.FC<TrueFalseDisplayProps> = ({
    question,
    questionId,
    selectedAnswer,
    setTrueFalseAnswer,
}) => {
    return (
        <div>
            <hr />
            <div>
                <input
                    type="radio"
                    checked={selectedAnswer === "true"}
                    onChange={() => setTrueFalseAnswer(questionId, "true")}
                />{" "}
                <label>True</label>
            </div>
            <hr />
            <div>
                <input
                    type="radio"
                    checked={selectedAnswer === "false"}
                    onChange={() => setTrueFalseAnswer(questionId, "false")}
                />{" "}
                <label>False</label>
            </div>
        </div>
    );
};

export default TrueFalseDisplay;
