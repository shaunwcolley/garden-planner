import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

export class Header extends Component {
  render() {
    return (
      <div className="header">
        <div><NavLink to='/' className="navLink">Home</NavLink></div>
        <div className="makeGardenLink"><NavLink to='/make-garden' className="navLink">Make a Plan</NavLink></div>
        <div><NavLink to='/login' className="navLink">Login</NavLink></div>
      </div>
    )
  }
}

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
      </div>
    )
  }
}

export class BaseLayout extends Component {

  render(){
    return (
      <div className="body">
        <Header />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}
