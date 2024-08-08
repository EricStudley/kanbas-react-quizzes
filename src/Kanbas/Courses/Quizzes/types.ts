export interface Question {
    id: number;
    title: string;
    text: string;
    type: string;
    points: number;
    multipleChoiceQuestionAnswers?: {
        answer: string;
        correct: boolean;
    }[];
    trueFalseAnswer?: boolean;
    fillInBlankAnswers?: string[];
}

export interface Quiz {
    _id: string;
    name: string;
    description: string;
    quizType: string;
    published: boolean;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attempts: number;
    viewResponses: string;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    requireLockDownBrowser: boolean;
    requiredToViewResults: boolean;
    webcamRequired: boolean;
    lockQuestions: boolean;
    dueDate: Date | null;
    availableDate: Date | null;
    untilDate: Date | null;
    questions: Question[];
}
