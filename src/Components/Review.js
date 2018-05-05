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


class Review extends Component {

  componentDidMount(e) {

    // SET CURRENT STEP TO 1
    this.props.setCurrentStep(3); // sets current step to 1

  }

  render() {
    return (
      <div id="goals-body" className="page-body">
        <div id="goals-torso">

        </div>
        <div id="goals-shoulder">
          <div id="container-0" className="container">

            <div id="" className="info-section">
              <div className="info-panel">
                <h1 className="heading noselect">Review Your Order</h1>
              </div>
              <div id="" className="info-panel">
                <h3 className="goal-sidebar-heading">YOUR INFO</h3>
                <p className="review-info-item">{this.props.clientReducer.client.company || "No Company"}</p>
                <p className="review-info-item">{this.props.clientReducer.client.name || "No Name"}</p>
                <p className="review-info-item">{this.props.clientReducer.client.email || "No Email"}</p>
                <p className="review-info-item">{this.props.clientReducer.client.phone || "No Phone"}</p>
              </div>
              <div id="" className="info-panel">
                <h3 className="goal-sidebar-heading">YOUR GOALS</h3>
                {this.props.clientReducer.client.goals.length > 0 ? this.props.clientReducer.client.goals.map((goal, i) => {
                  return <p key={i} className="review-info-item minor-emphasis">{goal.name}</p>;
                }) : <p className="review-info-item minor-emphasis">None</p>}
              </div>
              <div id="" className="info-panel">
                <h3 className="goal-sidebar-heading">BUNDLE</h3>
                <p className="review-info-item minor-emphasis">{this.props.clientReducer.project.bundleName || "None"}</p>
              </div>
              <div id="" className="info-panel">
                <h3 className="goal-sidebar-heading">TOTAL</h3>
                <p className="review-info-item emphasis">{this.props.clientReducer.project.total || "$0"}</p>
              </div>
              <Link to="/capitalize" className="buttons continue-button">
                <div id="button-1" className="button-bg"></div>
                <p id="button-text-1" className="button-text"><span role="img" aria-label="lock">&#x1f512;</span> BUY NOW &rarr;</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);