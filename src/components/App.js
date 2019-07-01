import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../css/App.css';


class App extends Component {

  render() {
    if(!this.props.isAuth) {
      return (
        <div className="home-body">
          <h4>Howdy, this is a garden planner app. Click on <u>Make Plan</u> above to make new plan or view and update existing plans.</h4>
        </div>
      )
    }
    return <div className="dash-container">
            <div className="dash-plans">Plans</div>
            <div className="dash-profile">Profile</div>
            <div className="dash-calendar">Calendar</div>
          </div>
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
  }
}

export default connect(mapStateToProps)(App);
