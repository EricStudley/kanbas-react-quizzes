import React, { useState } from 'react';
import { Question } from './types';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './index.css'; // Import the CSS file for styling

interface FillInBlanksQuestionEditorProps {
  question: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
  onTypeChange: (type: string) => void; // New prop for handling type change
}

const FillInBlanksQuestionEditor: React.FC<FillInBlanksQuestionEditorProps> = ({ question, onSave, onCancel, onTypeChange }) => {
  const [editedQuestion, setEditedQuestion] = useState({ ...question, fillInBlankAnswers: question.fillInBlankAnswers || [] });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedQuestion({ ...editedQuestion, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value); // Handle type change
  };

  const handleQuillChange = (value: string) => {
    setEditedQuestion({ ...editedQuestion, text: value });
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = editedQuestion.fillInBlankAnswers.map((answer, i) => (i === index ? value : answer));
    setEditedQuestion({ ...editedQuestion, fillInBlankAnswers: newAnswers });
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = editedQuestion.fillInBlankAnswers.filter((_, i) => i !== index);
    setEditedQuestion({ ...editedQuestion, fillInBlankAnswers: newAnswers });
  };

  const handleAddAnswer = () => {
    setEditedQuestion({ ...editedQuestion, fillInBlankAnswers: [...editedQuestion.fillInBlankAnswers, ''] });
  };

  return (
    <div className="question-editor border p-3">
      <div className="d-flex justify-content-between mb-3">
        <input
          name="title"
          type="text"
          value={editedQuestion.title}
          onChange={handleInputChange}
          placeholder="Easy fill the blank"
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
      <p>Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.</p>
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
      {editedQuestion.fillInBlankAnswers.map((answer, index) => (
        <div key={index} className="input-group mb-2">
          <input
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="form-control"
            placeholder={`Possible Answer ${index + 1}`}
          />
          <button onClick={() => handleRemoveAnswer(index)} className="btn btn-danger">Remove</button>
        </div>
      ))}
      <button onClick={handleAddAnswer} className="btn btn-secondary mb-3">Add Another Answer</button>
      <div className="d-flex justify-content-end">
        <button onClick={() => onSave(editedQuestion)} className="btn btn-primary me-2">Update Question</button>
        <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default FillInBlanksQuestionEditor;
