import React from 'react'
import PropTypes from 'prop-types'

export function useHover() {
  const [hovering, setHovering] = React.useState(false)

  const onMouseOver = () => setHovering(true)
  const onMouseOut = () => setHovering(false)

  return [hovering, { onMouseOut, onMouseOver }]
}

export default class Hover extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    hovering: false,
  }

  mouseOver = () => {
    this.setState({ hovering: true })
  }

  mouseOut = () => {
    this.setState({ hovering: false })
  }

  render() {
    const { children } = this.props
    const { hovering } = this.state
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {children(hovering)}
      </div>
    )
  }
}
