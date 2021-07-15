import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// style
import './App.css'

// components
import Navigation from './components/navbar/Navigation'
import Landing from './components/landing/Landing'
import Service from './components/service/Service'
import Talents from './components/talents/Talents'
import JoinUs from './components/auth/JoinUs'
import Login from './components/auth/Login'
import Alerting from './components/alert/Alerting'

// redux
import { Provider } from 'react-redux'
import Store from './Store'
import { getUser } from './actions/authActions'

// set auth token
import setAuthToken from './utilities/setAuthToken'
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    Store.dispatch(getUser())
  }, [])

  return (
    <Provider store={Store}>
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path="/" component={Landing} />
          <section>
            <Alerting />
            <Switch>
              <Route exact path="/service" component={Service} />
              <Route exact path="/talents" component={Talents} />
              <Route exact path="/join" component={JoinUs} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  )
}

export default App
