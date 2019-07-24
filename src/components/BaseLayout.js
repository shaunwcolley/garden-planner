import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions/actionTypes'

export class Header extends Component {

  handleSignOutClick = () => {
    localStorage.removeItem('jsonwebtoken');
    this.props.onSignOut()
    this.props.history.push('/')
  }
  handleLoginPopupClick = () => {
    this.props.onLoginPop()
    this.props.history.push('/')
  }

  handleRegisterPopupClick = () => {
    this.props.onRegisterPop()
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="header">
        <div><NavLink to='/' className="navLink">Home</NavLink></div>
        {!this.props.isAuthenticated ? <button className="navLinkButton login-link" onClick={() => this.handleLoginPopupClick()}>Login</button> : null}
        {!this.props.isAuthenticated ? <button className="navLinkButton" onClick={() => this.handleRegisterPopupClick()}>Register</button> : null}
        {this.props.isAuthenticated ? <button className="navLinkButton signout-link" onClick={() => this.handleSignOutClick()}>Sign Out</button> : null }
      </div>
    )
  }
}

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
          Copyright 2019  -  Shaun Colley
      </div>
    )
  }
}

class BaseLayout extends Component {

  render(){
    return (
      <div className="body">
        <Header isAuthenticated={this.props.isAuth} onSignOut={() => this.props.onSignOut()} onLoginPop={() => this.props.onLoginPop()} onRegisterPop={() => this.props.onRegisterPop()} history={this.props.history} userId={this.props.userId}/>
          <div className="content-wrap">
          {this.props.children}
          </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    userId: state.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch({ type: actionTypes.SIGN_OUT }),
    onLoginPop: () => dispatch({ type: actionTypes.LOGIN_POPUP }),
    onRegisterPop: () => dispatch({ type: actionTypes.REGISTER_POPUP }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BaseLayout))
