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
    // let appData = this.props.appReducer;
    // appData.steps.forEach(function(step, i, steps) {
    //   if (step === steps[0]) {
    //     step.active = false;
    //     step.complete = true;
    //   } else if (step === steps[1]) {
    //     step.active = true;
    //     step.complete = false;
    //   } else {
    //     step.active = false;
    //     step.complete = false;
    //   }
    // });

    // SET CURRENT STEP TO 1
    this.props.setCurrentStep(1); // sets current step to 1

    // let goals = document.getElementById('goals-body');
    // goals.style.transition = "transform .5s ease-in-out";
    // setTimeout(function() {
    //   goals.style.transform = "translateX(0)";
    // }, 10);

    // let context = this;
    // function nextPage() {
    //   context.props.history.push('/goals');
    // }
    // setTimeout(nextPage, 500);
  }

  render() {
    return (
      <div id="goals-body" className="page-body">
        <div id="goals-torso">

        </div>
        <div id="goals-shoulder">
          <div id="container-0" className="container">

            <div id="stats" className="">
              <div id="stat-panel">
                <h3 className="goal-sidebar-heading">COMPANY STATS</h3>
                <div id="graph">
                  {this.props.sessionReducer.client.stats.map((stat, i) => {
                    return (
                      <div className="stat-info" key={i}>
                        <h4 className="stat-name">{stat.name}</h4>
                        <div className="stat" style={{width: stat.value + '%'}}></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div id="goal-info" className="">
              <div id="" className="goal-info-panel">
                <h3 className="goal-sidebar-heading">GOAL NAME</h3>
                <p className="goal-sidebar-name">Increase my reach</p>
              </div>
              <div id="" className="goal-info-panel">
                <h3 className="goal-sidebar-heading">GOAL DESC</h3>
                <p className="goal-sidebar-desc overflowing">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in arcu ornare, fermentum urna in, aliquet orci. Donec posuere mi quis felis sollicitudin vulputate. Sed ullamcorper neque ac nulla iaculis, sit amet cursus nibh interdum.</p>
              </div>
            </div>
            <div className="cards">
              <Link to="/decide" className="buttons">
                <div id="button-1" className="button-bg"></div>
                <span id="button-text-1" className="button-text">next step &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    appReducer: state.appReducer,
    sessionReducer: state.sessionReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCustomerData: (dataObj) => {
      dispatch({
        type: "SET_CUSTOMER_DATA",
        payload: dataObj
      });
    },
    setClientName: (name) => {
      dispatch({
        type: "SET_CLIENT_NAME",
        payload: name
      });
    },
    setClientCompany: (company) => {
      dispatch({
        type: "SET_CLIENT_COMPANY",
        payload: company
      });
    },
    setClientEmail: (email) => {
      dispatch({
        type: "SET_CLIENT_EMAIL",
        payload: email
      });
    },
    setClientPhone: (phone) => {
      dispatch({
        type: "SET_CLIENT_PHONE",
        payload: phone
      });
    },
    setClientDiscount: (discount) => {
      dispatch({
        type: "SET_CLIENT_DISCOUNT",
        payload: discount
      });
    },
    setAppData: (dataObj) => {
      dispatch({
        type: "SET_APP_DATA",
        payload: dataObj
      });
    },
    setChosenBundle: (bundleNumber) => {
      dispatch({
        type: "SET_CHOSEN_BUNDLE",
        payload: bundleNumber
      });
    },
    setCurrentQuestion: (currentQuestion) => {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: currentQuestion
      });
    },
    setCurrentStep: (step) => {
      dispatch({
        type: "SET_CURRENT_STEP",
        payload: step
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);