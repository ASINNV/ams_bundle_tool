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
    let clientGoals = this.props.clientReducer.client.goals;
    let cards = document.getElementsByClassName('goal-card');

    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < clientGoals.length; j++) {
        let cardId = Number(cards.item(i).id.slice(Number(cards.item(i).id.search(/\d/g))));
        let goalId = Number(clientGoals[j].id) - 1;

        if (cardId === goalId) {
          let checkmark = document.createElement('p');
          checkmark.className = 'checkmark';
          cards.item(i).appendChild(checkmark);
          console.log(cardId, " - cardId inside block");
          console.log(goalId, " - goalId inside block");
        }
        // console.log(cardId, " - outside block");
        // console.log(goalId, " - outside block");
      }
    }


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
  addGoal(e) {
    let appReducer = this.props.appReducer;
    let currentGoal = appReducer.currentGoal;
    let clientGoals = this.props.clientReducer.client.goals;

    // SET TARGET EQUAL TO UPPERMOST PARENT
    let target = e.target;
    while (target.id.indexOf("goal-") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }

    let checkmark = document.createElement('p');
    checkmark.className = 'checkmark';



    if (target.lastChild.className === "checkmark") {
      target.removeChild(target.lastChild);
    } else {
      target.appendChild(checkmark);
    }

    // FUNCTION TO DETERMINE IF SAVED CLIENT GOALS ALREADY INCLUDES CLICKED GOAL
    let count = 0; // element match count
    for (let i = 0; i < clientGoals.length; i++) { // iterates over stored client goals
      if (clientGoals[i] === this.props.appReducer.goals[currentGoal]) { // if clicked goal is found in client goals already
        count++; // increment count to indicate a match
      }
    }

    // ADDS CLICKED GOAL TO SAVED CLIENT GOALS IF NOT ALREADY IN IT, OTHERWISE LOGS CLIENT GOALS
    if (count === 0) { // if clicked goal isn't already in saved client goals
      clientGoals.push(appReducer.goals[currentGoal]); // add clicked goal to working copy of client goals
      this.props.setClientGoals(clientGoals); // overwrite stored client goals with working copy
    } else {
      let newClientGoals = clientGoals.filter((goal) => {
        if (goal === appReducer.goals[currentGoal]) {
          console.log('awesome');
        } else {
          return goal;
        }
        return false;
      });
      if (newClientGoals[0] === undefined) {
        this.props.setClientGoals([]); // overwrite stored client goals with empty array
      } else {
        this.props.setClientGoals(newClientGoals); // overwrite stored client goals with working copy
      }
    }

  }
  highlightGoal(e) {
    let target = e.target;

    while (target.id.indexOf("goal-") === -1) {
      target = target.parentNode;
    }

    let currentGoal = Number(target.id.slice(target.id.search(/\d/g)));

    if (this.props.appReducer.currentGoal !== currentGoal) {
      this.props.setCurrentGoal(currentGoal);
    }

  }
  render() {
    return (
      <div id="goals-body" className="page-body">



        <div id="goals-torso">

          {this.props.appReducer.goals.map((goal, i) => {
            return (
              <div id={"goal-" + (goal.id - 1)} key={i} className="goal-card" onClick={this.addGoal.bind(this)} onMouseEnter={this.highlightGoal.bind(this)}>
                <p className="goal-heading">{goal.name}</p>
              </div>
            );
          })}

        </div>



        <div id="goals-shoulder">
          <div id="container-0" className="container">
            <div className="info-section">
              <div className="info-panel">
                <h1 className="heading noselect">Pick Your Goals</h1>
              </div>
              <div className="info-panel">
                <div id="stats" className="">
                  <div id="stat-panel">
                    <div className="goal-sidebar-heading-container">
                      <h3 className="goal-sidebar-heading">COMPANY STATS</h3>
                    </div>
                    <div id="graph">
                      {this.props.clientReducer.client.stats.map((stat, i) => {
                        return (
                          <div className="stat-info" key={i}>
                            <h4 className="stat-name">{stat.name}</h4>
                            <div className="stat-case">
                              <div className="stat" style={{width: (stat.value ? stat.value + '%' : '0')}}></div>
                              <div id={"additional-stat-" + i} className="additional-stat"></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">GOAL NAME</h3>
                </div>
                <p className="goal-sidebar-name">{this.props.appReducer.currentGoal !== null ? this.props.appReducer.goals[this.props.appReducer.currentGoal].name : "N/A"}</p>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">GOAL DESC</h3>
                </div>
                <p className="goal-sidebar-desc overflowing">{this.props.appReducer.currentGoal !== null ? this.props.appReducer.goals[this.props.appReducer.currentGoal].description : "Mouse over a goal to see its description here."}</p>
              </div>
              <Link to="/decide" className="buttons continue-button">
                <div id="button-1" className="button-bg"></div>
                <p id="button-text-1" className="button-text">next step &rarr;</p>
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
    clientReducer: state.clientReducer
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
    setClientBundle: (bundle) => {
      dispatch({
        type: "SET_CLIENT_BUNDLE",
        payload: bundle
      });
    },
    setClientGoals: (goals) => {
      dispatch({
        type: "SET_CLIENT_GOALS",
        payload: goals
      });
    },
    setClientStats: (stats) => {
      dispatch({
        type: "SET_CLIENT_STATS",
        payload: stats
      });
    },
    setAppData: (dataObj) => {
      dispatch({
        type: "SET_APP_DATA",
        payload: dataObj
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
    },
    setCurrentGoal: (goal) => {
      dispatch({
        type: "SET_CURRENT_GOAL",
        payload: goal
      });
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);