import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import ClientInfo from "./Components/ClientInfo";

class ProgressBar extends Component {
  componentDidMount() {
    let progressBar = document.getElementById('progress-bar');
    let currentStep = this.props.currentStep;
    this.props.steps.forEach(function(step, i, array) {
      let phase = document.createElement('div');
      phase.id = step.name.split(' ').join('').toLowerCase();
      phase.className = 'phase';

      if (step.completed) {
        phase.style.backgroundColor = step.bgColor;
        // phase.style.color = step.color;
      } else {
        phase.style.color = 'rgba(0,0,0,0.25)';
      }

      let phaseHeader = document.createElement('h1');
      phaseHeader.className = 'phase-header';
      // phaseHeader.innerText = "STEP " + (i + 1) + ": " + step.name;

      let phaseStep = document.createElement('span');
      phaseStep.className = 'phase-step';
      phaseStep.innerText = "STEP " + (i + 1) + ": ";

      let phaseName = document.createElement('span');
      phaseName.className = 'phase-name';
      phaseName.innerText = step.name;

      phaseHeader.appendChild(phaseStep);
      phaseHeader.appendChild(phaseName);

      let triangle = document.createElement('div');
      triangle.id = 'triangle-' + i;
      triangle.className = 'triangle';

      if (step.completed && array[i + 1] && array[i + 1].completed === false) {
        if (array[i + 1]) {
          triangle.style.borderTop = "40px solid transparent";
          triangle.style.borderLeft = "40px solid transparent";
          triangle.style.borderRight = "40px solid #405ba8";
          triangle.style.borderBottom = "40px solid #405ba8";
        }
      } else if (step.completed && array[i + 1]) {
        if (array[i + 1]) {
          triangle.style.borderTop = "40px solid transparent";
          triangle.style.borderLeft = "40px solid transparent";
          triangle.style.borderRight = "40px solid " + array[(i + 1)].bgColor;
          triangle.style.borderBottom = "40px solid " + array[(i + 1)].bgColor;
        }
      }

      if (i === currentStep) {
        phase.style.width = '32%';
        phaseStep.style.color = '#fff';
        phaseName.style.color = step.color;
      } else {
        phase.style.width = '17%';
        phaseStep.style.color = '#333';
        phaseName.style.color = step.color;
      }

      phase.appendChild(phaseHeader);
      phase.appendChild(triangle);
      progressBar.appendChild(phase);
      // divs.push(phase);
      // console.log(divs);
    });
  }
  render() {
    return(
      <div id="progress-bar"></div>
    );
  }
}

class App extends Component {
  componentDidMount() {
    // let stream = document.getElementById('stream');
    // stream.style.transform = 'translateY(46.8%)';
  }
  render() {
    return (
      <Router>
        <div id="foundation">
          <div id="foundation-header">
            <p>LOGO</p>
            <p className="text-buttons">CONTACT</p>
          </div>
          <Route exact path="/" component={ClientInfo} />
          {/*<span className="center-point" />*/}
          <div id="pb-hover-area">
            <ProgressBar steps={this.props.progress.steps} currentStep={this.props.progress.currentStep}/>
          </div>
        </div>
      </Router>
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
