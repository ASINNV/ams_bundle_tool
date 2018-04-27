import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

// const theWindow=window,
//   theDoc=document,
//   theEle=theDoc.documentElement,
//   theBody=theDoc.getElementsByTagName('body')[0],
//   theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth,
//   theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;

// function apiCaller(path, initObj) {
//   if (initObj !== undefined) {
//     fetch(path, initObj)
//       .then(function(res) {
//         return res.json();
//       })
//       .then(function(data) {
//         console.log(data);
//       })
//       .catch(function(err) {
//         console.log(err, ' in the app.js apiCaller if block');
//       })
//   } else {
//     fetch(path)
//       .then(function(res) {
//         return res.json();
//       })
//       .then(function(data) {
//         console.log(data);
//       })
//       .catch(function(err) {
//         console.log(err, ' in the app.js apiCaller else block');
//       })
//   }
// }

class Landing extends Component {
  componentDidMount() {
    let appData = this.props.appReducer;
    appData.steps.forEach(function(step) {
      step.active = false;
      step.complete = false;
    });
    appData.currentStep = -1;
    this.props.setAppData(appData);
  }
  setStep() {
    let appData = this.props.appReducer;
    appData.steps[0].active = true;
    this.props.setAppData(appData);
  }
  render() {
    return (
      <div id="landing" className="page-body">
        <div className="heading-1">
          <h1>Welcome to the <span>AMS Bundle Tool</span>!</h1>
        </div>
        <div className="main-button">
          <Link onClick={this.setStep.bind(this)} to="/calibrate">OPEN APP</Link>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    appReducer: state.appReducer,
    projectReducer: state.projectReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProjectData: (dataObj) => {
      dispatch({
        type: "SET_PROJECT_DATA",
        payload: dataObj
      });
    },
    setAppData: (dataObj) => {
      dispatch({
        type: "SET_APP_DATA",
        payload: dataObj
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);