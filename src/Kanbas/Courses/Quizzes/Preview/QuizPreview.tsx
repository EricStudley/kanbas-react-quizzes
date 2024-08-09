import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "../client";
import BaseQuestionPreview from "./BaseQuestionPreview";

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>({
        questions: [],
    });

    const fetchQuiz = async () => {
        const quiz = await client.findQuiz(qid as string);
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    return (
        <div>
            <h2>Quiz Preview</h2>
            {quiz.questions.map((question: any, index: number) => (
                <BaseQuestionPreview
                    question={question}
                    questionIndex={index}
                    key={index}
                />
            ))}
        </div>
    );
}
