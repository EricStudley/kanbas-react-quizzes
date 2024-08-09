import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as client from '../client';
import BaseQuestionPreview from './BaseQuestionPreview';
import './QuizPreview.css';

const QuizPreview: React.FC = () => {
    const { qid } = useParams<{ qid: string }>();
    const [quiz, setQuiz] = useState<any>({
        questions: [],
    });
    const [answers, setAnswers] = useState<any[]>([]);

    const fetchQuiz = async () => {
        const fetchedQuiz = await client.findQuiz(qid as string);
        setQuiz(fetchedQuiz);
        setAnswers(new Array(fetchedQuiz.questions.length).fill(null)); 
    };

    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    const handleAnswerChange = (questionIndex: number, answer: any) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmitQuiz = async () => {
        // Submit quiz logic 
        console.log('Quiz submitted:', answers);
    };

    return (
        <div className="quiz-preview-container">
            <h3>Quiz Preview</h3>
            {quiz.questions.map((question: any, index: number) => (
                <div className="quiz-preview-question" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">Question {index + 1}</h4>
                        <div className="quiz-preview-question-points">
                            {question.points} pts
                        </div>
                    </div>
                    <BaseQuestionPreview
                        question={question}
                        questionIndex={index}
                        answer={answers[index]}
                        onAnswerChange={(answer) => handleAnswerChange(index, answer)}
                    />
                </div>
            ))}
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-primary" onClick={handleSubmitQuiz}>
                    Submit Quiz
                </button>
                <button className="btn btn-secondary" onClick={() => window.history.back()}>
                    Edit Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizPreview;
