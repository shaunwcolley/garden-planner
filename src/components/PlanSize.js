import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

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
      <div>
        <p>
        <input type="text" name="planName" onChange={this.handleTextBoxChange} placeholder="Garden Plan Name" />
        </p>
        <p>
        <input type="number" name="width" onChange={this.handleNumberChange} step="1" placeholder="width" /> feet by
        <input type="number" name="height" onChange={this.handleNumberChange} step="1" placeholder="height" /> feet
        </p>
        <button onClick={this.handleSaveSizeClick}>Submit</button>
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
