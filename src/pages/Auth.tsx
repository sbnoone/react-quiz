import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Container, CssBaseline, Avatar, Typography, makeStyles } from '@material-ui/core'

import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SingUpForm'
import Loader from '../components/Loader'
import { RootState } from '../redux/rootReducer'
import {
  authAutoLogout,
  authLoading,
  authLoginError,
  authLoginSuccess,
  authRegisterError,
  AuthState,
} from '../redux/modules/auth'
import { IAuthArgs, IAuthData } from '../types'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}))

const Auth: React.FC = (): React.ReactElement => {
  const hisory = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { registerError, loginError, loading } = useSelector((state: RootState): AuthState => state.auth)

  const handleRegister = async ({ email, password, confirmPassword }: IAuthArgs) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
    const authData: IAuthData = {
      email,
      password,
      confirmPassword,
      returnSecureToken: true,
    }
    try {
      dispatch(authLoading(true))
      await axios.post(url, authData)
      dispatch(authLoading(false))
      hisory.push('/signin')
    } catch (error) {
      dispatch(authRegisterError())
    }
  }

  const handleLogin = async ({ email, password }: IAuthArgs) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
    const authData: IAuthData = {
      email,
      password,
      returnSecureToken: true,
    }
    try {
      dispatch(authLoading(true))
      const response = await axios.post(url, authData)
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

      localStorage.userId = response.data.localId
      localStorage.token = response.data.idToken
      localStorage.expirationDate = expirationDate

      dispatch(authLoginSuccess({ token: response.data.idToken, userId: response.data.localId }))
      dispatch(authAutoLogout(response.data.expiresIn))
    } catch (error) {
      dispatch(authLoginError())
    }
  }

  const path = hisory.location.pathname.slice(1)
  let form =
    path === 'signin' ? (
      <SignInForm handleLogin={handleLogin} loginError={loginError} />
    ) : (
      <SignUpForm handleRegister={handleRegister} registerError={registerError} />
    )

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component='h1' variant='h5'>
          {path === 'signin' ? 'Вход в аккаунт' : 'Регистрация'}
        </Typography>

        {loading && <Loader />}
        {form}
      </div>
    </Container>
  )
}

export default Auth
