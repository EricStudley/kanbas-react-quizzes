import React from 'react';
import MultipleChoicePreview from './MultipleChoicePreview';
import TrueFalsePreview from './TrueFalsePreview';
import FillInTheBlankPreview from './FillInTheBlankPreview';

interface BaseQuestionPreviewProps {
    question: any;
    questionIndex: number;
    answer: any;
    onAnswerChange: (answer: any) => void;
}

const BaseQuestionPreview: React.FC<BaseQuestionPreviewProps> = ({
    question,
    questionIndex,
    answer,
    onAnswerChange,
}) => {
    const isMultipleChoice = question.type === 'Multiple Choice';
    const isTrueFalse = question.type === 'True/False';
    const isFillInTheBlank = question.type === 'Fill in the Blank';

    return (
        <div className="question-container mb-5 p-3 border rounded">
            <div className="question-text" dangerouslySetInnerHTML={{ __html: question.question }} />
            {isMultipleChoice && (
                <MultipleChoicePreview
                    question={question}
                    questionIndex={questionIndex}
                    answer={answer}
                    onAnswerChange={onAnswerChange}
                />
            )}
            {isTrueFalse && (
                <TrueFalsePreview
                    question={question}
                    questionIndex={questionIndex}
                    answer={answer}
                    onAnswerChange={onAnswerChange}
                />
            )}
            {isFillInTheBlank && (
                <FillInTheBlankPreview
                    question={question}
                    questionIndex={questionIndex}
                    answer={answer}
                    onAnswerChange={onAnswerChange}
                />
            )}
        </div>
    );
};

export default BaseQuestionPreview;
