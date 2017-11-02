import React from 'react'
import autobind from 'autobind-decorator'
import { PropTypes } from 'propt-types'
import getURL from './getURL'
import getQueryParameter from './getQueryParameter'
import reset from './reset'
/* global localStorage */

export default class LinkedIn extends React.Component {

  componentDidMount () {
    this.restart()
  }

  @autobind
  start () {
    const state = Math.random().toString(36).substring(7)
    const clientId = this.props.clientId
    const scope = this.props.scope
    localStorage.linkedInReactLogin = state
    localStorage.linkedInReactLoginRedirectUri = window.location.href
    window.location.href = getURL({ clientId, state, scope })
  }

  @autobind
  restart () {
    const state = localStorage.linkedInReactLogin
    const redirectUri = localStorage.linkedInReactLoginRedirectUri
    if (!redirectUri) return
    if (!state) return
    if (state !== getQueryParameter('state')) return
    if (!getQueryParameter('code')) return
    const code = getQueryParameter('code')
    reset()
    this.props.callback({code, redirectUri})
  }

  render () {
    return (
      <button className={this.props.className} onClick={this.start}>
        {this.props.text}
      </button>
    )
  }
}

LinkedInstatic.defaultTypes = {
  clientId: PropTypes.string,
  callback: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.node,
  scope: PropTypes.arrayOf(React.PropTypes.string)
}
