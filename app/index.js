import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ThemeContext from './contexts/theme'
import Nav from './components/Nav'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

export default function App() {
  const [theme, toggleTheme] = React.useState('light')
  const changeTheme = () =>
    toggleTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={changeTheme} />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' component={Popular} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/battle/results' component={Results} />
                <Route render={() => <div>404</div>} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
