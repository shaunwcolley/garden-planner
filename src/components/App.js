import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import MakePlan from './MakePlan';
import Popup from './Popup';
import About from './About';
import '../css/App.css';

class App extends Component {
  render() {
    const profileLink = "/profile/" + this.props.userId;
    if(!this.props.isAuth) {
      return (
        <Fragment>
          <About />
        {this.props.login ? <Popup /> : null}
        {this.props.register ? <Popup history={this.props.history} /> : null}
        </Fragment>
      )
    }
    return <div className="dash-container">
            <div className="dash-plans"><MakePlan history={this.props.history} /></div>
            <div className="dash-profile"><NavLink to={profileLink}>Profile</NavLink></div>
            <div className="dash-calendar"><Calendar userId={this.props.userId}/></div>
            {this.props.makePlan ? <Popup history={this.props.history} /> : null}
          </div>
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    userId: state.userId,
    login: state.login,
    register: state.register,
    makePlan: state.makePlan,
  }
}

export default connect(mapStateToProps)(App);
