import { useState, useCallback } from "react";

function QuizEngine({ quizConfig }) {
  const [currentCase, setCurrentCase] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const startNewCase = useCallback(() => {
    const newCase = quizConfig.generateCase();
    setCurrentCase(newCase);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(newCase.questions.length).fill(null));
    setSubmittedQuestions(new Array(newCase.questions.length).fill(false));
  }, [quizConfig]);

  const handleAnswer = (questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const submitCurrentQuestion = () => {
    const currentQuestion = currentCase.questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];

    let isCorrect = false;
    if (currentQuestion.type === "selectOne") {
      const selectedOption = currentQuestion.options.find(
        (opt) => opt.id === userAnswer,
      );
      isCorrect = selectedOption?.correct === true;
    } else if (currentQuestion.type === "selectAll") {
      const correctIds = currentQuestion.options
        .filter((opt) => opt.correct)
        .map((opt) => opt.id);
      const userIds = userAnswer || [];
      isCorrect =
        correctIds.length === userIds.length &&
        correctIds.every((id) => userIds.includes(id));
    }

    if (isCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    }
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));

    // Mark this question as submitted
    const newSubmitted = [...submittedQuestions];
    newSubmitted[currentQuestionIndex] = true;
    setSubmittedQuestions(newSubmitted);

    // Automatically advance to next question after a brief delay
    setTimeout(() => {
      if (currentQuestionIndex < currentCase.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 100);
  };

  const renderPatientInfo = () => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Patient Case</h2>
      <div className="bg-gray-50 text-gray-700 p-4 rounded-lg">
        <p className="mb-2">
          <strong>Patient:</strong> {currentCase.patient.description}
        </p>
        <p>
          <strong>Medical History:</strong> {currentCase.patient.mhx}
        </p>
      </div>
    </div>
  );

  const renderLabResults = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Laboratory Results</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-3 text-left">Test</th>
              <th className="border border-gray-300 p-3 text-center">Result</th>
              {!quizConfig.hideNormalValues && (
                <th className="border border-gray-300 p-3 text-center">
                  Normal Range
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentCase.labs.map((lab, index) => (
              <tr key={index} className={index % 2 === 1 ? "bg-gray-25" : ""}>
                <td className="border border-gray-300 p-3 font-medium">
                  {lab.test}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  {lab.result}
                </td>
                {!quizConfig.hideNormalValues && (
                  <td className="border border-gray-300 p-3 text-center text-gray-600">
                    {lab.normal}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-sm text-gray-600">
          <p>{currentCase.labsAnnotation}</p>
        </div>
      </div>
    </div>
  );

  const renderQuestionWithFeedback = (questionIndex) => {
    const question = currentCase.questions[questionIndex];
    const userAnswer = userAnswers[questionIndex];
    const hasAnswer = userAnswer !== null && userAnswer !== undefined;
    const isSubmitted = submittedQuestions[questionIndex];
    const isCurrentQuestion = questionIndex === currentQuestionIndex;

    return (
      <div key={questionIndex} className="mb-8">
        <h3 className="text-lg mb-4">{question.text}</h3>

        {question.type === "selectOne" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-4 border border-gray-300 rounded-lg ${
                  isCurrentQuestion && !isSubmitted
                    ? "hover:bg-gray-50 cursor-pointer"
                    : "bg-gray-50 cursor-not-allowed"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option.id}
                  checked={userAnswer === option.id}
                  onChange={(e) =>
                    isCurrentQuestion &&
                    !isSubmitted &&
                    handleAnswer(questionIndex, e.target.value)
                  }
                  disabled={!isCurrentQuestion || isSubmitted}
                  className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 disabled:opacity-50"
                />
                <div>
                  <div className="font-medium">{option.text}</div>
                  {option.description && isSubmitted && (
                    <div className="text-sm text-gray-600">
                      {option.description}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}

        {question.type === "selectAll" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-4 border border-gray-300 rounded-lg ${
                  isCurrentQuestion && !isSubmitted
                    ? "hover:bg-gray-50 cursor-pointer"
                    : "bg-gray-50 cursor-not-allowed"
                }`}
              >
                <input
                  type="checkbox"
                  checked={(userAnswer || []).includes(option.id)}
                  onChange={(e) => {
                    if (isCurrentQuestion && !isSubmitted) {
                      const currentSelections = userAnswer || [];
                      const newSelections = e.target.checked
                        ? [...currentSelections, option.id]
                        : currentSelections.filter((id) => id !== option.id);
                      handleAnswer(questionIndex, newSelections);
                    }
                  }}
                  disabled={!isCurrentQuestion || isSubmitted}
                  className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <div>
                  <div className="font-medium">{option.text}</div>
                  {option.description && isSubmitted && (
                    <div className="text-sm text-gray-600">
                      {option.description}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}

        {isCurrentQuestion && !isSubmitted && (
          <div className="mt-6">
            <button
              onClick={submitCurrentQuestion}
              className="font-serif bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Submit answer
            </button>
          </div>
        )}

        {isSubmitted && renderQuestionFeedback(questionIndex)}
      </div>
    );
  };

  const renderQuestionFeedback = (questionIndex) => {
    const question = currentCase.questions[questionIndex];
    const userAnswer = userAnswers[questionIndex];

    let isCorrect = false;
    let correctOptions = [];
    let selectedOptions = [];

    if (question.type === "selectOne") {
      const selectedOption = question.options.find(
        (opt) => opt.id === userAnswer,
      );
      const correctOption = question.options.find((opt) => opt.correct);
      isCorrect = selectedOption?.correct === true;
      correctOptions = [correctOption];
      selectedOptions = selectedOption ? [selectedOption] : [];
    } else if (question.type === "selectAll") {
      correctOptions = question.options.filter((opt) => opt.correct);
      selectedOptions = question.options.filter((opt) =>
        (userAnswer || []).includes(opt.id),
      );
      const correctIds = correctOptions.map((opt) => opt.id);
      const userIds = userAnswer || [];
      isCorrect =
        correctIds.length === userIds.length &&
        correctIds.every((id) => userIds.includes(id));
    }

    return (
      <div className="mt-6">
        <div
          className={`p-6 rounded-lg border ${
            isCorrect
              ? "bg-green-100 border-green-300"
              : "bg-red-100 border-red-300"
          }`}
        >
          <h4
            className={`text-lg font-semibold mb-3 ${
              isCorrect ? "text-green-800" : "text-red-800"
            }`}
          >
            {isCorrect ? "Correct!" : "Incorrect"}
          </h4>

          {question.explanation}
        </div>
      </div>
    );
  };

  if (!currentCase) {
    return (
      <div className="text-center">
        <p className="text-gray-600 mb-6">{quizConfig.description}</p>
        <button
          onClick={startNewCase}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {quizConfig.startButtonText || "Start Quiz"}
        </button>
      </div>
    );
  }

  const allQuestionsSubmitted = submittedQuestions
    .slice(0, currentQuestionIndex + 1)
    .every((submitted) => submitted === true);
  const isLastQuestion =
    currentQuestionIndex === currentCase.questions.length - 1;

  return (
    <div className="text-left">
      {renderPatientInfo()}
      {renderLabResults()}

      {/* Render all questions up to and including current */}
      {currentCase.questions
        .slice(0, currentQuestionIndex + 1)
        .map((_, index) => renderQuestionWithFeedback(index))}

      {/* Show "Generate New Case" button after last question is answered */}
      {isLastQuestion && allQuestionsSubmitted && (
        <div className="text-center mt-8">
          <button
            onClick={startNewCase}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Generate New Case
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizEngine;
