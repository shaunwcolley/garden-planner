import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import PlanSize from './components/PlanSize'

class App extends Component {

  render() {

    return (
      <div>
        <h5>Howdy, this is a garden planner app. Just hold on plants will be here eventually.</h5>

        <PlanSize />
      </div>
    )
  }
}

export default App;
