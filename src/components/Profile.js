import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {

  componentDidMount(){
    let url = 'http://localhost:8080/api' + this.props.match.url;
    axios.get(url)
    .then(response => {
      console.log(response.data);
    });
  };

  render() {
    return <h3>Profile</h3>;
  }
}

export default Profile;
