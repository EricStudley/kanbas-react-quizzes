import QuizzesControls from "./QuizzesControls";
import QuizContextDropdown from "./QuizContextDropdown";
import GreenCheckmark from "../../Components/GreenCheckmark";

import { IoCaretDownSharp } from "react-icons/io5";
import { RxRocket } from "react-icons/rx";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as client from "./client";
import * as accountClient from "../../Account/client";
import { setQuizzes } from "./reducer";

import "./index.css";

export default function Quizzes() {
    const dispatch = useDispatch();
    const { cid } = useParams();
    const [role, setRole] = useState("");
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    const fetchRole = async () => {
        const account = await accountClient.profile();
        setRole(account.role);
    };
    useEffect(() => {
        fetchQuizzes();
        fetchRole();
    }, []);
    return (
        <div id="wd-quizzes">
            <br />
            <QuizzesControls student={role === "STUDENT"} />
            <hr />
            <ul id="wd-quizzes" className="list-group rounded-0">
                <li className="wd-quizzes list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <IoCaretDownSharp className="me-2 fs-6" />

                        <span
                            style={{
                                color: "#212529",
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            Assignment Quizzes
                        </span>
                    </div>
                    <ul
                        id="wd-quizzes-list"
                        className="wd-quizzes-list list-group rounded-0"
                    >
                        {quizzes.map((quiz: any) => {
                            const currentDate = new Date();
                            const dueDate = new Date(quiz.due);
                            const availableDate = new Date(quiz.available);
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
                                            href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
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
                                                  availableDate.toLocaleString(
                                                      "en-US",
                                                      {
                                                          month: "long",
                                                          day: "numeric",
                                                          hour: "numeric",
                                                          minute: "numeric",
                                                          hour12: true,
                                                      }
                                                  )}
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
                                        {dueDate.toLocaleString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                        })}{" "}
                                        | {quiz.points} pts | {quiz.questions}{" "}
                                        Questions
                                    </div>
                                    {role !== "STUDENT" && (
                                        <div className="ms-auto d-flex align-items-center">
                                            <GreenCheckmark />
                                            <QuizContextDropdown
                                                qid={quiz._id}
                                            />
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
