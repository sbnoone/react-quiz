import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import React from 'react'

const SnackBar = () => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      message='Вопрос добавлен'
      open={true}
    />
  )
}

export default SnackBar
