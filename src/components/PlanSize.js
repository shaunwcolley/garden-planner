import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'
import "../css/PlanSize.css"

class PlanSize extends Component {
  constructor() {
    super()
    this.state = {
      width: 4,
      height: 10,
      planName: ''
    }
  }
  handleNumberChange = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    })
  }
  handleTextBoxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSaveSizeClick = () => {
    let dimensions = this.state
    this.props.onSizeSave(dimensions, this.state.planName)
    this.props.history.push('/plan/new')
  }
  render() {
    return(
      <div className="plan-size-body">
        <p>
        <h4>Garden Name:&nbsp;</h4>
        <input className="plan-name-input" type="text" name="planName" onChange={this.handleTextBoxChange} placeholder="Awesome Garden Map" />
        </p>
        <p className="size-input-p">
        <input className="number-input" type="number" name="width" onChange={this.handleNumberChange} step="1" placeholder="height" /> ' by&nbsp;
        <input className="number-input" type="number" name="height" onChange={this.handleNumberChange} step="1" placeholder="width" /> '
        </p>
        <button className="size-btn" onClick={this.handleSaveSizeClick}>Submit</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSizeSave: (dimensions, planName) => dispatch(actionCreators.sizeSave(dimensions, planName))
  }
}

export default connect(null,mapDispatchToProps)(PlanSize)
