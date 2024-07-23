import QuizzesControls from "./QuizzesControls";
import QuizContextDropdown from "./QuizContextDropdown";
import GreenCheckmark from "../../Components/GreenCheckmark";

import { IoCaretDownSharp } from "react-icons/io5";
import { RxRocket } from "react-icons/rx";
import { useParams } from "react-router";

import "./index.css";

export default function Quizzes() {
    const { cid } = useParams();
    const quizzes = [
        {
            _id: "1",
            name: "Q1 - HTML",
            available: "2024-03-22T17:00:00.000Z",
            due: "2024-09-23T17:00:00.000Z",
            points: 32,
            questions: 11,
        },
        {
            _id: "2",
            name: "Q2 - CSS",
            available: "2023-09-22T17:00:00.000Z",
            due: "2023-09-23T17:00:00.000Z",
            points: 32,
            questions: 11,
        },
        {
            _id: "3",
            name: "Q3 - JavaScript",
            available: "2024-09-22T17:00:00.000Z",
            due: "2024-09-23T17:00:00.000Z",
            points: 32,
            questions: 11,
        },
        {
            _id: "4",
            name: "Q4 - React",
            available: "2024-09-22T17:00:00.000Z",
            due: "2024-09-23T17:00:00.000Z",
            points: 32,
            questions: 11,
        },
    ];

    return (
        <div id="wd-quizzes">
            <br />
            <QuizzesControls />
            <hr />
            <ul id="wd-quizzes" className="list-group rounded-0">
                <li className="wd-quizzes list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <IoCaretDownSharp className="me-2 fs-6" />
                        Assignment Quizzes
                    </div>
                    <ul
                        id="wd-quizzes-list"
                        className="wd-quizzes-list list-group rounded-0"
                    >
                        {quizzes.map((quiz) => {
                            const currentDate = new Date();
                            const dueDate = new Date(quiz.due);
                            const availableDate = new Date(
                                quiz.available
                            );
                            const isClosed = currentDate > dueDate;
                            const isAvailable = currentDate > availableDate;

                            return (
                                <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                                    <RxRocket
                                        className="me-4 ms-4 fs-3 "
                                        style={{ color: "green" }}
                                    />
                                    <div>
                                        <a
                                            className="wd-assignment-link"
                                            // href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                                            style={{
                                                color: "#212529",
                                                fontWeight: "bold",
                                                textDecoration: "none",
                                            }}
                                        >
                                            {quiz.name}
                                        </a>
                                        <br />
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                                color: "grey",
                                            }}
                                        >
                                            {isClosed
                                                ? "Closed"
                                                : isAvailable
                                                ? "Available"
                                                : "Not Available until " +
                                                  availableDate.toLocaleString()}
                                        </span>{" "}
                                        |{" "}
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                                color: "grey",
                                            }}
                                        >
                                            Due
                                        </span>{" "}
                                        {dueDate.toLocaleString()} | 32 pts | 11 Questions
                                    </div>
                                    <div className="ms-auto d-flex align-items-center">
                                        <GreenCheckmark />
                                        <QuizContextDropdown />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
