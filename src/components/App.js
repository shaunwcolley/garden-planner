import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import '../css/App.css';


class App extends Component {

  render() {
    const profileLink = "/profile/" + this.props.userId;
    // const calendarLink = "/calendar/" + this.props.userId;
    if(!this.props.isAuth) {
      return (
        <div className="home-body">
          <h4>Howdy, this is a garden planner app. Click on <u>Make Plan</u> above to make new plan or view and update existing plans.</h4>
        </div>
      )
    }
    return <div className="dash-container">
            <div className="dash-plans"><NavLink to="/make-garden">Plans</NavLink></div>
            <div className="dash-profile"><NavLink to={profileLink}>Profile</NavLink></div>
            <div className="dash-calendar"><Calendar userId={this.props.userId}/></div>
          </div>
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    userId: state.userId
  }
}

export default connect(mapStateToProps)(App);
