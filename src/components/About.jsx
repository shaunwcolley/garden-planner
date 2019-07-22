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

  handleSizeReset = () => {
    const {topDia, midDia, botDia } = this.state
    const circles = document.querySelectorAll('.about-circle')
    circles.forEach(circle => {
      if(circle.classList.contains('top-circle')) {
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
    })
  }

  handleClassReset = () => {
    const circles = document.querySelectorAll('.about-circle')
    circles.forEach(circle => {
      circle.classList.remove('open')
    })
  }

  handleCircleClick = (e) => {
    this.handleSizeReset();
    function toggleSize(state, prevDia, t) {
      if (state) {
        return
      } else {
        e.target.style.height = (prevDia * 2) + 'px'
        e.target.style.width = (prevDia * 2) + 'px'
      }
    }
    if(e.target.classList.contains('top-circle') || e.target.parentNode.classList.contains('top-circle')) {
      this.setState({
        topOpen: this.state.topOpen ? false : true,
        midOpen: false,
        botOpen: false,
      })
      toggleSize(this.state.topOpen, this.state.topDia, this)
    }
    if(e.target.classList.contains('middle-circle') || e.target.parentNode.classList.contains('middle-circle')) {
      this.setState({
        topOpen: false,
        midOpen: this.state.midOpen ? false : true,
        botOpen: false,
      })
      toggleSize(this.state.midOpen, this.state.midDia, this)
    }
    if(e.target.classList.contains('bottom-circle') || e.target.parentNode.classList.contains('bottom-circle')) {
      this.setState({
        topOpen: false,
        midOpen: false,
        botOpen: this.state.botOpen ? false : true,
      })
      toggleSize(this.state.botOpen, this.state.botDia, this)
    }
  }

  handleEscClick = (e) => {
    if(e.keyCode === 27) {
      this.handleSizeReset();
      this.handleClassReset();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClick)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClick)
  }

  // use classToggle function instead of dom altering functions with react, ok with esc key because that is all bound to dom on render.

  classToggle = (state) => {
    if (state) {
      return ' open'
    } else {
      return ''
    }
  }

  render() {
    const topClass = 'about-circle top-circle' + this.classToggle(this.state.topOpen)
    const midClass = 'about-circle middle-circle' + this.classToggle(this.state.midOpen)
    const botClass = 'about-circle bottom-circle' + this.classToggle(this.state.botOpen)
    return (
      <div className="about-container">
        <div className="about-body">
          <div className={topClass} onClick={(e) => this.handleCircleClick(e)}>
            <h2>Gardening</h2><p className="hidden-text">made simple. <br/> <br/> You can make and view several plans and modify them throughout a growing season.</p>
          </div>
          <div className={midClass} onClick={(e) => this.handleCircleClick(e)}>
            <p className="hidden-text">The garden planner web-app</p><h2>is</h2><p className="hidden-text">date based. That means the day you make your plan go out and plant! From there the calendar estimates harvest dates.</p>
          </div>
          <div className={botClass} onClick={(e) => this.handleCircleClick(e)}>
            <p className="hidden-text">There is only so much time in a growing season. <br/>Spend less time planning and more time having</p><h2>fun!</h2>
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
