import { makeStyles, FormControl, InputLabel, NativeSelect, FormHelperText } from '@material-ui/core'
import React from 'react'
import { CustomFormFieldProps } from '../types'

const useStyles = makeStyles(() => ({
  formInput: {
    marginBottom: 30,
  },
  formInputError: {
    position: 'absolute',
    top: '100%',
  },
}))

const FormSelect: React.FC<CustomFormFieldProps> = ({ formik, name, label }) => {
  const classes: ReturnType<typeof useStyles> = useStyles()
  return (
    <FormControl
      error={formik.touched[name] && Boolean(formik.errors[name])}
      fullWidth
      className={classes.formInput}
      required
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <NativeSelect
        error={formik.touched[name] && Boolean(formik.errors[name])}
        {...formik.getFieldProps(name)}
        id={name}
        name={name}
      >
        <option value='' />
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </NativeSelect>
      <FormHelperText error className={classes.formInputError}>
        {formik.touched[name] && formik.errors[name]}
      </FormHelperText>
    </FormControl>
  )
}

export default FormSelect
