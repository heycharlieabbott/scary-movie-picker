import React from 'react';

interface Option {
  id: string;
  text: string;
  nextQuestion?: string;
  movieId?: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface QuestionComponentProps {
  question: Question;
  onAnswer: (option: Option) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswer }) => {
  return (
    <div className="question-container">
      <h2 className="question-title">{question.text}</h2>
      <div className="options-container">
        {question.options.map((option) => (
          <button
            key={option.id}
            className="option-button"
            onClick={() => onAnswer(option)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
