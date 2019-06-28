import React, { Component, Fragment } from 'react';

class UpdateProfile extends Component {
  render() {
    if(this.props.user.user) {
      const { email, firstName, lastName, favVeg, zipCode } = this.props.user;
      const profileDisplay = <div>
      <h3>Profile</h3>
      <ul>
      <li>Name: {firstName} {lastName}</li>
      <li>Email: {email}</li>
      <li> Favorite Vegetable: {favVeg}</li>
      <li>Zip Code: {zipCode}</li>
      </ul>
      <button onClick={() => this.handleViewUpdateClick()}>Update Profile</button>
      </div>
      return <Fragment>{profileDisplay}</Fragment>
    }
    return
  }
}

export default UpdateProfile;
