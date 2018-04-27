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
    let steps = this.props.progress.steps;
    steps.forEach(function(step, i, steps) {
      step.active = false;
      step.complete = false;
    });
    this.props.setProgress(steps);
  }
  setStep() {
    let steps = this.props.progress.steps;
    steps[0].active = true;
    this.props.setProgress(steps);
  }
  render() {
    return (
      <div id="landing">
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
    client: state.clientReducer,
    project: state.projectReducer,
    question: state.questionReducer,
    progress: state.progressReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClientObj: (clientObj) => {
      dispatch({
        type: "SET_CLIENT_OBJ",
        payload: clientObj
      });
    },
    setBundle: (number) => {
      dispatch({
        type: "SET_BUNDLE",
        payload: number
      });
    },
    setQuestion: (index) => {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: index
      });
    },
    setProgress: (stepsObj) => {
      dispatch({
        type: "SET_PROGRESS",
        payload: stepsObj
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);