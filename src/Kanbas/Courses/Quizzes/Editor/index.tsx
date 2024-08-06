import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz, addQuiz } from "../reducer";
import * as client from "../client";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function QuizEditor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("details");
    const { qid, cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
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
    });
    const saveQuiz = async (quiz: any) => {
        const status = await client.updateQuiz(quiz);
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
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
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
    useEffect(() => {
        if (qid !== "New") {
            const q = quizzes.find((q: any) => q._id === qid);
            setQuiz(q);
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
                            navigate(
                                `/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`
                            );
                        }}
                    >
                        Questions
                    </a>
                </li>
            </ul>
            {activeTab === "details" && (
                <div className="tab-content mt-3">
                    <div className="mb-3">
                        <input
                            name="name"
                            type="text"
                            value={quiz.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Quiz Instructions:</label>
                        <ReactQuill
                            value={quiz.description}
                            onChange={handleDescriptionChange}
                            className="border-0 mt-2"
                        />
                    </div>
                    <div className="mb-6">
                        <label>Quiz Type</label>
                        <select
                            name="quizType"
                            value={quiz.quizType}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">
                                Ungraded Survey
                            </option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Points</label>
                        <input
                            name="points"
                            type="number"
                            value={quiz.points}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Assignment Group</label>
                        <select
                            name="assignmentGroup"
                            value={quiz.assignmentGroup}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Assignments">Assignments</option>
                            <option value="Project">Project</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>
                            <input
                                name="shuffleAnswers"
                                type="checkbox"
                                checked={quiz.shuffleAnswers}
                                onChange={handleChange}
                            />
                            Shuffle Answers
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>Time Limit (Minutes)</label>
                        <input
                            name="timeLimit"
                            type="number"
                            value={quiz.timeLimit}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>
                            <input
                                name="multipleAttempts"
                                type="checkbox"
                                checked={quiz.multipleAttempts}
                                onChange={handleChange}
                            />
                            Multiple Attempts
                        </label>
                    </div>
                    {quiz.multipleAttempts && (
                        <div className="mb-3">
                            <label>How Many Attempts</label>
                            <input
                                name="attempts"
                                type="number"
                                value={quiz.attempts}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label>
                            <input
                                name="showCorrectAnswers"
                                type="checkbox"
                                checked={quiz.showCorrectAnswers}
                                onChange={handleChange}
                            />
                            Show Correct Answers
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>Access Code</label>
                        <input
                            name="accessCode"
                            type="text"
                            value={quiz.accessCode}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>
                            <input
                                name="oneQuestionAtATime"
                                type="checkbox"
                                checked={quiz.oneQuestionAtATime}
                                onChange={handleChange}
                            />
                            One Question at a Time
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>
                            <input
                                name="webcamRequired"
                                type="checkbox"
                                checked={quiz.webcamRequired}
                                onChange={handleChange}
                            />
                            Webcam Required
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>
                            <input
                                name="lockQuestions"
                                type="checkbox"
                                checked={quiz.lockQuestions}
                                onChange={handleChange}
                            />
                            Lock Questions After Answering
                        </label>
                    </div>
                    <div className="mb-3">
                        <label>Due Date</label>
                        <input
                            name="dueDate"
                            type="datetime-local"
                            value={quiz.dueDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Available Date</label>
                        <input
                            name="availableDate"
                            type="datetime-local"
                            value={quiz.availableDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Until Date</label>
                        <input
                            name="untilDate"
                            type="datetime-local"
                            value={quiz.untilDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={saveOrUpdateQuiz}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={saveAndPublishQuiz}
                    >
                        Save and Publish
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() =>
                            navigate(`/Kanbas/Courses/${cid}/Quizzes`)
                        }
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
