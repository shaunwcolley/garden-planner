import React, { Component, Fragment } from 'react';
import UpdateProfile from './UpdateProfile';
import axios from 'axios';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
      update: false,
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

  handleViewUpdateClick = () => {
    this.setState({
      ...this.state,
      update: !this.state.update ? true : false,
    })
  }

  render() {
    if(this.state.user){
      const { email, firstName, lastName, favVeg, zipCode } = this.state;
      const profileDisplay =<div>
      <h3>Profile</h3>
      <ul>
      <li>Name: {firstName} {lastName}</li>
      <li>Email: {email}</li>
      <li> Favorite Vegetable: {favVeg}</li>
      <li>Zip Code: {zipCode}</li>
      </ul>
      <button onClick={() => this.handleViewUpdateClick()}>Update Profile</button>
      </div>
      return <Fragment>
      {!this.state.update ? profileDisplay : <div><button onClick={() => this.handleViewUpdateClick()}>Back</button><UpdateProfile changeDisplay={this.handleViewUpdateClick} history={this.props.history} user={this.state}></UpdateProfile></div>}
      </Fragment>;
    }
    return <Fragment><h3>Profile</h3>
    </Fragment>;
  }
}

export default Profile;
