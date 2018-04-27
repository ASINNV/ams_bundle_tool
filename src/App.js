import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransitionGroup } from 'react-transition-group';
import Landing from "./Components/Landing";
import ClientInfo from "./Components/ClientInfo";
import Goals from "./Components/Goals";
import Bundles from "./Components/Bundles";

// import logo from './assets/ams_logo.png';


class ProgressBar extends Component {
  componentDidMount() {

  }
  render() {
    // let sections = [];
    // console.log(this.props.currentStep);
    //
    // let progressBar = document.getElementById('progress-bar');
    // let currentStep = this.props.currentStep;
    // this.props.steps.forEach(function(step, i, array) {
    //   let phase = document.createElement('div');
    //   phase.id = step.name.split(' ').join('').toLowerCase();
    //   phase.className = 'phase';
    //
    //   if (step.complete) {
    //     phase.style.backgroundColor = '#37a9ff';
    //     // phase.style.color = step.color;
    //   } else {
    //     phase.style.color = 'rgba(0, 0, 0, 0.25)';
    //   }
    //
    //   let phaseHeader = document.createElement('h1');
    //   phaseHeader.className = 'phase-header';
    //   // phaseHeader.innerText = "STEP " + (i + 1) + ": " + step.name;
    //
    //   let phaseStep = document.createElement('span');
    //   phaseStep.className = 'phase-step';
    //   phaseStep.innerText = "STEP " + (i + 1) + ": ";
    //
    //   let phaseName = document.createElement('span');
    //   phaseName.className = 'phase-name';
    //   phaseName.innerText = step.name;
    //
    //   phaseHeader.appendChild(phaseStep);
    //   phaseHeader.appendChild(phaseName);
    //
    //   let triangle = document.createElement('div');
    //   triangle.id = 'triangle-' + i;
    //   triangle.className = 'triangle';
    //
    //   if (step.complete && array[i + 1] && array[i + 1].complete === false) {
    //     triangle.style.borderTop = "40px solid transparent";
    //     triangle.style.borderLeft = "40px solid transparent";
    //     triangle.style.borderRight = "40px solid #fff";
    //     triangle.style.borderBottom = "40px solid #fff";
    //   } else if (step.complete && array[i + 1]) {
    //     triangle.style.borderTop = "40px solid transparent";
    //     triangle.style.borderLeft = "40px solid transparent";
    //     triangle.style.borderRight = "40px solid #37a9ff";
    //     triangle.style.borderBottom = "40px solid #37a9ff";
    //   }
    //
    //   if (currentStep === -1) {
    //     phase.style.width = '20%';
    //     phaseStep.style.color = "#555";
    //     phaseName.style.color = "#777";
    //   } else {
    //     if (i === currentStep) {
    //       phase.style.width = '32%';
    //       phaseStep.style.color = "#37a9ff";
    //       phaseName.style.color = '#aaa';
    //       phase.style.background = "#fff";
    //       triangle.style.borderTop = "40px solid transparent";
    //       triangle.style.borderLeft = "40px solid transparent";
    //       triangle.style.borderRight = "40px solid #222";
    //       triangle.style.borderBottom = "40px solid #222";
    //     } else if (i < currentStep) {
    //       phase.style.width = '17%';
    //       phaseStep.style.color = '#0076d1';
    //       phaseName.style.color = '#9ed5ff';
    //     } else {
    //       phase.style.width = '17%';
    //       phaseStep.style.color = "#555";
    //       phaseName.style.color = "#777";
    //     }
    //   }
    //
    //   phase.appendChild(phaseHeader);
    //   phase.appendChild(triangle);
    //   sections.push(phase);
    // });

    return(
      <div id="progress-bar">

        {this.props.steps.map(function(step, i, array) {
          {/*let phaseBg = '';*/}
          {/*let phaseColor = '';*/}
          let firstTriangleClassName = null;
          let secondTriangleClassName = null;
          let phaseClassName = null;
          let phaseStepClassName = null;
          let phaseNameClassName = null;


          if (step.complete && !step.active) {
            firstTriangleClassName = 'complete-first-triangle';
            secondTriangleClassName = 'complete-second-triangle';
            phaseClassName = 'complete-phase';
            phaseStepClassName = 'complete-phase-step';
            phaseNameClassName = 'complete-phase-name';
          } else if (!step.complete && step.active) {
            firstTriangleClassName = 'active-first-triangle';
            secondTriangleClassName = 'active-second-triangle';
            phaseClassName = 'active-phase';
            phaseStepClassName = 'active-phase-step';
            phaseNameClassName = 'active-phase-name';
          } else {
            firstTriangleClassName = 'incomplete-first-triangle';
            secondTriangleClassName = 'incomplete-second-triangle';
            phaseClassName = 'incomplete-phase';
            phaseStepClassName = 'incomplete-phase-step';
            phaseNameClassName = 'incomplete-phase-name';
          }

          return (
            <div id={step.name} className={"phase " + phaseClassName} key={i}>
              {(step.active && i !== 0) ? <div className={"triangle " + firstTriangleClassName}></div> : null}
              <h1 className="phase-header">
                <span className={"phase-step " + phaseStepClassName}>STEP {i + 1}: </span><span className={"phase-name " + phaseNameClassName}>{step.name}</span>
              </h1>
              {step.active ? <div className={"triangle " + secondTriangleClassName}></div> : null}
            </div>
          );

        })}

        {/*<div id="calibrate" className="phase">*/}
          {/*<h1 className="phase-header">*/}
            {/*<span className="phase-step">STEP 1: </span><span className="phase-name">Calibrate</span>*/}
          {/*</h1>*/}
          {/*<div id="triangle-0" className="triangle"></div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

class App extends Component {

  openMenu(e) {
    let targe = e.target;
    while (targe.className !== 'x-container') {
      targe = targe.parentNode;
    }
    let left = targe.childNodes[0].childNodes[0];
    let right = targe.childNodes[0].childNodes[1];
    if (left.className.indexOf(' left-x-arm') !== -1) {
      left.className = left.className.slice(0, left.className.indexOf(' left-x-arm'));
      right.className = right.className.slice(0, right.className.indexOf(' right-x-arm'));
    } else {
      left.className += ' left-x-arm';
      right.className += ' right-x-arm';
    }
  }
  render() {
    return (
      <Router>
        <div id="foundation">
          <div id="foundation-header">
            <div className="x-container" onClick={this.openMenu.bind(this)}>
              <div className="x">
                <p className="left-arm" />
                <p className="right-arm" />
              </div>
            </div>
            <div className="button-shadow">
              <p className="text-buttons">SUPPORT</p>
            </div>
          </div>
          {/*<img id="logo" src={logo} alt="And Moore Studios Logo" />*/}
          <Route render={({location}) => (
            <CSSTransitionGroup transitionName="transition" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} transitionAppear={true} transitionAppearTimeout={500}>
              <div key={location.pathname}>
                <Switch location={location}>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/calibrate" component={ClientInfo} />
                  <Route exact path="/personalize" component={Goals} />
                  <Route exact path="/decide" component={Bundles} />
                </Switch>
              </div>
            </CSSTransitionGroup>
          )} />
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
