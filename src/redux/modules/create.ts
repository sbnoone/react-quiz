import { Question, typedAction } from '../../types'

enum actionTypes {
  CREATE_QUIZ = 'create/CREATE_QUIZ',
  CREATE_QUIZ_QUESTION = 'create/CREATE_QUIZ_QUESTION',
  CREATE_QUIZ_TITLE = 'create/CREATE_QUIZ_TITLE',
  RESET_QUIZ_CREATION = 'create/RESET_QUIZ_CREATION',
}

export interface CreateQuizState {
  title: string
  questions: Question[] | []
  userId: string
}

const initialState: CreateQuizState = {
  userId: '',
  title: '',
  questions: [],
}

export default function createReducer(state = initialState, action: CreateQuizAction): CreateQuizState {
  switch (action.type) {
    case actionTypes.CREATE_QUIZ_TITLE:
      return {
        ...state,
        title: action.payload,
      }
    case actionTypes.CREATE_QUIZ_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      }
    case actionTypes.RESET_QUIZ_CREATION:
      return {
        title: '',
        questions: [],
        userId: '',
      }
    default:
      return state
  }
}

export const createQuizQuestion = (question: Question) => typedAction(actionTypes.CREATE_QUIZ_QUESTION, question)
export const createQuizTitle = (title: string) => typedAction(actionTypes.CREATE_QUIZ_TITLE, title)
export const resetQuizCreation = () => typedAction(actionTypes.RESET_QUIZ_CREATION)

type CreateQuizAction = ReturnType<typeof createQuizQuestion | typeof createQuizTitle | typeof resetQuizCreation>
