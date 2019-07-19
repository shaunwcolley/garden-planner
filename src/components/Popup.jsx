import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import PlanSize from './PlanSize';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';
import '../css/Popup.css';

class Popup extends Component {

  handleClosePopClick = () => {
    if(this.props.login) {
      this.props.onLoginPop();
      return
    }
    if (this.props.register) {
      this.props.onRegisterPop();
      return
    }
    if (this.props.makePlan) {
      this.props.onPlanPop();
    }
  }
  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <button onClick={() => this.handleClosePopClick()} className="close-popup">X</button>
          {this.props.login ? <Login /> : null}
          {this.props.register ? <Register history={this.props.history} /> : null}
          {this.props.makePlan ? <PlanSize history={this.props.history} /> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    register: state.register,
    makePlan: state.makePlan
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginPop: () => dispatch({ type: actionTypes.LOGIN_POPUP }),
    onRegisterPop: () => dispatch({ type: actionTypes.REGISTER_POPUP }),
    onPlanPop: () => dispatch({ type: actionTypes.PLAN_POPUP }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
