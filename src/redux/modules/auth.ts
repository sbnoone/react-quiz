import { AnyAction, Dispatch } from 'redux'
import { TThunkAction, TThunkDispatch, typedAction } from '../../types'

enum actionTypes {
  AUTH_SET_LOADING = 'auth/AUTH_SET_LOADING',
  AUTH_LOGIN_SUCCESS = 'auth/AUTH_LOGIN_SUCCESS',
  AUTH_REGISTER_SUCCESS = 'auth/AUTH_REGISTER_SUCCESS',
  AUTH_REGISTER_ERROR = 'auth/AUTH_REGISTER_ERROR',
  AUTH_LOGIN_ERROR = 'auth/AUTH_LOGIN_ERROR',
  AUTH_RESET = 'auth/AUTH_RESET',
  AUTH_LOGOUT = 'auth/AUTH_LOGOUT',
}

export interface AuthState {
  token: null | string
  loginError: boolean
  registerError: boolean
  userId: string | null
  loading: boolean
}

interface IAuthSuccessPayload {
  token: string
  userId: string
}

const initialState: AuthState = {
  token: null,
  userId: null,
  loginError: false,
  registerError: false,
  loading: false,
}

export default function authReducer(state = initialState, action: CreateQuizAction): AuthState {
  switch (action.type) {
    case actionTypes.AUTH_SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
      }
    case actionTypes.AUTH_LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
        loading: false,
      }
    case actionTypes.AUTH_REGISTER_ERROR:
      return {
        ...state,
        registerError: true,
        loading: false,
      }
    case actionTypes.AUTH_RESET:
      return {
        ...state,
        loginError: false,
        registerError: false,
        loading: false,
        userId: null,
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      }
    default:
      return state
  }
}

export const authLoginSuccess = (payload: IAuthSuccessPayload) => typedAction(actionTypes.AUTH_LOGIN_SUCCESS, payload)

export const authLoading = (isLoading: boolean) => typedAction(actionTypes.AUTH_SET_LOADING, isLoading)

export const authReset = () => typedAction(actionTypes.AUTH_RESET)

export const authLoginError = () => typedAction(actionTypes.AUTH_LOGIN_ERROR)

export const authRegisterError = () => typedAction(actionTypes.AUTH_REGISTER_ERROR)

export const authLogout = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')

  return typedAction(actionTypes.AUTH_LOGOUT)
}

export const authAutoLogout = (time: number) => (dispatch: Dispatch<AnyAction>) => {
  setTimeout(() => {
    dispatch(authLogout())
  }, time * 1000)
}

export const authAutoLogin = (): TThunkAction => (dispatch: TThunkDispatch) => {
  const token = localStorage.token
  const userId = localStorage.userId
  if (!token) {
    dispatch(authLogout())
  } else {
    const expirationDate = new Date(localStorage.expirationDate)
    if (expirationDate <= new Date()) {
      dispatch(authLogout())
    } else {
      dispatch(authLoginSuccess({ token, userId }))
      dispatch(authAutoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
  }
}

type CreateQuizAction = ReturnType<
  | typeof authLoginSuccess
  | typeof authRegisterError
  | typeof authLoginError
  | typeof authLogout
  | typeof authLoading
  | typeof authReset
>
