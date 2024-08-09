import { useEffect } from "react";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";

export default function BaseQuestion({
    question,
    questionIndex,
    setQuestionTitle,
    setQuestionType,
    setQuestionText,
    setQuestionPoints,
    setMultipleChoiceAnswerCorrect,
    setMultipleChoiceAnswerText,
    addAnotherMultipleChoiceAnswer,
    setQuestionTrueFalseCorrect,
}: {
    question: any;
    questionIndex: number;
    setQuestionTitle: (questionIndex: number, questionTitle: any) => void;
    setQuestionType: (questionIndex: number, questionType: any) => void;
    setQuestionText: (questionIndex: number, questionText: string) => void;
    setQuestionPoints: (questionIndex: number, questionPoints: number) => void;
    setMultipleChoiceAnswerCorrect: (
        questionIndex: number,
        answerIndex: number
    ) => void;
    setMultipleChoiceAnswerText: (
        questionIndex: number,
        answerIndex: number,
        answerText: string
    ) => void;
    addAnotherMultipleChoiceAnswer: (questionIndex: number) => void;
    setQuestionTrueFalseCorrect: (questionIndex: number, correct: boolean) => void;
}) {
    const isMultipleChoice = question.type === "Multiple Choice";
    const isTrueFalse = question.type === "True/False";
    const isFillInTheBlank = question.type === "Fill in the Blank";
    return (
        <div className="container mb-5 border">
            <div className="d-flex align-items-center mt-3">
                <input
                    name="title"
                    type="text"
                    value={question.title}
                    className="form-control me-2"
                    style={{ maxWidth: "240px" }}
                    onChange={(e) =>
                        setQuestionTitle(questionIndex, e.target.value)
                    }
                />
                <select
                    name="questionType"
                    className="form-control"
                    style={{ maxWidth: "380px" }}
                    value={question.type}
                    onChange={(e) =>
                        setQuestionType(questionIndex, e.target.value)
                    }
                >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Fill in the Blank">Fill in the Blank</option>
                </select>
                <div className="d-flex align-items-center">
                    <span className="me-2 fw-bold">pts:</span>
                    <input
                        type="number"
                        className="form-control"
                        style={{ maxWidth: "60px" }}
                        value={question.points}
                        onChange={(e) =>
                            setQuestionPoints(
                                questionIndex,
                                parseInt(e.target.value, 10)
                            )
                        }
                    />
                </div>
            </div>
            <hr />
            {isMultipleChoice && (
                <MultipleChoiceEditor
                    question={question}
                    questionIndex={questionIndex}
                    multipleChoices={question.multipleChoices}
                    setMultipleChoiceAnswerCorrect={
                        setMultipleChoiceAnswerCorrect
                    }
                    setMultipleChoiceAnswerText={setMultipleChoiceAnswerText}
                    setQuestionText={setQuestionText}
                    addAnotherMultipleChoiceAnswer={
                        addAnotherMultipleChoiceAnswer
                    }
                />
            )}
            {isTrueFalse && (
                <TrueFalseEditor
                    question={question}
                    questionIndex={questionIndex}
                    setQuestionText={setQuestionText}
                    setQuestionTrueFalseCorrect={setQuestionTrueFalseCorrect}
                />
            )}
            {isFillInTheBlank && (
                <FillInTheBlankEditor
                    question={question}
                    questionIndex={questionIndex}
                    setQuestionText={setQuestionText}
                />
            )}
            <hr />
        </div>
    );
}
