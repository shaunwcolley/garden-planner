import React, { Component } from 'react';
import '../css/Register.css'
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';
import axios from 'axios';

class Register extends Component {
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      zipcode: null,
      email: '',
      favVeg: '',
      pass: ''
    }
  }

  handleTextBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegisterClick = () => {
    const creds = this.state;
    console.log('register')
    axios.post('http://localhost:8080/register', creds)
    .then(response => {
      if (response.data.success) {
        this.props.onRegisterPop();
        this.props.history.push('/');
        return
      }
      this.setState({
        ...this.state,
        message: response.data.message,
      })
    })
  }
  render() {
    return(
      <div className="register-body">
        <h4>Registration</h4>
        <form>
          <input onChange={this.handleTextBoxChange} type='text' placeholder="first name" name="firstName"/>
          <input onChange={this.handleTextBoxChange} type='text' placeholder="last name" name="lastName"/>
          <input onChange={this.handleTextBoxChange} type='number' placeholder="zipcode" name="zipcode"/>
          <input onChange={this.handleTextBoxChange} type='text' placeholder="Favorite Vegetable" name="favVeg"/>
          <input autoComplete="username" onChange={this.handleTextBoxChange} type='text' placeholder="email" name="email"/>
          <input autoComplete="new-password" onChange={this.handleTextBoxChange} type='password' placeholder="password" name="pass"/>
          <button className="register-btn" onClick={() => this.handleRegisterClick()}>Register</button>
        </form>
        <h4>{this.state.message}</h4>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterPop: () => dispatch({ type: actionTypes.REGISTER_POPUP })
  }
}

export default connect(null, mapDispatchToProps)(Register);
