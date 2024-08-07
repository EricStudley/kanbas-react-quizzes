import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentsEditor from "./Assignments/Editor";
import QuizEditor from "./Quizzes/Editor";
import Quizzes from "./Quizzes";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa6";
import Grades from "./Grades";
import PeopleTable from "./People/Table";
import * as accountClient from "../Account/client";
import StudentQuiz from "./Quizzes/StudentQuiz";
import { useEffect, useState } from "react";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizQuestionsEditor from "./Quizzes/QuizQuestionsEditor"; // Import the new component

export default function Courses({ courses }: { courses: any[] }) {
    const { cid } = useParams();
    const [role, setRole] = useState("");
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    const fetchRole = async () => {
        const account = await accountClient.profile();
        setRole(account.role);
    };
    useEffect(() => {
        fetchRole();
    }, []);
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route
                            path="Assignments/:aid"
                            element={<AssignmentsEditor />}
                        />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route
                            path="Quizzes/:qid"
                            element={
                                role === "STUDENT" ? (
                                    <StudentQuiz />
                                ) : (
                                    <QuizDetails />
                                )
                            }
                        />
                        <Route
                            path="Quizzes/:qid/edit"
                            element={<QuizEditor />}
                        />
                        <Route
                            path="Quizzes/:qid/questions"
                            element={<QuizQuestionsEditor />}
                        />
                        <Route path="Grades" element={<Grades />} />
                        <Route path="People" element={<PeopleTable />} />
                        <Route path="People/:uid" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
