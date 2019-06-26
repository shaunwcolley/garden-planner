import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
    };
  };

  componentDidMount(){
    let url = 'http://localhost:8080/api' + this.props.match.url;
    axios.get(url)
    .then(response => {
      const { email, id, firstName, lastName, favVeg, zipCode } = response.data
      this.setState({ user: true, email, id, firstName, lastName, favVeg, zipCode });
    });
  };

  handleUpdateProfileClick = (id) => {
    console.log(`update profile ${id}`);
  }

  render() {
    if(this.state.user){
      const { email, id, firstName, lastName, favVeg, zipCode } = this.state;
      return <Fragment><h3>Profile</h3>
      <ul>
      <li>Name: {firstName} {lastName}</li>
      <li>Email: {email}</li>
      <li> Favorite Vegetable: {favVeg}</li>
      <li>Zip Code: {zipCode}</li>
      </ul>
      <button onClick={() => this.handleUpdateProfileClick(id)}></button>
      </Fragment>;
    }
    return <Fragment><h3>Profile</h3>
    </Fragment>;
  }
}

export default Profile;
