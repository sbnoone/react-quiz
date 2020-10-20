import { combineReducers } from 'redux'
import authReducer from './modules/auth'
import createReducer from './modules/create'
import quizReducer from './modules/quiz'

export const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  create: createReducer,
})

export type RootState = ReturnType<typeof rootReducer>
