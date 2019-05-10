import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Draggable from './components/Draggable'

class App extends Component {

  render() {

    return (
      <div>
        Howdy, this is a garden planner app. Just hold on plants will be here eventually.

        <Draggable/>
      </div>
    )
  }
}

export default App;
