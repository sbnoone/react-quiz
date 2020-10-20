import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Typography } from '@material-ui/core'
import axios from '../axios/axios'

import QuestionCreateForm from '../components/QuestionCreateForm'
import TitleCreateForm from '../components/TitleCreateForm'
import SnackBar from '../components/SnackBar'
import { RootState } from '../redux/rootReducer'
import { AuthState } from '../redux/modules/auth'
import { QuizCreateQuestionValues } from '../types'
import { createQuizQuestion, createQuizTitle, resetQuizCreation, CreateQuizState } from '../redux/modules/create'

const QuizCreate = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const store = useStore()
  const { title, questions } = useSelector((state: RootState): CreateQuizState => state.create)
  const { userId } = useSelector((state: RootState): AuthState => state.auth)
  const [visibleSnackbar, setVisibleSnackbar] = React.useState(false)

  const showSnackbar = () => {
    setVisibleSnackbar(true)
    setTimeout(() => {
      setVisibleSnackbar(false)
    }, 2000)
  }

  const handleAddTitle = ({ title }: { title: string }): void => {
    dispatch(createQuizTitle(title))
  }

  const handleAddQuestion = (
    { question, answer_1, answer_2, answer_3, answer_4, correctAnswer }: QuizCreateQuestionValues,
    { resetForm }: any
  ): void => {
    const questionItem = {
      id: questions.length + 1,
      question,
      correctAnswer,
      answers: [
        { text: answer_1, id: 1 },
        { text: answer_2, id: 2 },
        { text: answer_3, id: 3 },
        { text: answer_4, id: 4 },
      ],
    }
    dispatch(createQuizQuestion(questionItem))
    showSnackbar()
    resetForm()
  }

  const handleResetCreation = () => {
    dispatch(resetQuizCreation())
  }

  const handleQuizCreate = async (formik: any) => {
    const errors = await formik.validateForm(formik.values)
    const errorsCount = Object.keys(errors).length
    if (errorsCount > 0) {
      // Just trigger validation
      formik.submitForm()
    } else {
      const questionItem = {
        id: questions.length + 1,
        question: formik.values.question,
        correctAnswer: formik.values.correctAnswer,
        answers: [
          { text: formik.values.answer_1, id: 1 },
          { text: formik.values.answer_2, id: 2 },
          { text: formik.values.answer_3, id: 3 },
          { text: formik.values.answer_4, id: 4 },
        ],
      }
      dispatch(createQuizQuestion(questionItem))

      const newQuiz = {
        ...store.getState().create,
        userId,
      }

      try {
        await axios.post('quizes.json', newQuiz)
        history.push('/')
        dispatch(resetQuizCreation())
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <>
      <Typography variant='h4'>Cоздание опроса</Typography>
      {visibleSnackbar && <SnackBar />}
      <br />
      {!title ? (
        <TitleCreateForm handleAddTitle={handleAddTitle} />
      ) : (
        <QuestionCreateForm
          handleResetCreation={handleResetCreation}
          handleAddQuestion={handleAddQuestion}
          handleQuizCreate={handleQuizCreate}
        />
      )}
    </>
  )
}

export default QuizCreate
