import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import ClientInfo from "./Components/ClientInfo";


class App extends Component {

  render() {
    return (
      <Router>
        <div id="body-double">
          <Route exact path="/" component={ClientInfo} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    client: state.clientReducer,
    project: state.projectReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClientName: (name) => {
      dispatch({
        type: "SET_CLIENT_NAME",
        payload: name
      });
    },
    setBundle: (number) => {
      dispatch({
        type: "SET_BUNDLE",
        payload: number
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
