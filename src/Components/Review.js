import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';


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
    let clickedContainer = null;
    let otherContainer = null;

    // SET TARGET VARIABLE TO ELEMENT WITH '-container' IN ITS ID
    let target = e.target;
    while (!target.id || target.id.indexOf("-container") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }

    // SET ALL PANELS TO POSITION ABSOLUTE
    for (let i = (panels.length - 1); i >= 0; i--) {
      let panelRect = panels.item(i).getBoundingClientRect();

      panels.item(i).style.position = 'absolute';
      panels.item(i).style.width = panelRect.width + 'px';
      panels.item(i).style.top = Math.round(panelRect.top) + 'px';
    }

    if (target.id === clientContainer.id && clientContainer.childNodes.length > 1) { // if target's ID is equal to the clientContainer element's ID and if clientContainer contains items

      // SET CLICKED CONTAINER VARIABLE AND OTHER CONTAINER VARIABLE FOR DROP-DOWN ARROW FLIP AT END OF FUNCTION
      clickedContainer = clientContainer;
      otherContainer = goalsContainer;

      if (clientContainer.style.height === "37px" || clientContainer.style.height === "") {

        // COLLAPSE GOALS WINDOW
        if (goalsContainer.style.height === "auto") {
          goalsContainer.style.height = "37px";
        }

        // SET HEIGHT OF CLIENT CONTAINER
        clientContainer.style.height = "auto";
      } else {

        // RESET CLIENT CONTAINER
        clientContainer.style.height = "37px";
      }
    } else if (target.id === goalsContainer.id && goalsContainer.childNodes.length > 1) { // if target's ID is equal to the goalsContainer element's ID and if goalsContainer contains items

      // SET CLICKED CONTAINER VARIABLE AND OTHER CONTAINER VARIABLE FOR DROP-DOWN ARROW FLIP AT END OF FUNCTION
      clickedContainer = goalsContainer;
      otherContainer = clientContainer;

      if (goalsContainer.style.height === "37px" || goalsContainer.style.height === "") {

        // COLLAPSE CLIENT WINDOW
        if (clientContainer.style.height === "auto") {
          clientContainer.style.height = "37px";
        }

        // SET HEIGHT OF GOALS CONTAINER
        goalsContainer.style.height = "auto";
      } else {
        // RESET GOALS CONTAINER
        goalsContainer.style.height = "37px";
      }
    }
    // IF CLICKED CONTAINER IS NOT NULL AND THERE ARE REVIEW-INFO-ITEMS IN THE CLICKED CONTAINER
    if (clickedContainer !== null && clickedContainer.childNodes.length > 1) {
      // FLIPS THE DROP-DOWN ARROW
      if (clickedContainer.lastElementChild.style.transform === "") { // if no transform is set
        clickedContainer.lastElementChild.style.transform = "rotate(-180deg)"; // rotate dropdown arrow 180 degrees
      } else { // however, if transform is set
        clickedContainer.lastElementChild.style.transform = ""; // reset transform property to an empty string
      }
      if (otherContainer.lastElementChild.style.transform === 'rotate(-180deg)') {
        otherContainer.lastElementChild.style.transform = ""; // reset transform property to an empty string
      }
    }
  }

  editClientInfo(e) {
    e.stopPropagation();
    console.log('Edit button hit!');
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
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">YOUR INFO</h3>
                  <FontAwesomeIcon icon={faPencilAlt} id="0-edit" className="fontawesome-pencil" onClick={this.editClientInfo.bind(this)}/>
                </div>
                <div id="review-client-container" className="review-info-item-container" onClick={this.showAllGoals.bind(this)}>
                  {this.props.clientReducer.client.company !== null ? <p className="review-info-item">{this.props.clientReducer.client.company}</p> : null}
                  {this.props.clientReducer.client.name !== null ? <p className="review-info-item">{this.props.clientReducer.client.name}</p> : null}
                  {this.props.clientReducer.client.email !== null ? <p className="review-info-item">{this.props.clientReducer.client.email}</p> : null}
                  {this.props.clientReducer.client.phone !== null ? <p className="review-info-item last-review-info-item">{this.props.clientReducer.client.phone}</p> : null}
                  <FontAwesomeIcon icon={faAngleDown} id="client-dropdown" className="dropper"/>
                </div>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">YOUR GOALS</h3>
                  <FontAwesomeIcon icon={faPencilAlt} id="1-edit" className="fontawesome-pencil" onClick={this.editClientInfo.bind(this)}/>
                </div>
                <div id="review-goals-container" className="review-info-item-container" onClick={this.showAllGoals.bind(this)}>
                  {this.props.clientReducer.client.goals.length > 0 ? this.props.clientReducer.client.goals.map(function(goal, i, goals) {
                    if (i === goals.length - 1) {
                      return <p key={i} className="review-info-item last-review-info-item">{goal.name}</p>;
                    } else {
                      return <p key={i} className="review-info-item">{goal.name}</p>;
                    }
                  }) : null}
                  {/* FONT AWESOME ICON HERE */}
                  <FontAwesomeIcon icon={faAngleDown} id="goal-dropdown" className="dropper"/>
                </div>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">YOUR BUNDLE</h3>
                  <FontAwesomeIcon icon={faPencilAlt} id="2-edit" className="fontawesome-pencil" onClick={this.editClientInfo.bind(this)}/>
                </div>
                <p className="review-info-item minor-emphasis">{this.props.clientReducer.project.bundleName || "None"}</p>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">TOTAL</h3>
                </div>
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