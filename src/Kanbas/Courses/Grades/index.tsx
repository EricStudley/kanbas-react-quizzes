import { FaSearch } from "react-icons/fa";
import GradesControls from "./GradesControls";
import { FiFilter } from "react-icons/fi";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Grades() {
    const { cid } = useParams();
    const enrollments = db.enrollments.filter(
        (enrollment: any) => enrollment.course === cid
    );
    const assignments = db.assignments.filter(
        (assignment: any) => assignment.course === cid
    );
    const users = db.users.filter((user: any) =>
        enrollments.map((enrollment: any) => enrollment.user).includes(user._id)
    );
    const grades = db.grades;
    return (
        <div id="wd-grades" className="ms-5">
            <br />
            <br />
            <GradesControls />
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col">
                    <label
                        htmlFor="wd-student-names"
                        className="fw-bold fs-6 mb-2"
                    >
                        Student Names
                    </label>
                    <br />
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch />
                        </span>
                        <input
                            id="wd-student-names"
                            type="text"
                            className="form-control me-1"
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div className="col">
                    <label
                        htmlFor="wd-assignment-names"
                        className="fw-bold fs-6 mb-2"
                    >
                        Assignment Names
                    </label>
                    <br />
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch />
                        </span>
                        <input
                            id="wd-assignment-names"
                            type="text"
                            className="form-control me-1"
                            placeholder="Search..."
                        />
                    </div>
                </div>
            </div>
            <br />
            <button
                id="wd-view-progress"
                className="btn btn-lg btn-light me-3 mb-4 float-start"
            >
                <FiFilter className="fs-4" /> Apply Filters
            </button>
            <div className="mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            {assignments.map((assignment: any) => (
                                <th>{assignment._id}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr>
                                <td className="text-danger">
                                    {user.firstName + " " + user.lastName}
                                </td>
                                {grades
                                    .filter(
                                        (grade: any) =>
                                            grade.student === user._id
                                    )
                                    .map((grade: any) => (
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control border-0"
                                                value={grade?.grade}
                                            />
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
