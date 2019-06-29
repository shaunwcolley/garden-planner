import React, { Component, Fragment } from 'react';
import axios from 'axios';

class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {
      firstName: null,
    }
  }

  handleTextBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handlePostUpdateClick = () => {
    axios.post(`http://localhost:8080/api/profile/update/${this.props.user.id}`, this.state)
    .then(response => {
      if (response.data.success) {
        console.log(response.data);
        alert('User info was updated');
        this.props.changeDisplay();
      }
    })
  }
  render() {
    if(this.props.user.user) {
      const { email, firstName, lastName, favVeg, zipCode } = this.props.user;
      const profileDisplay = <div>
      <h3>Profile</h3>
      <ul>
      <li>First Name: <input name="firstName" type="text" onChange={this.handleTextBoxChange} placeholder={firstName} /></li>
      <li>Last Name: <input name="lastName" type="text" onChange={this.handleTextBoxChange} placeholder={lastName} /></li>
      <li>Email: <input name="email" type="text" onChange={this.handleTextBoxChange} placeholder={email}/></li>
      <li> Favorite Vegetable: <input name="favVeg" type="text" onChange={this.handleTextBoxChange} placeholder={favVeg} /></li>
      <li>Zip Code: <input name="zipCode" type="number" onChange={this.handleTextBoxChange} placeholder={zipCode}/></li>
      </ul>
      <button onClick={() => this.handlePostUpdateClick()}>Update Profile</button>
      </div>
      return <Fragment>{profileDisplay}</Fragment>
    }
    return
  }
}

export default UpdateProfile;
