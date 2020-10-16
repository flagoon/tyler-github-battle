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

export default class ProfileList extends React.Component {
  static propTypes = {
    profile: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.string,
      company: PropTypes.string,
      followers: PropTypes.number.isRequired,
      following: PropTypes.number.isRequired,
      public_repos: PropTypes.number.isRequired,
    }).isRequired,
  }

  state = {
    hoveringLocation: false,
    hoveringCompany: false,
  }

  mouseOver = (id) => {
    this.setState({ [id]: true })
  }

  mouseOut = (id) => {
    this.setState({ [id]: false })
  }

  render() {
    const { hoveringCompany, hoveringLocation } = this.state
    const { profile } = this.props
    return (
      <ul className='card-list'>
        <li>
          <FaUser color='rgb(239, 115, 115)' size={22} />
          {profile.name}
        </li>
        {profile.location && (
          <li
            style={styles.container}
            onMouseOver={() => this.mouseOver('hoveringLocation')}
            onMouseOut={() => this.mouseOut('hoveringLocation')}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {hoveringLocation === true && (
              <div style={styles.tooltip}>User's location</div>
            )}
            <FaCompass color='rgb(144,115,255)' size={22} />
            {profile.location}
          </li>
        )}
        {profile.company && (
          <li
            style={styles.container}
            onMouseOver={() => this.mouseOver('hoveringCompany')}
            onMouseOut={() => this.mouseOut('hoveringCompany')}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {hoveringCompany === true && (
              <div style={styles.tooltip}>User's company</div>
            )}
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
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
}
