import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button, Grid, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { singInSchema } from '../validation/validationSchemas'
import FormInput from './FormInput'
import { ILoginProps } from '../types'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  formInput: {
    marginBottom: 30,
  },
  formInputError: {
    position: 'absolute',
    top: '100%',
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}))

const SignInForm: React.FC<ILoginProps> = ({ handleLogin, loginError }): React.ReactElement => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: singInSchema,
    onSubmit: values => {
      handleLogin(values)
    },
  })

  return (
    <>
      {loginError && (
        <Alert style={{ width: '100%' }} severity='error'>
          Неправильные почта или пароль
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
        <FormInput formik={formik} type='email' name='email' label='Почта' variant='outlined' />
        <FormInput formik={formik} type='password' name='password' label='Пароль' variant='outlined' />
        <Button className={classes.submit} type='submit' variant='contained' color='primary' fullWidth>
          Войти
        </Button>
        <Grid container justify='flex-end'>
          <Link to='/signup'>Нет аккаунта? Зарегистрироваться</Link>
        </Grid>
      </form>
    </>
  )
}

export default SignInForm
