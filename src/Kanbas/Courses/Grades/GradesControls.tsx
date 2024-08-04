import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../../Components/GreenCheckmark";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { PiExport } from "react-icons/pi";
import { LiaFileImportSolid, LiaFileExportSolid } from "react-icons/lia";

export default function ModulesControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <button
                id="wd-add-module-btn"
                className="btn btn-lg btn-secondary me-3 float-end"
            >
                <MdSettings
                    className="position-relative fs-4"
                    style={{ bottom: "1px" }}
                />
            </button>
            <div className="dropdown d-inline me-3 float-end">
                <button
                    id="wd-publish-all-btn"
                    className="btn btn-lg btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    <LiaFileExportSolid className="fs-4" /> Export{" "}
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a
                            id="wd-publish-all-modules-and-items-btn"
                            className="dropdown-item"
                            href="#"
                        >
                            Export All
                        </a>
                    </li>
                    <li>
                        <a
                            id="wd-publish-modules-only-button"
                            className="dropdown-item"
                            href="#"
                        >
                            Export Selected
                        </a>
                    </li>
                </ul>
            </div>
            <button
                id="wd-view-progress"
                className="btn btn-lg btn-light me-3 float-end"
            >
                <LiaFileImportSolid className="fs-4" /> Import
            </button>
        </div>
    );
}
