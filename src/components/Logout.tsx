import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authLogout } from '../redux/modules/auth'

const Logout = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(authLogout())
  }, [dispatch])

  return <Redirect to={'/signin'} />
}

export default Logout
