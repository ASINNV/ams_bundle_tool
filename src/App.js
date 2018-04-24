import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import ClientInfo from "./Components/ClientInfo";


class App extends Component {
  componentDidMount() {
    // let stream = document.getElementById('stream');
    // stream.style.transform = 'translateY(46.8%)';
  }
  render() {
    return (
      <Router>
        <div id="foundation">
          <div className="foundation-header">
            <p>LOGO</p>
            <p className="text-buttons">CONTACT</p>
          </div>
          <Route exact path="/" component={ClientInfo} />
          {/*<span className="center-point" />*/}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    client: state.clientReducer,
    project: state.projectReducer,
    question: state.questionReducer
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
