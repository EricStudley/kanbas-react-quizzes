export interface Question {
    id: number;
    title: string;
    text: string;
    type: string;
    points: number;
    choices: string[];
    correctAnswerIndex: number;
}

export interface Quiz {
    _id: string;
    name: string;
    description: string;
    course: string;
    quizType: string;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attempts: number;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: string;
    availableDate: string;
    untilDate: string;
    questions: Question[]; // Add this line to include questions in Quiz
}
