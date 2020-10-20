import React from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import { Button, Grid, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { IRegisterProps } from '../types'
import { signUpSchema } from '../validation/validationSchemas'
import FormInput from './FormInput'

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

const SignUpForm: React.FC<IRegisterProps> = ({ handleRegister, registerError }): React.ReactElement => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: handleRegister,
  })

  return (
    <>
      {registerError && (
        <Alert style={{ width: '100%' }} severity='error'>
          Пользователь с такой почтой уже существует
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
        <FormInput formik={formik} type='email' label='Почта' name='email' variant='outlined' />
        <FormInput formik={formik} type='password' label='Введите пароль' name='password' variant='outlined' />
        <FormInput formik={formik} type='password' label='Повторите пароль' name='confirmPassword' variant='outlined' />
        <Button className={classes.submit} type='submit' variant='contained' color='primary' fullWidth>
          Регистрация
        </Button>
        <Grid container justify='flex-end'>
          <Grid item>
            <Link to='/signin'>Есть аккаунт? Войти</Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default SignUpForm
