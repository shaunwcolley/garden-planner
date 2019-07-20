import React, { Component } from 'react';
import "../css/About.css";

class About extends Component {
  constructor() {
    super()
    this.state = {
      topCircle: false,
      middleCircle: false,
      bottomCircle: false
    }
  }

  handleCircleClick = (e) => {
    if(e.target.classList.contains('top-circle')) {
      this.setState({
        topCircle: this.state.topCircle ? false : true,
        middleCircle: false,
        bottomCircle: false,
      })
    }
    if(e.target.classList.contains('middle-circle')) {
      this.setState({
        topCircle: false,
        middleCircle: this.state.middleCircle ? false : true,
        bottomCircle: false,
      })
    }
    if(e.target.classList.contains('bottom-circle')) {
      this.setState({
        topCircle: false,
        middleCircle: false,
        bottomCircle: this.state.bottomCircle ? false : true,
      })
    }
    console.log(this.state)
  }

  handleEscClick = (e) => {
    if(e.keyCode === 27) {
      this.setState({
        topCircle: false,
        middleCircle: false,
        bottomCircle: false
      })
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClick)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClick)
  }

  render(){
    let topCircle = <div></div>
    let middleCircle = <div></div>
    let bottomCircle = <div></div>
    if (this.state.topCircle) {
        topCircle = (<div>a</div>)
    } else {
      topCircle = (
        <div className="about-circle top-circle" onClick={(e) => this.handleCircleClick(e)}>
          <span>Gardening</span>
        </div>
      )
    }
    if (this.state.middleCircle) {
      middleCircle = <div>b</div>
    } else {
      middleCircle = (
        <div className="about-circle middle-circle" onClick={(e) => this.handleCircleClick(e)}>
          <span>is</span>
        </div>
      )
    }
    if (this.state.bottomCircle) {
      bottomCircle = <div>c</div>
    } else {
      bottomCircle = (
        <div className="about-circle bottom-circle" onClick={(e) => this.handleCircleClick(e)}>
          <span>fun!</span>
        </div>
      )
    }
    return (
      <div className="about-container">
        <div className="about-body">
          {topCircle}
          {middleCircle}
          {bottomCircle}
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
