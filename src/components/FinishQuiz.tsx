import Button from '@material-ui/core/Button'
import React from 'react'
import { Link } from 'react-router-dom'
import { Quiz } from '../types'

type Results = {
  [key: string]: string
}

interface FinishQuizProps {
  results: Results
  quiz: Quiz
  handleClickRetryQuiz: () => void
}

const FinishQuiz = ({ results, quiz, handleClickRetryQuiz }: FinishQuizProps) => {
  const correctAnswersCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'correct') {
      total++
    }
    return total
  }, 0)

  return (
    <>
      <h3>
        Правильных ответов {correctAnswersCount} из {quiz.questions && quiz.questions.length}
      </h3>
      <Button onClick={handleClickRetryQuiz} variant='contained' color='primary'>
        Пройти еще раз
      </Button>{' '}
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Button variant='outlined' color='primary'>
          Список тестов
        </Button>
      </Link>
    </>
  )
}

export default FinishQuiz
