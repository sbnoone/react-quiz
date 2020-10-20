import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import Loader from './Loader'
import { RootState } from '../redux/rootReducer'
import { fetchQuizes, quizDelete, QuizState } from '../redux/modules/quiz'
import { AuthState } from '../redux/modules/auth'

const QuizList = () => {
  const dispatch = useDispatch<Dispatch<any>>()
  const { quizes, loading, error } = useSelector((state: RootState): QuizState => state.quiz)
  const { userId } = useSelector((state: RootState): AuthState => state.auth)

  React.useEffect(() => {
    dispatch(fetchQuizes())
  }, [dispatch])

  const deleteQuiz = (id: any) => {
    dispatch(quizDelete(id))
  }

  return loading || !quizes ? (
    <Loader />
  ) : error ? (
    <Alert style={{ width: '100%' }} severity='error'>
      Что-то пошло не так :( Попробуйте снова.
    </Alert>
  ) : (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Название опроса</TableCell>
            <TableCell align='center'>Количество вопросов</TableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizes.map(quiz => (
            <TableRow key={quiz.id}>
              <TableCell scope='row'>
                <Link to={'/quiz/' + quiz.id}>{quiz.title}</Link>
              </TableCell>
              <TableCell scope='row' align='center'>
                {quiz.questionsCount}
              </TableCell>
              <TableCell scope='row' align='center'>
                {quiz.userId === userId ? (
                  <Button onClick={() => deleteQuiz(quiz.id)} color='secondary'>
                    Удалить
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default QuizList
