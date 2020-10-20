import * as yup from 'yup'

export const singInSchema = yup.object().shape({
  email: yup.string().required('Введите e-mail').email('Введите корректный e-mail'),
  password: yup.string().required('Введите пароль'),
})

export const signUpSchema = yup.object().shape({
  email: yup.string().required('Введите e-mail').email('Введите корректный e-mail'),
  password: yup
    .string()
    .required('Введите пароль')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Слишком легкий пароль'),
  confirmPassword: yup
    .string()
    .required('Введите пароль')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
})

export const questionAnswersSchema = yup.object().shape({
  question: yup.string().required('Не может быть пустым').defined(),
  answer_1: yup.string().required('Не может быть пустым').defined(),
  answer_2: yup.string().required('Не может быть пустым').defined(),
  answer_3: yup.string().required('Не может быть пустым').defined(),
  answer_4: yup.string().required('Не может быть пустым').defined(),
  correctAnswer: yup
    .string()
    .oneOf(['1', '2', '3', '4'], 'Выберите правильный ответ')
    .required('Выберите правильный ответ')
    .defined(),
})

export const quizTitleSchema = yup.object().shape({
  title: yup.string().required('Не может быть пустым').defined(),
})
