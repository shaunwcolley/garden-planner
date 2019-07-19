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
        <form className="register-form">
          <label>First Name</label>
          <input onChange={this.handleTextBoxChange} type='text' name="firstName"/>
          <label>Last Name</label>
          <input onChange={this.handleTextBoxChange} type='text' name="lastName"/>
          <label>Zip Code</label>
          <input onChange={this.handleTextBoxChange} type='number' placeholder="12345" name="zipcode"/>
          <label>Veggie Avatar:</label>
          <select onChange={this.handleTextBoxChange} name="favVeg">
            <option value="Onions">Onions</option>
            <option value="Tomatoes">Tomatoes</option>
            <option value="Potatoes">Potatoes</option>
            <option value="GreenBeans">Green Beans</option>
            <option value="Broccoli">Broccoli</option>
            <option value="Lavendar">Lavendar</option>
            <option value="Thyme">Thyme</option>
          </select>
          <label>Email</label>
          <input autoComplete="username" onChange={this.handleTextBoxChange} type='text' placeholder="abc123@email.com" name="email"/>
          <label>Password</label>
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
