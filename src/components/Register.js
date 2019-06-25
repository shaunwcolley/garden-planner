import React, { Component } from 'react';
import '../css/Register.css'
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
    axios.post('http://localhost:8080/register', creds)
    .then(response => {
      if (response.data.success) {
        this.props.history.push('/login')
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
        <h4>Register:</h4>
        <input onChange={this.handleTextBoxChange} type='text' placeholder="first name" name="firstName"/>
        <input onChange={this.handleTextBoxChange} type='text' placeholder="last name" name="lastName"/>
        <input onChange={this.handleTextBoxChange} type='number' placeholder="zipcode" name="zipcode"/>
        <input onChange={this.handleTextBoxChange} type='text' placeholder="email" name="email"/>
        <input onChange={this.handleTextBoxChange} type='text' placeholder="Favorite Vegetable" name="favVeg"/>
        <input onChange={this.handleTextBoxChange} type='password' placeholder="password" name="pass"/>
        <button className="register-btn" onClick={this.handleRegisterClick}>Register</button>
        <h4>{this.state.message}</h4>
      </div>
    )
  }
}

export default Register
