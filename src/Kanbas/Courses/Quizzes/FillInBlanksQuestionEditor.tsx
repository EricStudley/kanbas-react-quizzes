import React, { useState } from 'react';
import { Question } from './types';

interface FillInBlanksQuestionEditorProps {
    question: Question;
    onSave: (question: Question) => void;
    onCancel: () => void;
}

const FillInBlanksQuestionEditor: React.FC<FillInBlanksQuestionEditorProps> = ({ question, onSave, onCancel }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedQuestion({ ...editedQuestion, [name]: value });
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
            <div className="d-flex justify-content-end">
                <button onClick={() => onSave(editedQuestion)} className="btn btn-primary me-2">Save</button>
                <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
            </div>
        </div>
    );
};

export default FillInBlanksQuestionEditor;
