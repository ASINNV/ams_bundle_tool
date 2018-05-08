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

    this.props.setCurrentStep(-1);

  }
  render() {
    return (
      <div id="landing" className="page-body">
        <div className="heading-1">
          <h2>Welcome to the</h2>
          <h1>AMS Bundle Tool</h1>
        </div>
        <div>
          <Link to="/calibrate" className="main-button">OPEN APP</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);