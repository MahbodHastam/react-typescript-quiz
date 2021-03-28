import React, { useState } from "react"
import { Difficulty, fetchQuestions, QuestionState } from "../api"
import { QuestionCard } from "./QuestionCard"

const TOTAL_QUESTIONS = 5

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [difficulty, setDifficulty] = useState(Difficulty.EASY.toString())

  const start = async () => {
    setLoading(true)
    setGameOver(false)
    setDifficulty(difficulty)
    const newQuestions = await fetchQuestions(
      TOTAL_QUESTIONS,
      difficulty
    )
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) setScore(prev => ++prev)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const newQuestion = number + 1
    if (newQuestion === TOTAL_QUESTIONS)
      setGameOver(true)
    else
      setNumber(newQuestion)
  }

  const changeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.currentTarget.value)
  }

  return (
    <div className="app">
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select id="difficulty" onChange={changeDifficulty}>
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
          </select>
          <button className="start-btn" onClick={start}>
            {loading ? ("...") : (
              "Start"
            )}
          </button>
        </div>
      ) : null}
      {!loading && !gameOver && (
        <div>
          <span className="score">Score: {score}</span>
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
          />
        </div>
      )}
      {userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next-btn" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  )
}

export default App
