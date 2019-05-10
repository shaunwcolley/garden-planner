import React, { Component } from 'react';


export class MakePlan extends Component {

  handleNewPlanClick = () => {
    this.props.history.push('/plan-size')
  }
  handleUseOldClick = () => {
    alert('there are no old plans, make a new one!')
  }

  render(){
    return(
      <div>
        Make a Plan:
        <p><button onClick={this.handleNewPlanClick}>Make New Plan</button></p>
        <p><button onClick={this.handleUseOldClick}>Use Existing Plan</button></p>
      </div>
    )
  }
}
