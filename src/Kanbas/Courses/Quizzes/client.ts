import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};

export const findQuiz = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

// user answers for a specific quiz
export const getUserAnswers = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/answers`);
    return response.data;
};

// submit the quiz and get the score
export const submitQuiz = async (quizId: string, answers: any) => {
    const response = await axios.post(`${QUIZZES_API}/${quizId}/submit`, { answers });
    return response.data;
};