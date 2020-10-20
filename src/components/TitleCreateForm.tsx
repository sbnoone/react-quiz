import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { TextField, FormControl, Button, makeStyles, FormHelperText } from '@material-ui/core'
import { quizTitleSchema } from '../validation/validationSchemas'
import { QuizTitleCreateFormProps } from '../types'

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
  formError: {
    color: 'red',
  },
  formButton: {
    '& + &': {
      marginLeft: 15,
    },

    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  formInput: {
    marginBottom: 30,
  },
  formInputError: {
    position: 'absolute',
    top: '100%',
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}))

const QuizTitleCreateForm: React.FC<QuizTitleCreateFormProps> = ({ handleAddTitle }): React.ReactElement => {
  const classes = useStyles()

  const formik = useFormik({
    initialValues: { title: '' },
    validationSchema: quizTitleSchema,
    onSubmit: handleAddTitle,
  })

  return (
    <form onSubmit={formik.handleSubmit} className={classes.formControl} noValidate>
      <FormControl fullWidth className={classes.formInput}>
        <TextField
          {...formik.getFieldProps('question')}
          error={formik.touched.title && Boolean(formik.errors.title)}
          name='title'
          autoComplete='title'
          label='Название опроса'
          required
          fullWidth
        />
        <FormHelperText error className={classes.formInputError}>
          {formik.touched.title && formik.errors.title}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.formButtons}>
        <Button
          disabled={!formik.values.title}
          type='submit'
          className={classes.formButton}
          variant='contained'
          color='primary'
        >
          Далее
        </Button>
        <Button className={classes.formButton} variant='contained' color='secondary'>
          <Link to='/'>Список тестов</Link>
        </Button>
      </FormControl>
    </form>
  )
}

export default QuizTitleCreateForm
