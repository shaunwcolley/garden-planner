import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/App.css';


class App extends Component {

  render() {
    if(!this.props.isAuth) {
      return (
        <div className="home-body">
          <h4>Howdy, this is a garden planner app. Click on <u>Make Plan</u> above to make new plan or view and update existing plans.</h4>
        </div>
      )
    }
    return <div><h3>Dashboard will go here.</h3></div>
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
  }
}

export default connect(mapStateToProps)(App);
