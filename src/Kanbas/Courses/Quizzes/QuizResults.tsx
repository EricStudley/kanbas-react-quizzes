import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import * as client from "./client";

export default function QuizResults() {
    const { qid } = useParams<string>();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [answers, setAnswers] = useState<any>([]);
    const [score, setScore] = useState(0);
    const [totalPossibleScore, setTotalPossibleScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const fetchAnswers = async () => {
        const fetchedQuizAnswers = currentUser.quizAnswers.find(
            (quizAnswer: any) => quizAnswer.quizId === qid
        );

        if (fetchedQuizAnswers) {
            setAnswers(fetchedQuizAnswers.answers);
        } else {
            setAnswers([]);
        }

        const quiz = await client.findQuiz(qid as string);
        const questions = quiz.questions;

        let score = 0;
        let totalPossibleScore = 0;
        let correctAnswers = 0;

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            totalPossibleScore += question.points;
            const answer = fetchedQuizAnswers.answers.find(
                (answer: any) => answer.questionId === question._id
            );

            if (answer) {
                if (question.type === "Multiple Choice") {
                    if (
                        question.multipleChoices[
                            answer.multipleChoiceAnswerIndex
                        ].correct
                    ) {
                        score += question.points;
                        correctAnswers++;
                    }
                } else if (question.type === "True/False") {
                    if (question.trueFalseCorrect == answer.trueFalseAnswer) {
                        score += question.points;
                        correctAnswers++;
                    }
                } else if (question.type === "Fill in the Blank") {
                    for (
                        let i = 0;
                        i < question.fillInTheBlankCorrectAnswers.length;
                        i++
                    ) {
                        let correctAnswer =
                            question.fillInTheBlankCorrectAnswers[i];
                        if (
                            correctAnswer.text.includes(
                                answer.fillInTheBlankAnswer
                            )
                        ) {
                            score += question.points;
                            correctAnswers++;
                        }
                    }
                }
            }
        }

        setScore(score);
        setCorrectAnswers(correctAnswers);
        setTotalPossibleScore(totalPossibleScore);
    };

    useEffect(() => {
        fetchAnswers();
    }, [qid]);

    return (
        <div>
            <h3>Quiz Results</h3>
            <div className="alert alert-danger">
                ❗ This is a preview of the published version of the quiz.
            </div>
            <div>
                <div className="alert alert-success">
                    ✅ You scored {score} out of {totalPossibleScore} points.
                </div>
                <div className="alert alert-info">
                    📝 You answered {correctAnswers} questions correctly.
                </div>
            </div>
        </div>
    );
}
