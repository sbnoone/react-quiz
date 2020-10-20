import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Answer } from '../types'

interface currentQuizProps {
  answers: Answer[]
  question: string
  quizLength: number
  answerState: object
  answerNumber: number
  onAnswerClick: (answerId: any) => void
}

const CurrentQuiz = ({ onAnswerClick, answers, question, quizLength, answerNumber }: currentQuizProps) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(false)

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue((event.target as HTMLInputElement).value)
    setError(false)
  }

  const handleAnswerSubmit = () => {
    setValue('')
    onAnswerClick(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!value) {
      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <>
      <Typography variant='h6'>
        {answerNumber}. {question}
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl component='fieldset' error={error}>
          <RadioGroup aria-label='quiz' name='quiz' value={value} onChange={handleRadioChange}>
            {answers.map(answer => (
              <FormControlLabel key={answer.id} value={answer.id.toString()} control={<Radio />} label={answer.text} />
            ))}
          </RadioGroup>
          <Typography variant='body1'>
            Вопрос {answerNumber} из {quizLength}.
          </Typography>
          <Button
            disabled={!value}
            onClick={handleAnswerSubmit}
            style={{ marginTop: 10 }}
            type='submit'
            variant='outlined'
            color='primary'
          >
            Далее
          </Button>
        </FormControl>
      </form>
    </>
  )
}

export default CurrentQuiz
