import React, { Component } from 'react';
import "../css/About.css";

class About extends Component {
  render(){
    return (
      <div className="about-container">
        <div className="about-body">
          <div className="about-circle top-circle">
            <span>Gardening</span>
          </div>
          <div className="about-circle middle-circle">
            <span>is</span>
          </div>
          <div className="about-circle bottom-circle">
            <span>fun!</span>
          </div>
        </div>
        <div className="about-footer">
          <img className="flower-left flower" alt="carnation" src="https://cdn.pixabay.com/photo/2012/04/18/21/01/carnation-37872_960_720.png"/>
          <img alt="grass" src="https://cdn.pixabay.com/photo/2014/03/24/17/17/flowers-295321_960_720.png"/>
          <img className="flower-right flower" alt="flower" src="https://cdn.pixabay.com/photo/2017/01/31/21/37/flower-2027457_960_720.png"/>
        </div>
      </div>
    )
  }
}

export default About
