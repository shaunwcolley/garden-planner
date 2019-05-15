import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

class MakePlan extends Component {

  componentDidMount(){
    this.props.onPlansFetched(this.props.userId)
  }

  handleNewPlanClick = () => {
    this.props.history.push('/plan-size')
  }
  handleUseOldClick = (planId) => {
    let url = '/plan/' + planId
    this.props.history.push(url)
  }

  render(){
    let plans = this.props.plans.map(plan => {
      return <li key={plan.id}>{plan.name} <button onClick={() => this.handleUseOldClick(plan.id)}>View</button></li>
    })

    return(
      <div>
        Make a Plan:
        <p><button onClick={this.handleNewPlanClick}>Make New Plan</button></p>
        <p>Use Existing Plan:</p>
        <ul>{plans}</ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    plans: state.plans,
    userId: state.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlansFetched: (userId) => dispatch(actionCreators.allPlansFetched(userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MakePlan)
