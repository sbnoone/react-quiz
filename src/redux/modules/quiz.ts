import axios from '../../axios/axios'
import { Quiz, TThunkAction, TThunkDispatch, typedAction } from '../../types'

enum actionTypes {
  QUIZ_CLICK_ANSWER = 'quiz/QUIZ_CLICK_ANSWER',
  QUIZ_SET_ANSWER_STATE = 'quiz/QUIZ_SET_ANSWER_STATE',
  QUIZ_NEXT_QUESTION = 'quiz/QUIZ_NEXT_QUESTION',
  QUIZ_FINISH = 'quiz/QUIZ_FINISH',
  QUIZ_RESET = 'quiz/QUIZ_RESET',
  QUIZ_RETRY = 'quiz/QUIZ_RETRY',
  QUIZ_REMOVE = 'quiz/QUIZ_REMOVE',

  FETCH_QUIZES_START = 'quiz/FETCH_QUIZES_START',
  FETCH_QUIZES_SUCCESS = 'quiz/FETCH_QUIZES_SUCCESS',
  FETCH_QUIZ_SUCCESS = 'quiz/FETCH_QUIZ_SUCCESS',
  FETCH_QUIZES_ERROR = 'quiz/FETCH_QUIZES_ERROR',
}

export interface QuizState {
  quizes: Quiz[]
  loading: boolean
  error: any
  results: { [answerId: string]: string }
  isFinished: boolean
  activeQuestion: number
  answerState: any
  quiz: Quiz | null
}

const initialState: QuizState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
}

export default function quizReducer(state = initialState, action: QuizAction): QuizState {
  switch (action.type) {
    case actionTypes.FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      }

    case actionTypes.FETCH_QUIZES_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      }

    case actionTypes.FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.payload,
      }

    case actionTypes.FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.payload,
      }

    case actionTypes.QUIZ_SET_ANSWER_STATE:
      return {
        ...state,
        results: { ...state.results, ...action.payload },
      }
    case actionTypes.QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
      }
    case actionTypes.QUIZ_FINISH:
      return {
        ...state,
        isFinished: true,
      }

    case actionTypes.QUIZ_RESET:
    case actionTypes.QUIZ_RETRY:
      return {
        ...state,
        isFinished: false,
        results: {},
        activeQuestion: 0,
      }

    case actionTypes.QUIZ_REMOVE:
      return {
        ...state,
        quizes: state.quizes.filter(quiz => quiz.id !== action.payload),
      }

    default:
      return state
  }
}
type QuizAction = ReturnType<
  | typeof removeQuiz
  | typeof retryQuiz
  | typeof resetQuiz
  | typeof finishQuiz
  | typeof quizNextQuestion
  | typeof setAnswerState
  | typeof fetchQuizesError
  | typeof fetchQuizesSuccess
  | typeof fetchQuizSuccess
  | typeof fetchQuizesError
  | typeof fetchQuizesError
  | typeof fetchQuizesStart
>

export const removeQuiz = (id: string) => typedAction(actionTypes.QUIZ_REMOVE, id)

export const retryQuiz = () => typedAction(actionTypes.QUIZ_RETRY)

export const resetQuiz = () => typedAction(actionTypes.QUIZ_RESET)

export const finishQuiz = () => typedAction(actionTypes.QUIZ_FINISH)

export const quizNextQuestion = () => typedAction(actionTypes.QUIZ_NEXT_QUESTION)

export const setAnswerState = (answerState: QuizState['results']) =>
  typedAction(actionTypes.QUIZ_SET_ANSWER_STATE, answerState)

export const fetchQuizesStart = () => typedAction(actionTypes.FETCH_QUIZES_START)

export const fetchQuizesError = (error: any) => typedAction(actionTypes.FETCH_QUIZES_ERROR, error)

export const fetchQuizesSuccess = (quizes: Quiz[]) => typedAction(actionTypes.FETCH_QUIZES_SUCCESS, quizes)

export const fetchQuizSuccess = (quiz: Quiz) => typedAction(actionTypes.FETCH_QUIZ_SUCCESS, quiz)

export const fetchQuizes = (): TThunkAction => async (dispatch: TThunkDispatch) => {
  dispatch(fetchQuizesStart())
  dispatch(resetQuiz())
  try {
    const response = await axios.get(`quizes.json`)
    const quizes: Quiz[] = []

    Object.keys(response.data).forEach(key => {
      quizes.push({
        id: key,
        userId: response.data[key].userId,
        title: response.data[key].title,
        questionsCount: response.data[key].questions.length,
      })
    })

    dispatch(fetchQuizesSuccess(quizes))
  } catch (error) {
    console.warn(error)
    dispatch(fetchQuizesError(error))
  }
}

export const fetchQuizById = (quizId: string): TThunkAction => async (dispatch: TThunkDispatch) => {
  dispatch(fetchQuizesStart())
  try {
    const response = await axios.get(`quizes/${quizId}.json`)
    dispatch(fetchQuizSuccess(response.data))
  } catch (error) {
    console.warn(error)
    dispatch(fetchQuizesError(error))
  }
}

export const quizAnswerClick = (answerId: string): TThunkAction => (dispatch: TThunkDispatch, getState): void => {
  const quizState = getState().quiz
  const currentQuestion = quizState.quiz?.questions![quizState.activeQuestion]
  const results: QuizState['results'] = quizState.results

  if (currentQuestion?.correctAnswer === answerId) {
    if (!results[currentQuestion.id]) {
      results[currentQuestion.id] = 'correct'
    }

    dispatch(setAnswerState(results))

    if (isQuizFinished(quizState)) {
      dispatch(finishQuiz())
    } else {
      dispatch(quizNextQuestion())
    }
  } else {
    if (currentQuestion && !results[currentQuestion.id]) {
      results[currentQuestion.id] = 'error'
    }
    dispatch(setAnswerState(results))

    if (isQuizFinished(quizState)) {
      dispatch(finishQuiz())
    } else {
      dispatch(quizNextQuestion())
    }
  }
}

export const quizDelete = (quizId: string): TThunkAction => async (dispatch: TThunkDispatch) => {
  try {
    await axios.delete(`quizes/${quizId}.json`)
    dispatch(removeQuiz(quizId))
  } catch (error) {
    console.error(error)
  }
}

function isQuizFinished(quizState: QuizState): boolean {
  return quizState.activeQuestion + 1 === quizState.quiz?.questions!.length
}
