import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function FillInTheBlankEditor({
    question,
    questionIndex,
    setQuestionText,
}: {
    question: any;
    questionIndex: number;
    setQuestionText: (questionIndex: number, questionText: string) => void;
}) {
    return (
        <div>
            Enter your question text, then define all possible correct answers
            for the blank. Students will see the question followed by a small
            text box to type their answer.
            <h4>Question:</h4>
            <ReactQuill
                className="border-0 mt-2"
                value={question.question}
                onChange={(value) => setQuestionText(questionIndex, value)}
            />
            <h4>Answers:</h4>
        </div>
    );
}
