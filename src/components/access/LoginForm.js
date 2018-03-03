import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import URL from '../../URL'
import { emailChanged, passwordChanged, loginUser, loginUserSuccess, addToStore } from '../../actions'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
    // const { email, password } = this.props
    // this.props.loginUser({ email, password })
    this.setState({ loading: !this.state.loading })
  }

  getUserData(token, email, password) {
    this.props.addToStore(token, email, password)
    this.props.loginUser({ email, password })
  }

  renderError() {
    if (this.props.error) {
      return (
        <div>
          <h1>
            { this.props.error }
          </h1>
        </div>
      )
    }
  }

  renderLoadState() {
    if (this.state.loading) {
      // return <Spinner size="large" />
      return (
        <h1>loading...</h1>
      )
    } else {
      return (
        <h1>not loading...</h1>
      )
    }
  }

  render() {
    console.log(this.state.loading)
    return (
      <div>
        { this.renderLoadState() }
        <button onClick={ this.onButtonPress.bind(this) }>
          Login
        </button>
      </div>
    )
  }
}

export default LoginForm
