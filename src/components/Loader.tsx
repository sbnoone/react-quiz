import { CircularProgress } from '@material-ui/core'
import React from 'react'

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
    </div>
  )
}

export default Loader
