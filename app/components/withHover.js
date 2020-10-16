import React from 'react'
import PropTypes from 'prop-types'

export default function withHover(Component) {
  return class WithHover extends React.Component {
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
      const { hovering } = this.state
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component hovering={hovering} {...this.props} />
        </div>
      )
    }
  }
}
