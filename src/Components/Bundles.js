import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// const theWindow=window,
//   theDoc=document,
//   theEle=theDoc.documentElement,
//   theBody=theDoc.getElementsByTagName('body')[0],
//   theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth,
//   theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;


class Bundles extends Component {

  componentDidMount() {

    // SET CURRENT STEP TO 2
    this.props.setCurrentStep(2); // sets current step to 2
  }
  setBundle(e) {
    let bundles = this.props.appReducer.bundles;
    let bundle = null;
    // SET TARGET VARIABLE TO ELEMENT WITH '-container' IN ITS ID
    let target = e.target;
    while (!target.id || target.id.indexOf("card-") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }
    switch (Number(target.id.slice(target.id.search(/\d/g)))) {
      case 1:
        bundle = bundles[0];
        break;
      case 2:
        bundle = bundles[1];
        break;
      case 3:
        bundle = bundles[2];
        break;
      case 4:
        bundle = bundles[3];
        break;
      default:
        console.log('fell to the default on the bundles.js page.');
    }
    this.props.setClientBundle(bundle);
  }

  render() {
    let bundles = this.props.appReducer.bundles;

    return (
      <div id="bundles-body" className="page-body">
        <div id="container-0" className="container">
          {bundles.map((bundle, i) => {
            return (
              <div id={"card-" + bundle.id} className="cards" key={i}>
                <div id={"info-" + bundle.id} className="info">
                  <p className="name">{bundle.name.toUpperCase()}</p>
                  <p className="desc">{bundle.description}</p>
                  <Link to="/review" className="buttons" onClick={this.setBundle.bind(this)}>
                    <div id={"button-" + bundle.id} className="button-bg"></div>
                    <span id={"button-text-" + bundle.id} className="button-text">select</span>
                  </Link>
                </div>
              </div>
            );
          })}
          {/*<div id="card-1" className="cards">*/}
            {/*<div id="info-1" className="info">*/}
              {/*<p className="name">STARTER</p>*/}
              {/*<p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>*/}
              {/*<Link to="/review" className="buttons" onClick={this.setBundle.bind(this)}>*/}
                {/*<div id="button-1" className="button-bg"></div>*/}
                {/*<span id="button-text-1" className="button-text">select</span>*/}
              {/*</Link>*/}
            {/*</div>*/}
          {/*</div>*/}

          {/*<div id="card-2" className="cards">*/}
            {/*<div id="info-2" className="info">*/}
              {/*<p className="name">ACCELERATOR</p>*/}
              {/*<p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>*/}
              {/*<Link to="/review" className="buttons" onClick={this.setBundle.bind(this)}>*/}
                {/*<div id="button-1" className="button-bg"></div>*/}
                {/*<span id="button-text-1" className="button-text">select</span>*/}
              {/*</Link>*/}
            {/*</div>*/}
          {/*</div>*/}

          {/*<div id="card-3" className="cards">*/}
            {/*<div id="info-3" className="info">*/}
              {/*<p className="name">TURBO</p>*/}
              {/*<p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>*/}
              {/*<Link to="/review" className="buttons" onClick={this.setBundle.bind(this)}>*/}
                {/*<div id="button-1" className="button-bg"></div>*/}
                {/*<span id="button-text-1" className="button-text">select</span>*/}
              {/*</Link>*/}
            {/*</div>*/}
          {/*</div>*/}

          {/*<div id="card-4" className="cards">*/}
            {/*<div id="info-4" className="info">*/}
              {/*<p className="name">CUSTOM</p>*/}
              {/*<p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>*/}
              {/*<Link to="/review" className="buttons" onClick={this.setBundle.bind(this)}>*/}
                {/*<div id="button-1" className="button-bg"></div>*/}
                {/*<span id="button-text-1" className="button-text">select</span>*/}
              {/*</Link>*/}
            {/*</div>*/}
          {/*</div>*/}
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
    setBundles: (bundles) => {
      dispatch({
        type: "SET_CURRENT_GOAL",
        payload: bundles
      });
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);