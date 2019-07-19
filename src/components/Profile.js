import React, { Component, Fragment } from 'react';
import Popup from './Popup';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      update: false,
      url: 'http://localhost:8080/api/profile/' + this.props.userId,
    };
  };

  userFetch = () => {
    axios.get(this.state.url)
    .then(response => {
      const { email, id, firstName, lastName, favVeg, zipCode } = response.data
      this.setState({ user: true, email, id, firstName, lastName, favVeg, zipCode });
    });
  }

  componentDidMount(){
    this.userFetch();
  };

  render() {
    const avatarImages = {
      Onions: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIQihVk-LSwbk1Hv3SpIzcZqR2OgDR1aSNju2ZHi0jH1gDhO2',
      Tomatoes: 'https://cdn.pixabay.com/photo/2014/04/02/16/17/plant-306826_960_720.png',
      Potatoes: 'https://cdn.pixabay.com/photo/2013/07/12/15/31/potato-149979_960_720.png',
      GreenBeans: 'https://cdn.pixabay.com/photo/2013/07/12/13/17/peas-146743_960_720.png',
      Broccoli: 'http://www.clker.com/cliparts/8/2/0/8/12387044401612433016warszawianka_Broccoli.svg.med.png',
      Lavendar: 'https://cdn.pixabay.com/photo/2018/03/18/14/43/lavender-3237000_960_720.png',
      Thyme: 'https://cdn.pixabay.com/photo/2016/04/01/10/51/creeping-1300062_960_720.png',
    }
    if(this.state.user){
      const { email, firstName, lastName, favVeg, zipCode } = this.state;
      const avatar = <img className="avatar" alt="vegetable-avatar" src={avatarImages[favVeg]}></img>
      const profileDisplay = <div>
      {avatar}
      <ul>
      <li><h3>Profile</h3></li>
      <li>Name: {firstName} {lastName}</li>
      <li>Email: {email}</li>
      <li> Favorite Vegetable: {favVeg}</li>
      <li>Zip Code: {zipCode}</li>
      </ul>
      <button onClick={() => this.props.onProfilePop()}>Edit Profile</button>
      </div>
      return <Fragment>
      {profileDisplay}
      {this.props.profilePop ? <Popup onProfilePop={this.props.onProfilePop} userFetch={this.userFetch} history={this.props.history} user={this.state} /> : null}
      </Fragment>;
    }
    return <Fragment><h3>Profile</h3>
    </Fragment>;
  }
}

export default Profile;
