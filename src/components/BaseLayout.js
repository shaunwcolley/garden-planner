import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions/actionTypes'

export class Header extends Component {

  handleSignOutClick = () => {
    localStorage.removeItem('jsonwebtoken');
    this.props.onSignOut()
    this.props.history.push('/login')
  }
  render() {
    return (
      <div className="header">
        <div><NavLink to='/' className="navLink">Home</NavLink></div>
        <div className="makeGardenLink"><NavLink to='/make-garden' className="navLink">Make a Plan</NavLink></div>
        {!this.props.isAuthenticated ? <div><NavLink to="/register" className="navLink">Register</NavLink></div> : null}
        {!this.props.isAuthenticated ? <div><NavLink to="/login" className="navLink">Login</NavLink></div> : null}
        {this.props.isAuthenticated ? <div className="navLink"> Profile </div> : null }
        {this.props.isAuthenticated ? <button className="navLink" onClick={() => this.handleSignOutClick()}>Sign Out</button> : null }
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
        <Header isAuthenticated={this.props.isAuth} onSignOut={() => this.props.onSignOut()} history={this.props.history}/>
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
