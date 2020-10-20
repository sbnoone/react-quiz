import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from '../redux/rootReducer'

export interface Quiz {
  id: string
  title: string
  questions?: Question[]
  userId?: string
  questionsCount?: number
}

export interface Answer {
  text: string
  id: number
}

export interface Question {
  correctAnswer: string
  id: number
  question: string
  answers: Answer[]
}

export interface ILoginProps {
  handleLogin: (authArgs: IAuthArgs) => void
  loginError: boolean
}

export interface IRegisterProps {
  handleRegister: (authArgs: IAuthArgs) => void
  registerError: boolean
}

export interface IAuthData {
  email: string
  password: string
  confirmPassword?: string
  returnSecureToken: boolean
}
export interface IAuthArgs {
  email: string
  password: string
  confirmPassword?: string
}

export interface IAuthSuccessPayload {
  token: string
  userId: string
}

export interface quizTitle {
  title: string
}
export interface QuizTitleCreateFormProps {
  handleAddTitle: (values: quizTitle) => void
}

export interface QuizCreateQuestionValues {
  question: string
  answer_1: string
  answer_2: string
  answer_3: string
  answer_4: string
  correctAnswer: string
}

export interface QuizQuestionAnswersFormProps {
  handleAddQuestion: (values: QuizCreateQuestionValues, formikBag: any) => void
  handleResetCreation: () => void
  handleQuizCreate: (formik: any) => void
}

export interface CustomFormFieldProps {
  formik: any
  name: string
  label: string
  variant?: string
  type?: string
}

export type TThunkAction = ThunkAction<void, RootState, undefined, any>
export type TThunkDispatch = ThunkDispatch<AnyAction, {}, any>

export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(type: T, payload: P): { type: T; payload: P }
export function typedAction(type: string, payload?: any) {
  return { type, payload }
}
