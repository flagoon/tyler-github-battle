import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'

const activeStyle = {
  color: 'rgb(187, 46, 31)',
}

export default function Nav({ toggleTheme }) {
  const { theme } = React.useContext(ThemeContext)
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink to='/' className='nav-link' activeStyle={activeStyle} exact>
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to='/battle' className='nav-link' activeStyle={activeStyle}>
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        type='button'
        style={{ fontSize: '30' }}
        className='btn-clear'
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  )
}

Nav.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
}
