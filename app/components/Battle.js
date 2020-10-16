import React from 'react'
import { FaUsers, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerInput from './PlayerInput'
import ThemeContext from '../contexts/theme'

function Instructions() {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>Instructions</h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUsers
            className={`bg-${theme}`}
            color='rgb(155, 191, 116)'
            size={140}
          />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winner</h3>
          <FaTrophy
            className={`bg-${theme}`}
            color='rgb(255, 215, 0)'
            size={140}
          />
        </li>
      </ol>
    </div>
  )
}

function PlayerPreview({ userName, onReset, label }) {
  const { theme } = React.useContext(ThemeContext)

  const playerId = label === 'Player one' ? 'playerOne' : 'playerTwo'

  const handleReset = () => {
    onReset(playerId)
  }

  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className='player-info'>
          <img
            className='avatar-small'
            src={`https://github.com/${userName}.png?size=200`}
            alt={`Avatar for ${userName}`}
          />
          <a href={`https://github.com/${userName}`} className='link'>
            {userName}
          </a>
        </div>
        <button
          className='btn-clear flex-center'
          onClick={handleReset}
          type='button'
        >
          <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  userName: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

function playerReducer(state, action) {
  switch (action.type) {
    case 'SUBMIT_PLAYER':
      return { ...state, [action.payload.id]: action.payload.player }
    case 'RESET_PLAYERS':
      return { ...state, [action.payload.id]: null }
    default:
      return { playerOne: null, playerTwo: null }
  }
}

export default function Battle() {
  const [state, dispatch] = React.useReducer(playerReducer, {
    playerOne: null,
    playerTwo: null,
  })

  const handleSubmit = (id, player) => {
    dispatch({ type: 'SUBMIT_PLAYER', payload: { id, player } })
  }

  const handleReset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <>
      <Instructions />
      <div className='player-containers'>
        <h1 className='center-text header-lg'>Players</h1>
        <div className='row space-around'>
          {state.playerOne === null ? (
            <PlayerInput
              onSubmit={(player) => handleSubmit('playerOne', player)}
              label='Player One'
            />
          ) : (
            <PlayerPreview
              label='Player one'
              onReset={handleReset}
              userName={state.playerOne}
            />
          )}
          {state.playerTwo === null ? (
            <PlayerInput
              onSubmit={(player) => handleSubmit('playerTwo', player)}
              label='Player Two'
            />
          ) : (
            <PlayerPreview
              label='Player two'
              onReset={handleReset}
              userName={state.playerTwo}
            />
          )}
        </div>

        {state.playerOne && state.playerTwo && (
          <Link
            className='btn dark-btn btn-space'
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${state.playerOne}&playerTwo=${state.playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </>
  )
}
