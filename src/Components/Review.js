import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'


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

  showAllGoals(e) {
    let goalsContainer = document.getElementById('review-goals-container');
    let clientContainer = document.getElementById('review-client-container');
    let panels = document.getElementsByClassName('info-panel');
    let target = e.target;
    while (!target.id || target.id.indexOf("-container") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }

    for (let i = (panels.length - 1); i >= 0; i--) {
      let panelRect = panels.item(i).getBoundingClientRect();
      console.log('panelRect-' + i, panelRect);

      panels.item(i).style.position = 'absolute';
      panels.item(i).style.width = panelRect.width + 'px';
      panels.item(i).style.top = Math.round(panelRect.top) + 'px';
    }

    if (target.id === clientContainer.id) {
      if (clientContainer.style.height === "36px" || clientContainer.style.height === "") {

        // let clientContainerRect = clientContainer.getBoundingClientRect();

        // GET AND SET CLIENT CONTAINER'S POSITION
        // clientContainer.style.width = clientContainerRect.width + 'px';
        // clientContainer.style.position = 'absolute';
        // clientContainer.style.top = Math.round(clientContainerRect.top) + 'px';

        // COLLAPSE GOALS WINDOW
        if (goalsContainer.style.height === "auto") {
          goalsContainer.style.height = "36px";
          // goalsContainer.style.position = 'relative';
          // goalsContainer.style.top = '';
          // goalsContainer.style.width = '';
        }

        // SET HEIGHT OF CLIENT CONTAINER
        setTimeout(function() { // set height after position
          clientContainer.style.height = "auto";
        }, 50);
      } else {

        // RESET CLIENT CONTAINER
        clientContainer.style.height = "36px";
        // clientContainer.style.position = 'relative';
        // clientContainer.style.top = '';
        // clientContainer.style.width = '';

        // goalsContainer.style.left = '';
      }
    } else if (target.id === goalsContainer.id) {
      if (goalsContainer.style.height === "36px" || goalsContainer.style.height === "") {

        // let goalsContainerRect = goalsContainer.getBoundingClientRect();

        // GET AND SET GOALS CONTAINER'S POSITION
        // goalsContainer.style.width = goalsContainerRect.width + 'px';
        // goalsContainer.style.position = 'absolute';
        // goalsContainer.style.top = Math.round(goalsContainerRect.top) + 'px';
        // goalsContainer.style.left = Math.round(goalsContainerRect.left) + 'px';

        // COLLAPSE CLIENT WINDOW
        if (clientContainer.style.height === "auto") {
          clientContainer.style.height = "36px";
          // clientContainer.style.position = 'relative';
          // clientContainer.style.top = '';
          // clientContainer.style.width = '';
        }

        // SET HEIGHT OF GOALS CONTAINER
        setTimeout(function() {
          goalsContainer.style.height = "auto";
        }, 50);
      } else {
        // RESET GOALS CONTAINER
        goalsContainer.style.height = "36px";
        // goalsContainer.style.position = 'relative';
        // goalsContainer.style.top = '';
        // goalsContainer.style.width = '';

        // goalsContainer.style.left = '';
      }
    }
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
                <div id="review-client-container" className="review-info-item-container" onClick={this.showAllGoals.bind(this)}>
                  <p className="review-info-item">{this.props.clientReducer.client.company || "No Company"}</p>
                  <p className="review-info-item">{this.props.clientReducer.client.name || "No Name"}</p>
                  <p className="review-info-item">{this.props.clientReducer.client.email || "No Email"}</p>
                  <p className="review-info-item">{this.props.clientReducer.client.phone || "No Phone"}</p>
                  <FontAwesomeIcon icon={faAngleDown} id="client-dropdown" className="dropper"/>
                </div>
              </div>
              <div id="" className="info-panel">
                <h3 className="goal-sidebar-heading">YOUR GOALS</h3>
                <div id="review-goals-container" className="review-info-item-container" onClick={this.showAllGoals.bind(this)}>
                  {this.props.clientReducer.client.goals.length > 0 ? this.props.clientReducer.client.goals.map((goal, i) => {
                    return <p key={i} className="review-info-item minor-emphasis">{goal.name}</p>;
                  }) : <p className="review-info-item minor-emphasis">None</p>}
                  {/* FONT AWESOME ICON HERE */}
                  <FontAwesomeIcon icon={faAngleDown} id="goal-dropdown" className="dropper"/>
                </div>
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