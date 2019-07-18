import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';
import '../css/Popup.css';

class Popup extends Component {

  handleClosePopClick = () => {
    if(this.props.login) {
      this.props.onLoginPop();
      return
    } else if (this.props.register) {
      this.props.onRegisterPop();
      return
    }
  }
  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <button onClick={() => this.handleClosePopClick()} className="close-popup">X</button>
          {this.props.login ? <Login /> : null}
          {this.props.register ? <Register history={this.props.history} /> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    register: state.register,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginPop: () => dispatch({ type: actionTypes.LOGIN_POPUP }),
    onRegisterPop: () => dispatch({ type: actionTypes.REGISTER_POPUP }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
