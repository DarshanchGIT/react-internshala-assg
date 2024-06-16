import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  //timer state
  const [resetTimer, setResetTimer] = useState(false);
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marks, setMarks] = useState(0);
  // const [timer, setTimer] = useState(10);

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("quiz.json")
      .then((res) => res.json())
      .then((data) => setQuizs(data));
  }, []);

  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  const startQuiz = () => {
    setShowResult(false);
    setShowStart(false);
    setShowQuiz(true);
    setMarks(0);
    setQuestionIndex(0);
    setCorrectAnswer("");
    setSelectedAnswer("");

    // Ensure result screen is hidden when starting quiz
  };

  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add("bg-success");
        setMarks(marks + 5);
      } else {
        event.target.classList.add("bg-danger");
      }
    }
  };

  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
    setQuestionIndex(questionIndex + 1);
  };

  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setMarks(0);
    setQuestionIndex(0);
    setCorrectAnswer("");
    setSelectedAnswer("");
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
    setResetTimer(!resetTimer); // Toggle the resetTimer state
  };

  return (
    <DataContext.Provider
      value={{
        startQuiz,
        showStart,
        showQuiz,
        question,
        quizs,
        checkAnswer,
        correctAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        showTheResult,
        showResult,
        marks,
        resetTimer,
        startOver,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
