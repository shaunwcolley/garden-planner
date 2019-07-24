import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import PlanSize from './PlanSize';
import UpdateProfile from './UpdateProfile';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';
import '../css/Popup.css';

class Popup extends Component {

  handleClosePopClick = () => {
    switch(true) {
      case this.props.login :
      return this.props.onLoginPop();
      case this.props.register :
      return this.props.onRegisterPop();
      case this.props.makePlan :
      return this.props.onPlanPop();
      case this.props.profilePop :
      return this.props.onProfilePop();
      default :
      return
    }
  }

  handleEscClick = (e) => {
    if(e.keyCode === 27) {
      this.handleClosePopClick();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClick)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClick)
  }

  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <button onClick={() => this.handleClosePopClick()} className="close-popup">X</button>
          {this.props.login ? <Login /> : null}
          {this.props.register ? <Register history={this.props.history} /> : null}
          {this.props.makePlan ? <PlanSize history={this.props.history} /> : null}
          {this.props.profilePop ? <UpdateProfile onProfilePop={this.props.onProfilePop} userFetch={this.props.userFetch} history={this.props.history} user={this.props.user} /> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    register: state.register,
    makePlan: state.makePlan,
    profilePop: state.profilePop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginPop: () => dispatch({ type: actionTypes.LOGIN_POPUP }),
    onRegisterPop: () => dispatch({ type: actionTypes.REGISTER_POPUP }),
    onPlanPop: () => dispatch({ type: actionTypes.PLAN_POPUP }),
    onProfilePop: () => dispatch({ type: actionTypes.PROFILE_POPUP })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
