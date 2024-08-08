import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import MultipleChoiceQuestionEditor from './MultipleChoiceQuestionEditor';
import TrueFalseQuestionEditor from './TrueFalseQuestionEditor';
import FillInBlanksQuestionEditor from './FillInBlanksQuestionEditor';
import { addQuestion, editQuestion, deleteQuestion, updateQuiz } from './reducer';
import { Question, Quiz } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Import the CSS file for styling
import * as client from "./client";

const QuizQuestionsEditor: React.FC = () => {
    const { qid } = useParams<{ qid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const quiz = quizzes.find((q: Quiz) => q._id === qid);

    const [questions, setQuestions] = useState<Question[]>(quiz?.questions || []);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [newQuestionType, setNewQuestionType] = useState<string | null>(null);

    useEffect(() => {
        if (qid && !quiz) {
            const fetchQuiz = async () => {
                const fetchedQuiz = await client.findQuizByID(qid);
                if (fetchedQuiz) {
                    setQuestions(fetchedQuiz.questions || []);
                }
            };
            fetchQuiz();
        } else if (quiz) {
            setQuestions(quiz.questions || []);
        }
        console.log('Quiz ID:', qid);
        console.log('Initial Quiz:', quiz);
        console.log('Questions:', questions);
    }, [qid, quiz]);

    const handleAddQuestion = (type: string) => {
        if (!qid) return;

        const question: Question = {
            id: Date.now(),
            title: 'New Question',
            text: '',
            type: type,
            points: 1,
            multipleChoiceQuestionAnswers: type === 'Multiple choice' ? [{ answer: '', correct: false }] : [],
            trueFalseAnswer: type === 'True/false' ? false : undefined,
            fillInBlankAnswers: type === 'Fill in the blank' ? [''] : [],
        };
        setQuestions([...questions, question]);
        dispatch(addQuestion({ quizId: qid, question }));
        setEditingQuestion(question);
        setNewQuestionType(null);
        console.log('Added Question:', question);
    };

    const handleEditQuestion = (id: number, updatedQuestion: Question) => {
        if (!qid) return;

        const updatedQuestions = questions.map(q => q.id === id ? updatedQuestion : q);
        setQuestions(updatedQuestions);
        dispatch(editQuestion({ quizId: qid, question: updatedQuestion }));
        setEditingQuestion(null);
        console.log('Edited Question:', updatedQuestion);
    };

    const handleDeleteQuestion = (id: number) => {
        if (!qid) return;

        const updatedQuestions = questions.filter(q => q.id !== id);
        setQuestions(updatedQuestions);
        dispatch(deleteQuestion({ quizId: qid, questionId: id }));
        console.log('Deleted Question ID:', id);
    };

    const handleSave = () => {
        if (!quiz || !qid) return;

        const updatedQuiz: Quiz = { ...quiz, questions };
        console.log('Saving Quiz:', updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
        navigate(`/Kanbas/Courses/${quiz.course}/Quizzes`);
    };

    const handleTypeChange = (type: string) => {
        if (!editingQuestion) return;
        const updatedQuestion = { ...editingQuestion, type };
        setEditingQuestion(updatedQuestion);
        console.log('Changed Question Type:', updatedQuestion);
    };

    return (
        <div className="quiz-questions-editor container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">Points: {questions?.reduce((total, q) => total + q.points, 0)}</h5>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        + New Question
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><button className="dropdown-item" onClick={() => handleAddQuestion('Multiple choice')}>Multiple Choice</button></li>
                        <li><button className="dropdown-item" onClick={() => handleAddQuestion('True/false')}>True/False</button></li>
                        <li><button className="dropdown-item" onClick={() => handleAddQuestion('Fill in the blank')}>Fill in the Blank</button></li>
                    </ul>
                </div>
            </div>
            <ul className="list-group mb-3">
                {questions?.map((question, index) => (
                    <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{question.title}</span>
                        <div>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingQuestion(question)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${quiz?.course}/Quizzes`)}>Cancel</button>
                <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            </div>
            {editingQuestion && (
                <div className="mt-4">
                    {editingQuestion.type === 'Multiple choice' && (
                        <MultipleChoiceQuestionEditor
                            question={editingQuestion}
                            onSave={(updatedQuestion: Question) => handleEditQuestion(editingQuestion.id, updatedQuestion)}
                            onCancel={() => setEditingQuestion(null)}
                            onTypeChange={handleTypeChange} // Pass the type change handler
                        />
                    )}
                    {editingQuestion.type === 'True/false' && (
                        <TrueFalseQuestionEditor
                            question={editingQuestion}
                            onSave={(updatedQuestion: Question) => handleEditQuestion(editingQuestion.id, updatedQuestion)}
                            onCancel={() => setEditingQuestion(null)}
                            onTypeChange={handleTypeChange} // Pass the type change handler
                        />
                    )}
                    {editingQuestion.type === 'Fill in the blank' && (
                        <FillInBlanksQuestionEditor
                            question={editingQuestion}
                            onSave={(updatedQuestion: Question) => handleEditQuestion(editingQuestion.id, updatedQuestion)}
                            onCancel={() => setEditingQuestion(null)}
                            onTypeChange={handleTypeChange} // Pass the type change handler
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizQuestionsEditor;
