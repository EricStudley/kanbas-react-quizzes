import React, { useState } from 'react';
import { Question } from './types';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './index.css'; // Import the CSS file for styling

interface MultipleChoiceQuestionEditorProps {
  question: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
  onTypeChange: (type: string) => void; // Add this line
}

const MultipleChoiceQuestionEditor: React.FC<MultipleChoiceQuestionEditorProps> = ({ question, onSave, onCancel, onTypeChange }) => {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedQuestion({ ...editedQuestion, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onTypeChange(value); // Call the type change handler
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

  const handleRadioChange = (index: number) => {
    setEditedQuestion({ ...editedQuestion, correctAnswerIndex: index });
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
          placeholder="New Question"
          className="form-control me-2 title-input"
        />
        <div className="d-flex align-items-center">
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
          <div className="d-flex align-items-center ms-2">
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
      <p>Enter your question and multiple answers, then select the one correct answer.</p>
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
      {editedQuestion.choices.map((choice, index) => (
        <div key={index} className="input-group mb-2">
          <input
            type="text"
            value={choice}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            className="form-control"
            placeholder={`Possible Answer ${index + 1}`}
          />
          <button onClick={() => handleRemoveChoice(index)} className="btn btn-danger align-self-center">Remove</button>
          <input
            type="radio"
            name="correctAnswer"
            checked={editedQuestion.correctAnswerIndex === index}
            onChange={() => handleRadioChange(index)}
            className="ms-2 align-self-center"
          />
        </div>
      ))}
      <button onClick={handleAddChoice} className="btn btn-secondary mb-3">Add Another Answer</button>
      <div className="d-flex justify-content-end">
        <button onClick={() => onSave(editedQuestion)} className="btn btn-primary me-2">Update Question</button>
        <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionEditor;
