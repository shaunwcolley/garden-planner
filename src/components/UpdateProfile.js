import React, { Component, Fragment } from 'react';
import axios from 'axios';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    if(this.props.user !== undefined){
      console.log(this.props)
      this.state = {
        firstName: null,
        favVeg: this.props.user.favVeg,
      }
    }
  }

  handleTextBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handlePostUpdateClick = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/profile/update/${this.props.user.id}`, this.state)
    .then(response => {
      if (response.data.success) {
        alert('User info was updated');
        this.props.userFetch();
        this.props.onProfilePop();
      }
    })
  }
  render() {

    if(this.props.user !== undefined) {
      const { email, firstName, lastName, zipCode } = this.props.user;
      const profileDisplay = <div>
      <h3>Profile</h3>
      <span>Email: {email}</span>
      <form className="register-form">
        <label>First Name</label>
        <input onChange={this.handleTextBoxChange} type='text' placeholder={firstName} name="firstName"/>
        <label>Last Name</label>
        <input onChange={this.handleTextBoxChange} type='text' placeholder={lastName} name="lastName"/>
        <label>Zip Code</label>
        <input onChange={this.handleTextBoxChange} type='number' placeholder={zipCode} name="zipCode"/>
        <label>Veggie Avatar:</label>
        <select onChange={this.handleTextBoxChange} value={this.state.favVeg} name="favVeg">
          <option value="Onions">Onions</option>
          <option value="Tomatoes">Tomatoes</option>
          <option value="Potatoes">Potatoes</option>
          <option value="GreenBeans">Green Beans</option>
          <option value="Broccoli">Broccoli</option>
          <option value="Lavendar">Lavendar</option>
          <option value="Thyme">Thyme</option>
        </select>
        <button className="register-btn" onClick={(e) => this.handlePostUpdateClick(e)}>Update Profile</button>
      </form>
      </div>
      return <Fragment>{profileDisplay}</Fragment>
    }
    return <Fragment></Fragment>
  }
}

export default UpdateProfile;
