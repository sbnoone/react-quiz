import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'

import { RootState } from '../redux/rootReducer'
import CurrentQuiz from '../components/CurrentQuiz'
import FinishQuiz from '../components/FinishQuiz'
import Loader from '../components/Loader'
import { fetchQuizById, quizAnswerClick, QuizState, retryQuiz } from '../redux/modules/quiz'

export default function Quiz() {
  const params: ReturnType<typeof useParams> = useParams()
  const dispatch = useDispatch()
  const { quiz, loading, results, isFinished, activeQuestion, answerState } = useSelector(
    (state: RootState): QuizState => state.quiz
  )

  const onAnswerClick = (answerId: string): void => {
    dispatch(quizAnswerClick(answerId))
  }

  const handleRetryQuiz = () => {
    dispatch(retryQuiz())
  }

  React.useEffect(() => {
    dispatch(fetchQuizById(params.id as string))
  }, [dispatch, params.id])

  return (
    <>
      <Typography variant='h4'>{quiz && quiz.title} </Typography>
      <br />
      {loading || !quiz ? (
        <Loader />
      ) : isFinished ? (
        <FinishQuiz results={results} quiz={quiz} handleClickRetryQuiz={handleRetryQuiz} />
      ) : (
        quiz && (
          <CurrentQuiz
            onAnswerClick={onAnswerClick}
            answers={quiz?.questions![activeQuestion].answers}
            question={quiz.questions![activeQuestion].question}
            quizLength={quiz?.questions!.length}
            answerState={answerState}
            answerNumber={activeQuestion + 1}
          />
        )
      )}
    </>
  )
}
