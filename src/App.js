import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
// import { CSSTransitionGroup } from 'react-transition-group';
import Landing from "./Components/Landing";
import ClientInfo from "./Components/ClientInfo";
import Goals from "./Components/Goals";
import Bundles from "./Components/Bundles";
import Review from "./Components/Review";
import Confirmation from "./Components/Confirmation";
import NoMatch from "./Components/NoMatch";

// import logo from './assets/ams_logo.png';

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

class ProgressBar extends Component {
  componentDidMount() {
  }
  render() {
    let currentStep = this.props.currentStep;
    let newArray = this.props.steps.map(function(step, i) {
      let firstTriangleClassName = null;
      let secondTriangleClassName = null;
      let phaseClassName = "";
      let phaseStepClassName = null;
      let phaseNameClassName = null;


      if (currentStep === -1) {
        firstTriangleClassName = ' incomplete-first-triangle';
        secondTriangleClassName = ' incomplete-second-triangle';
        // phaseClassName = 'incomplete-phase';
        phaseStepClassName = ' incomplete-phase-step';
        phaseNameClassName = ' incomplete-phase-name';
      } else {
        if (i < currentStep) {
          firstTriangleClassName = ' complete-first-triangle';
          secondTriangleClassName = ' complete-second-triangle';
          phaseClassName = ' complete-phase';
          phaseStepClassName = ' complete-phase-step';
          phaseNameClassName = ' complete-phase-name';
        } else if (i === currentStep) {
          firstTriangleClassName = ' active-first-triangle';
          secondTriangleClassName = ' active-second-triangle';
          phaseClassName = ' active-phase';
          phaseStepClassName = ' active-phase-step';
          phaseNameClassName = ' active-phase-name';
        } else {
          firstTriangleClassName = ' incomplete-first-triangle';
          secondTriangleClassName = ' incomplete-second-triangle';
          phaseClassName = ' incomplete-phase';
          phaseStepClassName = ' incomplete-phase-step';
          phaseNameClassName = ' incomplete-phase-name';
        }
      }

      return (
        <Link to={"/" + step.toLowerCase()} id={step} className={"phase" + phaseClassName} key={i}>
          {(i === currentStep && i !== 0) ? <div className={"triangle" + firstTriangleClassName}></div> : null}
          <h1 className="phase-header">
            <span className={"phase-step" + phaseStepClassName}>STEP {i + 1}: </span><span className={"phase-name" + phaseNameClassName}>{i<currentStep ? "COMPLETE" : step}</span>
          </h1>
          {i === currentStep && currentStep !== 4 ? <div className={"triangle" + secondTriangleClassName}></div> : null}
        </Link>
      );

    });

    return(
      <div id="progress-bar">

        {newArray}

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


// function getGoals(myFunc) {
//   fetch('/api/goals')
//     .then(function(res) {
//       return res.json();
//     })
//     .then(function(data) {
//       console.log(data);
//       return data;
//     })
//     .catch(function(err) {
//       console.log(err, ' in the app.js apiCaller else block');
//     })
// }


class App extends Component {
  // BEFORE COMPONENT MOUNTS, DO THE FOLLOWING:
  componentWillMount() {

    // FETCH GOALS FROM DATABASE AND SET LOCAL APP GOALS TO THEM
    let setGoals = this.props.setGoals;
    let setCategoryGoals = this.props.setCategoryGoals;
    let setCurrentCategory = this.props.setCurrentCategory;
    fetch('/api/goals')
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
        setGoals(data);

        // let categoryGoals = data.filter((goal) => {
        //   if (goal.category === "CREATE") {
        //     return goal;
        //   } else {
        //     return false;
        //   }
        // });

        setCategoryGoals(data);
        setCurrentCategory("ALL");

        return data;
      })
      .catch(function(err) {
        console.log(err, ' in the app.js apiCaller else block');
      });

    // FETCH BUNDLES FROM DATABASE AND SET LOCAL APP BUNDLES TO THEM
    let setBundles = this.props.setBundles;
    fetch('/api/bundles')
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log('bundles should be here: ', data);
        setBundles(data);
        return data;
      })
      .catch(function(err) {
        console.log(err, ' in the app.js apiCaller else block');
      });
  }

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

          {/*<Route render={({location}) => (*/}
            {/*<CSSTransitionGroup transitionName="transition" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>*/}
              {/*<div key={location.pathname}>*/}
                {/*<Switch location={location}>*/}
                  {/*<Route exact path="/" component={Landing} />*/}
                  {/*<Route exact path="/calibrate" component={ClientInfo} />*/}
                  {/*<Route exact path="/personalize" component={Goals} />*/}
                  {/*<Route exact path="/decide" component={Bundles} />*/}
                {/*</Switch>*/}
              {/*</div>*/}
            {/*</CSSTransitionGroup>*/}
          {/*)} />*/}
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/calibrate" component={ClientInfo} />
            <Route exact path="/personalize" component={Goals} />
            <Route exact path="/decide" component={Bundles} />
            <Route exact path="/review" component={Review} />
            <Route exact path="/capitalize" component={Confirmation} />
            <Route component={NoMatch} />
          </Switch>

          {/*<span className="center-point" />*/}
          <div id="pb-hover-area">
            <ProgressBar steps={this.props.appReducer.steps} currentStep={this.props.appReducer.currentStep}/>
          </div>
        </div>
      </Router>
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
    setGoals: (goalsArray) => {
      dispatch({
        type: "SET_GOALS",
        payload: goalsArray
      });
    },
    setCurrentGoal: (goal) => {
      dispatch({
        type: "SET_CURRENT_GOAL",
        payload: goal
      });
    },
    setCategoryGoals: (goalsArray) => {
      dispatch({
        type: "SET_CATEGORY_GOALS",
        payload: goalsArray
      });
    },
    setCurrentCategory: (category) => {
      dispatch({
        type: "SET_CURRENT_CATEGORY",
        payload: category
      });
    },
    setBundles: (bundles) => {
      dispatch({
        type: "SET_BUNDLES",
        payload: bundles
      });
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
