import React from 'react'
import { FormControl, TextField, FormHelperText, makeStyles } from '@material-ui/core'
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

const FormInput: React.FC<CustomFormFieldProps> = ({ formik, name, label, type, variant }) => {
  const classes: ReturnType<typeof useStyles> = useStyles()
  return (
    <FormControl fullWidth className={classes.formInput}>
      <TextField
        {...formik.getFieldProps(name)}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        name={name}
        autoComplete={name}
        label={label}
        type={type ? type : 'text'}
        variant={variant ? variant : 'standard'}
        required
        fullWidth
      />
      <FormHelperText error className={classes.formInputError}>
        {formik.touched[name] && formik.errors[name]}
      </FormHelperText>
    </FormControl>
  )
}

export default FormInput
