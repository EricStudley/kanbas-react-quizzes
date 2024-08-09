import React from 'react';

interface TrueFalsePreviewProps {
    question: any;
    questionIndex: number;
    answer: any;
    onAnswerChange: (answer: any) => void;
}

const TrueFalsePreview: React.FC<TrueFalsePreviewProps> = ({
    question,
    questionIndex,
    answer,
    onAnswerChange,
}) => {
    return (
        <div>
            <div>
                <input
                    type="radio"
                    checked={answer === 'True'}
                    onChange={() => onAnswerChange('True')}
                />
                <label>True</label>
            </div>
            <div>
                <input
                    type="radio"
                    checked={answer === 'False'}
                    onChange={() => onAnswerChange('False')}
                />
                <label>False</label>
            </div>
        </div>
    );
};

export default TrueFalsePreview;
