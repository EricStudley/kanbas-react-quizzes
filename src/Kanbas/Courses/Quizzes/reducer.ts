import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quiz, Question } from './types';

interface QuizState {
    quizzes: Quiz[];
}

const initialState: QuizState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
            state.quizzes = action.payload.map(quiz => ({
                ...quiz,
                questions: quiz.questions || []
            }));
        },
        addQuiz: (state, action: PayloadAction<Quiz>) => {
            const newQuiz = {
                ...action.payload,
                questions: action.payload.questions || []
            };
            state.quizzes.push(newQuiz);
        },
        deleteQuiz: (state, action: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
        },
        updateQuiz: (state, action: PayloadAction<Quiz>) => {
            const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
            if (index !== -1) {
                state.quizzes[index] = {
                    ...action.payload,
                    questions: action.payload.questions || []
                };
                console.log('Updated Quiz State:', state.quizzes[index]);
            }
        },
        addQuestion: (state, action: PayloadAction<{ quizId: string, question: Question }>) => {
            const { quizId, question } = action.payload;
            const quiz = state.quizzes.find(quiz => quiz._id === quizId);
            if (quiz) {
                quiz.questions.push(question);
            }
        },
        editQuestion: (state, action: PayloadAction<{ quizId: string, question: Question }>) => {
            const { quizId, question } = action.payload;
            const quiz = state.quizzes.find(quiz => quiz._id === quizId);
            if (quiz) {
                const index = quiz.questions.findIndex(q => q.id === question.id);
                if (index !== -1) {
                    quiz.questions[index] = question;
                }
            }
        },
        deleteQuestion: (state, action: PayloadAction<{ quizId: string, questionId: number }>) => {
            const { quizId, questionId } = action.payload;
            const quiz = state.quizzes.find(quiz => quiz._id === quizId);
            if (quiz) {
                quiz.questions = quiz.questions.filter(q => q.id !== questionId);
            }
        },
    },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, addQuestion, editQuestion, deleteQuestion } = quizzesSlice.actions;
export default quizzesSlice.reducer;
