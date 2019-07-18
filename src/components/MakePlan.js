import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'
import "../css/MakePlan.css"

class MakePlan extends Component {

  componentDidMount(){
    this.props.onPlansFetched(this.props.userId)
  }

  handleNewPlanClick = () => {
    this.props.history.push('/plan-size')
    this.props.onNewPlan()
  }
  handleUseOldClick = (planId) => {
    let url = '/plan/' + planId
    this.props.history.push(url)
  }

  render(){
    let plans = this.props.plans.map(plan => {
      return <tr key={plan.id}><td>{plan.name}</td><td><button className="view-btn" onClick={() => this.handleUseOldClick(plan.id)}>View</button></td></tr>
    })

    return(
      <div className="make-plan-body">
        <h3 className="plans-heading">Plans:</h3>
        <table className="make-plan-table"><tbody>{plans}</tbody></table>
        <button className="new-btn" onClick={this.handleNewPlanClick}><h3>Make A New Plan</h3></button>
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
    onPlansFetched: (userId) => dispatch(actionCreators.allPlansFetched(userId)),
    onNewPlan: () => dispatch(actionCreators.newPlan())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MakePlan)
