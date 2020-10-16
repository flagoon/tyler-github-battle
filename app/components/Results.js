import React from 'react'
import PropTypes from 'prop-types'
import {
  FaUser,
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaReact,
} from 'react-icons/fa'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { battle } from '../utils/api'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  },
}

export function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144,115,255)' size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()}
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()}
      </li>
      <li>
        <FaReact color='red' size={22} />
        {profile.public_repos}
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    company: PropTypes.string,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired,
  }).isRequired,
}

function resultReducer(state, action) {
  switch (action.type) {
    case 'fetch':
      return { ...state, loading: true }
    case 'success':
      return {
        ...state,
        loading: false,
        error: null,
        winner: action.payload.winner,
        looser: action.payload.looser,
      }
    case 'failure':
      return { ...state, loading: false, error: action.message }
    default:
      return state
  }
}

export default function Results({ location }) {
  const [state, dispatch] = React.useReducer(resultReducer, {
    winner: null,
    looser: null,
    error: null,
    loading: false,
  })

  React.useEffect(() => {
    const { playerOne, playerTwo } = queryString.parse(location.search)
    dispatch({ type: 'fetch' })
    battle([playerOne, playerTwo])
      .then((players) => {
        dispatch({
          type: 'success',
          payload: { winner: players[0], looser: players[1] },
        })
      })
      .catch(({ message }) => {
        dispatch({ type: 'failure', message })
      })
  }, [location.search])

  const { loading, error, winner, looser } = state

  return (
    <div>
      {loading && <Loading text='Battling' />}
      {error && <div className='center-text error'>{error}</div>}
      {winner !== null && looser !== null && (
        <>
          <div className='grid space-around container-sm'>
            <Card
              header={winner.score === looser.score ? 'Tie' : 'Winner'}
              name={winner.profile.name}
              avatar={winner.profile.avatar_url}
              href={winner.profile.html_url}
              subheader={`Score: ${winner.score.toLocaleString()}`}
            >
              <ProfileList profile={winner.profile} />
            </Card>
            <Card
              header={winner.score === looser.score ? 'Tie' : 'Winner'}
              name={looser.profile.name}
              avatar={looser.profile.avatar_url}
              href={looser.profile.html_url}
              subheader={`Score: ${looser.score.toLocaleString()}`}
            >
              <ProfileList profile={looser.profile} />
            </Card>
          </div>
          <Link to='/battle' className='btn dark-btn btn-space'>
            Reset
          </Link>
        </>
      )}
    </div>
  )
}

class Results2 extends React.Component {
  state = {
    winner: null,
    looser: null,
    error: null,
    loading: true,
  }

  componentDidMount() {
    const { location } = this.props
    const { playerOne, playerTwo } = queryString.parse(location.search)
    battle([playerOne, playerTwo]).then((players) => {
      this.setState({
        winner: players[0],
        looser: players[1],
        error: null,
        loading: false,
      }).catch(({ message }) => {
        this.setState({ error: message, loading: false })
      })
    })
  }

  render() {}
}

Results.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}
