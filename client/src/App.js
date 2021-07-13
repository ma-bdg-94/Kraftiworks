import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

// import components
import Navigation from './components/navbar/Navigation'
import Landing from './components/landing/Landing'
import Service from './components/service/Service'
import Talents from './components/talents/Talents'
import JoinUs from './components/auth/JoinUs'
import Login from './components/auth/Login'

// redux
import { Provider } from 'react-redux'
import Store from './Store'

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path="/" component={Landing} />
          <section>
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
