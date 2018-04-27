import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// const theWindow=window,
//   theDoc=document,
//   theEle=theDoc.documentElement,
//   theBody=theDoc.getElementsByTagName('body')[0],
//   theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth,
//   theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;


class Goals extends Component {

  componentDidMount(e) {
    let steps = this.props.progress.steps;
    steps.forEach(function(step, i, steps) {
      if (step === steps[0]) {
        step.active = false;
        step.complete = true;
      } else if (step === steps[1]) {
        step.active = true;
        step.complete = false;
      } else {
        step.active = false;
        step.complete = false;
      }
    });
    this.props.setProgress(steps);

    let goals = document.getElementById('goals-body');
    goals.style.transition = "transform .5s ease-in-out";
    setTimeout(function() {
      goals.style.transform = "translateX(0)";
    }, 10);
    // let context = this;
    // function nextPage() {
    //   context.props.history.push('/goals');
    // }
    // setTimeout(nextPage, 500);
  }

  render() {
    return (
      <div id="goals-body">
        <div id="goals-torso">

        </div>
        <div id="goals-shoulder">
          <div id="container-0" className="container">
            <div id="goals-sidebar" className="cards">
              <div id="goal-info-1" className="goal-info">
                <p className="name">STARTUP</p>
                <p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>
                <Link to="/decide" className="buttons">
                  <div id="button-1" className="button-bg"></div>
                  <span id="button-text-1" className="button-text">select</span>
                </Link>
              </div>
            </div>
          </div>
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
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);