import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function MultipleChoiceEditor({
    question,
    questionIndex,
    multipleChoices,
    setQuestionText,
    setMultipleChoiceAnswerCorrect,
    setMultipleChoiceAnswerText,
    addAnotherMultipleChoiceAnswer,
}: {
    question: any;
    questionIndex: number;
    multipleChoices: any;
    setQuestionText: (questionIndex: number, questionText: string) => void;
    setMultipleChoiceAnswerCorrect: (
        questionIndex: number,
        answerIndex: number
    ) => void;
    setMultipleChoiceAnswerText: (
        questionIndex: number,
        answerIndex: number,
        answerText: string
    ) => void
    addAnotherMultipleChoiceAnswer: (questionIndex: number) => void;
}) {
    return (
        <div>
            Enter your question and multiple answers, then select the one
            correct answer.
            <h4>Question:</h4>
            <ReactQuill
                className="border-0 mt-2"
                value={question.question}
                onChange={(value) => setQuestionText(questionIndex, value)}
            />
            <h4>Answers:</h4>
            {multipleChoices.map((multipleChoice: any, index: number) => {
                return (
                    <div
                        key={multipleChoice._id}
                        className="d-flex align-items-center"
                    >
                        <input
                            type="radio"
                            className="me-2"
                            checked={multipleChoice.correct}
                            value={multipleChoice.text}
                            onChange={(e) =>
                                setMultipleChoiceAnswerCorrect(
                                    questionIndex,
                                    index
                                )
                            }
                        />
                        <input
                            type="text"
                            className="form-control"
                            value={multipleChoice.text}
                            onChange={(e) =>
                                setMultipleChoiceAnswerText(
                                    questionIndex,
                                    index,
                                    e.target.value
                                )
                            }
                        />
                    </div>
                );
            })}
            <button
                className="btn btn-primary mt-2"
                onClick={() => addAnotherMultipleChoiceAnswer(questionIndex)}
            >
                + Add Another Answer
            </button>
        </div>
    );
}
