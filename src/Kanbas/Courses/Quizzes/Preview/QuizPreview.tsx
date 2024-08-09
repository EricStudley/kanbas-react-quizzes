import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as client from "../client";
import BaseQuestionPreview from "./BaseQuestionPreview";
import "./QuizPreview.css";
import { useSelector } from "react-redux";
import * as peopleClient from "../../People/client";

const QuizPreview: React.FC = () => {
    const navigate = useNavigate();
    const { cid, qid } = useParams<string>();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [quiz, setQuiz] = useState<any>({
        questions: [],
    });
    const [answers, setAnswers] = useState<any>([]);

    const fetchQuiz = async () => {
        const fetchedQuiz = await client.findQuiz(qid as string);
        setQuiz(fetchedQuiz);
    };

    const fetchAnswers = async () => {
        const fetchedQuizAnswers = currentUser.quizAnswers.find(
            (quizAnswer: any) => quizAnswer.quizId === qid
        );

        if (fetchedQuizAnswers) {
            setAnswers(fetchedQuizAnswers.answers);
        } else {
            setAnswers([]);
        }
    };

    const setMultipleChoiceAnswerIndex = (
        questionId: number,
        multipleChoiceAnswerIndex: number
    ) => {
        let answerFound = false;
        let updatedAnswers = [];

        if (answers.length) {
            updatedAnswers = answers.map((answer: any) => {
                if (answer.questionId === questionId) {
                    answerFound = true;
                    return {
                        ...answer,
                        multipleChoiceAnswerIndex: multipleChoiceAnswerIndex,
                    };
                }
                return answer;
            });
        }

        if (!answerFound) {
            updatedAnswers.push({
                questionId: questionId,
                multipleChoiceAnswerIndex: multipleChoiceAnswerIndex,
            });
        }

        setAnswers(updatedAnswers);
    };

    const setTrueFalseAnswer = (
        questionId: number,
        trueFalseAnswer: string
    ) => {
        let answerFound = false;
        let updatedAnswers = [];

        if (answers.length) {
            updatedAnswers = answers.map((answer: any) => {
                if (answer.questionId === questionId) {
                    answerFound = true;
                    return {
                        ...answer,
                        trueFalseAnswer: trueFalseAnswer,
                    };
                }
                return answer;
            });
        }

        if (!answerFound) {
            updatedAnswers.push({
                questionId: questionId,
                trueFalseAnswer: trueFalseAnswer,
            });
        }

        setAnswers(updatedAnswers);
    };

    const setFillInTheBlankAnswer = (
        questionId: number,
        fillInTheBlankAnswer: string
    ) => {
        let answerFound = false;
        let updatedAnswers = [];

        if (answers.length) {
            updatedAnswers = answers.map((answer: any) => {
                if (answer.questionId === questionId) {
                    answerFound = true;
                    return {
                        ...answer,
                        fillInTheBlankAnswer: fillInTheBlankAnswer,
                    };
                }
                return answer;
            });
        }

        if (!answerFound) {
            updatedAnswers.push({
                questionId: questionId,
                fillInTheBlankAnswer: fillInTheBlankAnswer,
            });
        }

        setAnswers(updatedAnswers);
    };

    const submitQuizAnswers = async () => {
        let quizAnswerFound = false;

        const quizAnswers = currentUser.quizAnswers.map((quizAnswer: any) => {
            if (quizAnswer.quizId === qid) {
                quizAnswerFound = true;
                return {
                    ...quizAnswer,
                    answers,
                };
            }
            return quizAnswer;
        });

        if (!quizAnswerFound) {
            quizAnswers.push({
                quizId: qid,
                answers,
            });
        }

        const updatedUser = {
            ...currentUser,
            quizAnswers,
        };

        await peopleClient.updateUser(updatedUser);
    };

    useEffect(() => {
        fetchQuiz();
        fetchAnswers();
    }, [qid]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    return (
        <div className="quiz-preview-container">
            <h3>Quiz Preview</h3>
            {quiz.questions.map(
                (question: any, index: number) =>
                    currentQuestionIndex === index && (
                        <div className="quiz-preview-question" key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">Question {index + 1}</h4>
                                <div className="quiz-preview-question-points">
                                    {question.points} pts
                                </div>
                            </div>
                            <BaseQuestionPreview
                                question={question}
                                questionId={question._id}
                                answer={Object.values(answers).find(
                                    (answer: any) =>
                                        answer.questionId === question._id
                                )}
                                setMultipleChoiceAnswerIndex={
                                    setMultipleChoiceAnswerIndex
                                }
                                setTrueFalseAnswer={setTrueFalseAnswer}
                                setFillInTheBlankAnswer={
                                    setFillInTheBlankAnswer
                                }
                            />
                            <div className="d-flex justify-content-between mt-4">
                                <div>
                                    {currentQuestionIndex !== 0 && (
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                setCurrentQuestionIndex(
                                                    currentQuestionIndex - 1
                                                )
                                            }
                                        >
                                            Previous Question
                                        </button>
                                    )}
                                </div>
                                <div>
                                    {currentQuestionIndex !==
                                        quiz.questions.length - 1 && (
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                setCurrentQuestionIndex(
                                                    currentQuestionIndex + 1
                                                )
                                            }
                                        >
                                            Next Question
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
            )}
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-primary" onClick={submitQuizAnswers}>
                    Submit Quiz
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)
                    }
                >
                    Edit Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizPreview;
