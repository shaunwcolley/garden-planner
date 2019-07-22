import React, { Component } from 'react';
import "../css/About.css";

class About extends Component {
  constructor() {
    super()
    this.state = {
      topOpen: false,
      midOpen: false,
      botOpen: false,
      topDia: 275,
      midDia: 150,
      botDia: 200,
    }
  }

  handleToggleReset = () => {
    const {topDia, midDia, botDia } = this.state
    const circles = document.querySelectorAll('.about-circle')
    circles.forEach(circle => {
      if(circle.classList.contains('top-circle')) {
        console.log('click')
        circle.style.height = topDia + 'px';
        circle.style.width = topDia + 'px';
      }
      if(circle.classList.contains('middle-circle')) {
        circle.style.height = midDia + 'px';
        circle.style.width = midDia + 'px';
      }
      if(circle.classList.contains('bottom-circle')) {
        circle.style.height = botDia + 'px';
        circle.style.width = botDia + 'px';
      }
      circle.classList.remove('open')
    })
  }

  handleCircleClick = (e) => {
    this.handleToggleReset();
    function toggleSize(state, prevDia) {
      if (state) {
        e.target.style.height = prevDia + 'px';
        e.target.style.width = prevDia + 'px';
      } else {
        e.target.style.height = (prevDia * 2) + 'px'
        e.target.style.width = (prevDia * 2) + 'px'
      }
    }
    if(e.target.classList.contains('top-circle')) {
      e.target.classList.toggle('open')
      this.setState({
        topOpen: this.state.topOpen ? false : true,
        midOpen: false,
        botOpen: false,
      })
      toggleSize(this.state.topOpen, this.state.topDia)
    }
    if(e.target.classList.contains('middle-circle')) {
      e.target.classList.toggle('open')
      this.setState({
        topOpen: false,
        midOpen: this.state.midOpen ? false : true,
        botOpen: false,
      })
      toggleSize(this.state.midOpen, this.state.midDia)
    }
    if(e.target.classList.contains('bottom-circle')) {
      e.target.classList.toggle('open')
      this.setState({
        topOpen: false,
        midOpen: false,
        botOpen: this.state.botOpen ? false : true,
      })
      toggleSize(this.state.botOpen, this.state.midDia)
    }
  }

  handleEscClick = (e) => {
    if(e.keyCode === 27) {
      this.handleToggleReset();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClick)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClick)
  }

  render() {
    return (
      <div className="about-container">
        <div className="about-body">
          <div className="about-circle top-circle" onClick={(e) => this.handleCircleClick(e)}>
            <span>Gardening</span>
          </div>
          <div className="about-circle middle-circle" onClick={(e) => this.handleCircleClick(e)}>
            <span>is</span>
          </div>
          <div className="about-circle bottom-circle" onClick={(e) => this.handleCircleClick(e)}>
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
