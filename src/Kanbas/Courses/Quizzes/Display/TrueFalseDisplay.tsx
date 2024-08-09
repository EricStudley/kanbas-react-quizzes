import React from "react";

interface TrueFalseDisplayProps {
    question: any;
    questionId: number;
    answer: string;
    setTrueFalseAnswer: (questionId: number, trueFalseAnswer: string) => void;
}

const TrueFalseDisplay: React.FC<TrueFalseDisplayProps> = ({
    question,
    questionId,
    answer,
    setTrueFalseAnswer,
}) => {
    return (
        <div>
            <hr />
            <div>
                <input
                    type="radio"
                    checked={answer === "true"}
                    onChange={() => setTrueFalseAnswer(questionId, "true")}
                />{" "}
                <label>True</label>
            </div>
            <hr />
            <div>
                <input
                    type="radio"
                    checked={answer === "false"}
                    onChange={() => setTrueFalseAnswer(questionId, "false")}
                />{" "}
                <label>False</label>
            </div>
        </div>
    );
};

export default TrueFalseDisplay;
