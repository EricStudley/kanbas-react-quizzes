import React, { useState } from 'react';
import { Question } from './types';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './index.css'; // Import the CSS file for styling

interface TrueFalseQuestionEditorProps {
  question: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
  onTypeChange: (type: string) => void; // New prop for handling type change
}

const TrueFalseQuestionEditor: React.FC<TrueFalseQuestionEditorProps> = ({ question, onSave, onCancel, onTypeChange }) => {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedQuestion({ ...editedQuestion, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value); // Handle type change
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedQuestion({ ...editedQuestion, correctAnswerIndex: parseInt(e.target.value) });
  };

  const handleQuillChange = (value: string) => {
    setEditedQuestion({ ...editedQuestion, text: value });
  };

  return (
    <div className="question-editor border p-3">
      <div className="d-flex justify-content-between mb-3">
        <input
          name="title"
          type="text"
          value={editedQuestion.title}
          onChange={handleInputChange}
          placeholder="Is 2 + 2 = 4?"
          className="form-control me-2"
        />
        <div className="d-flex align-items-center position-relative">
          <select
            name="type"
            value={editedQuestion.type}
            onChange={handleSelectChange}
            className="form-control me-2 type-select"
          >
            <option value="Multiple choice">Multiple Choice</option>
            <option value="True/false">True/False</option>
            <option value="Fill in the blank">Fill in the Blank</option>
          </select>
          <span className="dropdown-arrow"></span>
          <div className="d-flex align-items-center">
            <input
              name="points"
              type="number"
              value={editedQuestion.points}
              onChange={handleInputChange}
              className="form-control points-input"
              placeholder="pts"
            />
            <span className="ms-2">pts</span>
          </div>
        </div>
      </div>
      <p>Enter your question text, then select if True or False is the correct answer.</p>
      <div className="mb-3">
        <label>Question:</label>
        <ReactQuill
          value={editedQuestion.text}
          onChange={handleQuillChange}
          placeholder="Enter your question"
          className="question-editor-quill"
        />
      </div>
      <label>Answers:</label>
      <div className="form-check">
        <input
          type="radio"
          id="true"
          name="correctAnswer"
          value={0}
          checked={editedQuestion.correctAnswerIndex === 0}
          onChange={handleRadioChange}
          className="form-check-input"
        />
        <label htmlFor="true" className="form-check-label">
          True
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="false"
          name="correctAnswer"
          value={1}
          checked={editedQuestion.correctAnswerIndex === 1}
          onChange={handleRadioChange}
          className="form-check-input"
        />
        <label htmlFor="false" className="form-check-label">
          False
        </label>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={() => onSave(editedQuestion)} className="btn btn-primary me-2">Update Question</button>
        <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default TrueFalseQuestionEditor;
