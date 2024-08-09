import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz, addQuiz, setQuizzes } from "../reducer";
import * as client from "../client";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { BsQuestionSquare } from "react-icons/bs";

export default function QuizEditor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("details");
    const { qid, cid } = useParams();
    const [quiz, setQuiz] = useState<any>({
        name: "New Quiz",
        course: "",
        description: "",
        quizType: "Graded Quiz",
        published: false,
        points: 0,
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        attempts: 1,
        viewResponses: "Always",
        showCorrectAnswers: false,
        accessCode: "",
        oneQuestionAtATime: true,
        requireLockDownBrowser: false,
        requiredToViewResults: false,
        webcamRequired: false,
        lockQuestions: false,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        questions: [],
    });

    const saveQuiz = async (quiz: any) => {
        await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };

    const createQuiz = async (quiz: any) => {
        const newQuiz = await client.createQuiz(cid as string, quiz);
        dispatch(addQuiz(newQuiz));
    };

    const saveOrUpdateQuiz = () => {
        if (qid === "New") {
            createQuiz(quiz);
        } else {
            saveQuiz(quiz);
        }
        // navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    const saveAndPublishQuiz = () => {
        if (qid === "New") {
            createQuiz({ ...quiz, published: true });
        } else {
            saveQuiz({ ...quiz, published: true });
        }
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setQuiz({
            ...quiz,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleDescriptionChange = (value: string) => {
        setQuiz({
            ...quiz,
            description: value,
        });
    };

    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
        const quiz = quizzes.find((q: any) => q._id === qid);
        setQuiz(quiz);
    };

    const setQuestionPoints = (questionIndex: number, questionPoints: number) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((question: any, index: number) => {
                if (index === questionIndex) {
                    return {
                        ...question,
                        points: questionPoints,
                    };
                }
                return question;
            }),
        });
    }

    const setQuestionTitle = (questionIndex: number, questionTitle: string) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((question: any, index: number) => {
                if (index === questionIndex) {
                    return {
                        ...question,
                        title: questionTitle,
                    };
                }
                return question;
            }),
        });
    }

    const setQuestionType = (questionIndex: number, questionType: string) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((question: any, index: number) => {
                if (index === questionIndex) {
                    return {
                        ...question,
                        type: questionType,
                    };
                }
                return question;
            }),
        });
    }

    const setMultipleChoiceAnswerCorrect = (questionIndex: number, answerIndex: number) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((question: any, index: number) => {
                if (index === questionIndex) {
                    return {
                        ...question,
                        multipleChoices: question.multipleChoices.map((multipleChoice: any, i: number) => {
                            return {
                                ...multipleChoice,
                                correct: i === answerIndex,
                            };
                        }),
                    };
                }
                return question;
            }),
        });
    }

    const setMultipleChoiceAnswerText = (questionIndex: number, answerIndex: number, answerText: string) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((question: any, index: number) => {
                if (index === questionIndex) {
                    return {
                        ...question,
                        multipleChoices: question.multipleChoices.map((multipleChoice: any, i: number) => {
                            if (i === answerIndex) {
                                return {
                                    ...multipleChoice,
                                    text: answerText,
                                };
                            }
                            return multipleChoice;
                        }),
                    };
                }
                return question;
            }),
        });
    }

    const addAnotherMultipleChoiceAnswer = (questionIndex: number) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((question: any, index: number) => {
                if (index === questionIndex) {
                    return {
                        ...question,
                        multipleChoices: [...question.multipleChoices, { text: "New Answer", correct: false }],
                    };
                }
                return question;
            }),
        });
    }

    const setQuestionTrueFalseCorrect = (questionIndex: number, correct: boolean) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((question: any, index: number) => {
                if (index === questionIndex) {
                    return {
                        ...question,
                        trueFalseCorrect: correct,
                    };
                }
                return question;
            }),
        });
    }

    const setQuestionText = (questionIndex: number, questionText: string) => {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((question: any, index: number) => {
                if (index === questionIndex) {
                    return {
                        ...question,
                        question: questionText,
                    };
                }
                return question;
            }),
        });
    }

    const addNewQuestion = () => {
        const newQuestion = {
            title: "New Question",
            type: "Multiple Choice",
            question: "New Question?",
            points: 0,
            multipleChoices: [
                {
                    text: "A",
                    correct: true,
                },
                {
                    text: "B",
                    correct: false,
                },
                {
                    text: "C",
                    correct: false,
                },
                {
                    text: "D",
                    correct: false,
                },
            ],
            trueFalseCorrect: true,
            fillInTheBlankCorrect: "",
        };
        setQuiz({
            ...quiz,
            questions: [...quiz.questions, newQuestion],
        });
    };

    useEffect(() => {
        if (qid !== "New") {
            fetchQuizzes();
        }
    }, [qid]);

    return (
        <div id="wd-quiz-details">
            <h2>Quiz Details</h2>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            activeTab === "details" ? "active" : ""
                        }`}
                        href="#details"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("details");
                        }}
                    >
                        Details
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            activeTab === "questions" ? "active" : ""
                        }`}
                        href="#questions"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("questions");
                        }}
                    >
                        Questions
                    </a>
                </li>
            </ul>
            {activeTab === "details" && (
                <QuizDetailsEditor
                    quiz={quiz}
                    handleChange={handleChange}
                    handleDescriptionChange={handleDescriptionChange}
                    saveOrUpdateQuiz={saveOrUpdateQuiz}
                    saveAndPublishQuiz={saveAndPublishQuiz}
                />
            )}
            {activeTab === "questions" && (
                <QuizQuestionsEditor
                    quiz={quiz}
                    setQuestionTitle={setQuestionTitle}
                    setQuestionType={setQuestionType}
                    setQuestionText={setQuestionText}
                    setQuestionPoints={setQuestionPoints}
                    addNewQuestion={addNewQuestion}
                    setMultipleChoiceAnswerCorrect={setMultipleChoiceAnswerCorrect}
                    setMultipleChoiceAnswerText={setMultipleChoiceAnswerText}
                    addAnotherMultipleChoiceAnswer={addAnotherMultipleChoiceAnswer}
                    setQuestionTrueFalseCorrect={setQuestionTrueFalseCorrect}
                />
            )}
            <button
                className="btn btn-danger btn-primary me-2"
                onClick={saveOrUpdateQuiz}
            >
                Save
            </button>
            <button
                className="btn btn-success me-2"
                onClick={saveAndPublishQuiz}
            >
                Save and Publish
            </button>
            <button
                className="btn btn-secondary"
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
            >
                Cancel
            </button>
            <br />
            <br />
            <br />
        </div>
    );
}
