import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'

export default function Card({
  header,
  subheader,
  avatar,
  href,
  name,
  children,
}) {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className={`card bg-${theme}`}>
      <h4 className='center-text header-lg'>{header}</h4>
      <img src={avatar} className='avatar' alt={`Avatar for ${name}`} />
      {subheader && <h4 className='center-text'>{subheader}</h4>}
      <h2 className='center-text'>
        <a href={href} className='link'>
          {name}
        </a>
      </h2>
      {children}
    </div>
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

Card.defaultProps = {
  subheader: null,
}
