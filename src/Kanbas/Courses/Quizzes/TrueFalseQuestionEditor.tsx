import React, { useState } from 'react';
import { Question } from './types';

interface TrueFalseQuestionEditorProps {
    question: Question;
    onSave: (question: Question) => void;
    onCancel: () => void;
}

const TrueFalseQuestionEditor: React.FC<TrueFalseQuestionEditorProps> = ({ question, onSave, onCancel }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedQuestion({ ...editedQuestion, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditedQuestion({ ...editedQuestion, correctAnswerIndex: parseInt(e.target.value) });
    };

    return (
        <div className="border p-3">
            <div className="mb-3">
                <input
                    name="title"
                    type="text"
                    value={editedQuestion.title}
                    onChange={handleChange}
                    placeholder="Question title"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <textarea
                    name="text"
                    value={editedQuestion.text}
                    onChange={handleChange}
                    placeholder="Question text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Correct Answer</label>
                <select
                    value={editedQuestion.correctAnswerIndex}
                    onChange={handleSelectChange}
                    className="form-control"
                >
                    <option value={0}>True</option>
                    <option value={1}>False</option>
                </select>
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={() => onSave(editedQuestion)} className="btn btn-primary me-2">Save</button>
                <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
            </div>
        </div>
    );
};

export default TrueFalseQuestionEditor;
