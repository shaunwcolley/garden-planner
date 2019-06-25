import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
      if(!this.props.isAuth) {
        this.props.history.push('/');
      };
    };

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    };
  };

  const mapStateToProps = (state) => {
    return {
      isAuth: state.isAuth,
    }
  };

  return connect(mapStateToProps)(Authenticate);
};
