import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz, addQuiz } from "../reducer";
import * as client from "../client";

export default function QuizEditor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { qid, cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [quiz, setQuiz] = useState<any>({
        name: "New Quiz",
        course: cid,
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
    useEffect(() => {
        if (qid !== "New") {
            const q = quizzes.find((q: any) => q._id === qid);
            setQuiz(q);
        }
    }, [qid]);
    return (
        <div id="wd-quizzes-editor">
            <div className="row">
                <div className="col">
                    <br />
                    <br />
                    <input
                        id="wd-name"
                        value={quiz?.name}
                        className="form-control"
                        onChange={(e) =>
                            setQuiz({
                                ...quiz,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                        {" "}
                        <button
                            id="wd-save"
                            className="btn btn-primary float-end me-2"
                        >
                            Cancel
                        </button>
                    </Link>
                    <button
                        id="wd-save"
                        className="btn btn-primary float-end me-2"
                        onClick={saveOrUpdateQuiz}
                    >
                        Save
                    </button>
                </div>
            </div>
            <br />
        </div>
    );
}
