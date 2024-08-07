import React, { useState } from 'react';
import { Question } from './types';

interface MultipleChoiceQuestionEditorProps {
    question: Question;
    onSave: (question: Question) => void;
    onCancel: () => void;
}

const MultipleChoiceQuestionEditor: React.FC<MultipleChoiceQuestionEditorProps> = ({ question, onSave, onCancel }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedQuestion({ ...editedQuestion, [name]: value });
    };

    const handleChoiceChange = (index: number, value: string) => {
        const newChoices = editedQuestion.choices.map((choice, i) => (i === index ? value : choice));
        setEditedQuestion({ ...editedQuestion, choices: newChoices });
    };

    const handleRemoveChoice = (index: number) => {
        const newChoices = editedQuestion.choices.filter((_, i) => i !== index);
        setEditedQuestion({ ...editedQuestion, choices: newChoices });
    };

    const handleAddChoice = () => {
        setEditedQuestion({ ...editedQuestion, choices: [...editedQuestion.choices, ''] });
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
            {editedQuestion.choices.map((choice, index) => (
                <div key={index} className="input-group mb-2">
                    <input
                        type="text"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        className="form-control"
                    />
                    <button onClick={() => handleRemoveChoice(index)} className="btn btn-danger">Remove</button>
                </div>
            ))}
            <button onClick={handleAddChoice} className="btn btn-secondary mb-3">Add Choice</button>
            <div className="d-flex justify-content-end">
                <button onClick={() => onSave(editedQuestion)} className="btn btn-primary me-2">Save</button>
                <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
            </div>
        </div>
    );
};

export default MultipleChoiceQuestionEditor;
