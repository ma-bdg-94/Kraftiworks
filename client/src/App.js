import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

// import components
import Navigation from './components/navbar/Navigation'
import Landing from './components/landing/Landing'
import Service from './components/service/Service'
import Talents from './components/talents/Talents'
import JoinUs from './components/joinus/JoinUs'
import Login from './components/login/Login'

const App = () => {
  return (
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
  )
}

export default App
