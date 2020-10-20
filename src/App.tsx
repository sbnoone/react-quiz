import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import dotenv from 'dotenv'

import Layout from './layout/withStylesLayout'
import QuizList from './components/QuizList'
import Logout from './components/Logout'
import Quiz from './pages/Quiz'
import QuizCreate from './pages/QuizCreate'
import Auth from './pages/Auth'

import { RootState } from './redux/rootReducer'
import { authAutoLogin } from './redux/modules/auth'

dotenv.config()

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = Boolean(useSelector((state: RootState) => state.auth).token)

  React.useEffect(() => {
    dispatch(authAutoLogin())
  }, [dispatch])

  let routes = (
    <Switch>
      <Route exact path={['/signin', '/signup']} component={Auth} />
      <Route exact path='/quiz/:id' component={Quiz} />
      <Route exact path='/' component={QuizList} />
      <Redirect to='/' />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/create' component={QuizCreate} />
        <Route exact path='/quiz/:id' component={Quiz} />
        <Route exact path='/' component={QuizList} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return <Layout>{routes}</Layout>
}

export default App
