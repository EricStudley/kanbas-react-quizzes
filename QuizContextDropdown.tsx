import { IoMdMore } from "react-icons/io";

export default function QuizContextDropdown() {
    return (
        <div className="dropdown d-inline me-1 float-end">
            <button
                id="wd-add-module-btn"
                className="btn btn-lg btn-light bg-transparent border-0 me-1"
                type="button"
                data-bs-toggle="dropdown"
            >
                <IoMdMore className="position-relative fs-4" />
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a
                        id="wd-publish-all-modules-and-items-btn"
                        className="dropdown-item"
                        href="#"
                    >
                        Edit
                    </a>
                </li>
                <li>
                    <a id="wd-delete-quiz" className="dropdown-item" href="#">
                        Delete
                    </a>
                </li>
                <li>
                    <a id="wd-publish-quiz" className="dropdown-item" href="#">
                        Publish
                    </a>
                </li>
                <li>
                    <a id="wd-copy-quiz" className="dropdown-item" href="#">
                        Copy
                    </a>
                </li>
                <li>
                    <a id="wd-sort-quiz" className="dropdown-item" href="#">
                        Sort
                    </a>
                </li>
            </ul>
        </div>
    );
}
