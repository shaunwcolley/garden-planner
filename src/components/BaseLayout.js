import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions/actionTypes'

export class Header extends Component {

  handleSignOutClick = () => {
    localStorage.removeItem('jsonwebtoken');
    this.props.onSignOut()
    this.props.history.push('/login')
  }
  render() {
    const profileLink = "/profile/" + this.props.userId
    return (
      <div className="header">
        <div><NavLink to='/' className="navLink">Home</NavLink></div>
        {!this.props.isAuthenticated ? <div className="register-link"><NavLink to="/register" className="navLink">Register</NavLink></div> : null}
        {!this.props.isAuthenticated ? <div><NavLink to="/login" className="navLink">Login</NavLink></div> : null}
        {this.props.isAuthenticated ? <div className="profile-link"> <NavLink to={profileLink} className="navLink"> Profile </NavLink></div> : null }
        {this.props.isAuthenticated ? <button className="navLinkButton" onClick={() => this.handleSignOutClick()}>Sign Out</button> : null }
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
        <Header isAuthenticated={this.props.isAuth} onSignOut={() => this.props.onSignOut()} history={this.props.history} userId={this.props.userId}/>
          {this.props.children}
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
    onSignOut: () => dispatch({type: actionTypes.SIGN_OUT})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BaseLayout))
