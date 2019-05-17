import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

class ViewPlan extends Component {
  constructor (props) {
    super (props)

    this.state = {
      plantsToChoose: this.props.plants,
      plantsInPlan: this.props.cells,
      table: ''
    }
  }

  componentDidMount(){
    this.props.onPlanFetch(this.props.match.url)
  }

  render(){
    console.log(this.props.plan.cells)
    return (
      <div>Plan</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    plan: state.plan
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlanFetch: (planRoute) => dispatch(actionCreators.onePlanFetched(planRoute))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewPlan)
