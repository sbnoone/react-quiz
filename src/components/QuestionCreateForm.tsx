import React from 'react'
import { useFormik } from 'formik'
import { Button, FormControl, makeStyles } from '@material-ui/core'

import FormInput from './FormInput'
import FormSelect from './FormSelect'
import { questionAnswersSchema } from '../validation/validationSchemas'
import { QuizQuestionAnswersFormProps } from '../types'

const useStyles = makeStyles(theme => ({
  formControl: {
    display: 'flex',
    maxWidth: '70%',
    flexDirection: 'column',
  },
  formButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  formButton: {
    '& + &': {
      marginLeft: 15,
    },
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}))

const QuizQuestionAnswersForm = ({
  handleAddQuestion,
  handleResetCreation,
  handleQuizCreate,
}: QuizQuestionAnswersFormProps) => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      question: '',
      answer_1: '',
      answer_2: '',
      answer_3: '',
      answer_4: '',
      correctAnswer: '',
    },
    validationSchema: questionAnswersSchema,
    validateOnChange: false,
    onSubmit: handleAddQuestion,
  })

  const createQuiz = () => {
    handleQuizCreate(formik)
  }

  return (
    <form onSubmit={formik.handleSubmit} className={classes.formControl} noValidate autoComplete='off'>
      <FormInput formik={formik} name='question' label='Вопрос' />
      <FormInput formik={formik} name='answer_1' label='Ответ №1' />
      <FormInput formik={formik} name='answer_2' label='Ответ №2' />
      <FormInput formik={formik} name='answer_3' label='Ответ №3' />
      <FormInput formik={formik} name='answer_4' label='Ответ №4' />
      <FormSelect formik={formik} name='correctAnswer' label='Правильный ответ' />

      <FormControl className={classes.formButtons}>
        <Button type='submit' className={classes.formButton} variant='contained' color='primary'>
          Добавить вопрос
        </Button>
        <Button onClick={createQuiz} className={classes.formButton} variant='contained' color='primary'>
          Создать тест
        </Button>
        <Button onClick={handleResetCreation} className={classes.formButton} variant='contained' color='secondary'>
          Отмена
        </Button>
      </FormControl>
    </form>
  )
}

export default QuizQuestionAnswersForm
