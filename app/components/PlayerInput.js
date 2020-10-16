import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'

export default function PlayerInput({ onSubmit, label }) {
  const [userName, setUserName] = React.useState('')
  const { theme } = React.useContext(ThemeContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(userName)
  }

  const handleChange = (event) => {
    setUserName(event.target.value)
  }

  return (
    <form className='column player' onSubmit={handleSubmit}>
      <label htmlFor='userName' className='user-label'>
        {label}
      </label>
      <div className='row player-inputs'>
        <input
          type='text'
          id='userName'
          className={`input-${theme}`}
          placeholder='github username'
          autoComplete='off'
          value={userName}
          onChange={handleChange}
        />
        <button
          className={`btn ${theme}-btn`}
          type='submit'
          disabled={!userName}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}
