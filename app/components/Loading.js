import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
}

export default function Loading({ speed = 300, text = 'Loading' }) {
  const [content, setContent] = React.useState(text)

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setContent((c) => {
        return c !== `${text}...` ? `${c}.` : text
      })
    }, speed)

    return () => window.clearInterval(interval)
  }, [speed, text])

  return <p style={styles.content}>{content}</p>
}

Loading.propTypes = {
  speed: PropTypes.number,
  text: PropTypes.string,
}
Loading.defaultProps = {
  speed: 300,
  text: 'Loading',
}
