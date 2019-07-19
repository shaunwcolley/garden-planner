import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import MakePlan from './MakePlan';
import Popup from './Popup';
import About from './About';
import Profile from './Profile';
import * as actionTypes from '../store/actions/actionTypes';
import '../css/App.css';

class App extends Component {

  render() {
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
            <div className="dash-plans">
              <MakePlan history={this.props.history} />
            </div>
            <div className="dash-profile">
              <Profile userId={this.props.userId} profilePop={this.props.profilePop} onProfilePop={this.props.onProfilePop} />
            </div>
            <div className="dash-calendar">
              <Calendar userId={this.props.userId}/>
            </div>
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
    profilePop: state.profilePop,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfilePop: () => dispatch({ type: actionTypes.PROFILE_POPUP})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
