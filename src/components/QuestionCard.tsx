import React from 'react'
import { AnswerObject } from './App'

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions
}) => (
  <div className="question-card">
    <h5 className="counter">{questionNumber} / {totalQuestions}</h5>
    <h3 className="question">{question}</h3>
    <div className="answers-buttons">
      {answers.map((answer, key) => (
        <button className={`${userAnswer?.correctAnswer === answer ? 'answer_correct' : ''} ${userAnswer?.answer === answer ? 'answer_user_clicked' : ''}`} value={answer} key={key} onClick={callback} disabled={!!userAnswer}>
          <span dangerouslySetInnerHTML={{ __html: answer }}></span>
        </button>
      ))}
    </div>
  </div>
)