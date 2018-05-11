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

function phoneFormat(input) {
  input = input.replace(/\D/g, '');
  input = input.substring(0, 10);
  var size = input.length;

  if (size === 0) {
  } else if (size < 4) {
    input = '(' + input.substring(0, 3);
  } else if (size < 7) {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
  } else {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + '-' + input.substring(6, 10);
  }
  return input;
}


class Review extends Component {

  componentDidMount(e) {

    // SET CURRENT STEP TO 1
    this.props.setCurrentStep(3); // sets current step to 1

  }

  showAllItems(e) {
    let goalsContainer = document.getElementById('review-goals-container');
    let clientContainer = document.getElementById('review-client-container');
    let clientShowAll = document.getElementById('client-show-all');
    let goalsShowAll = document.getElementById('goal-show-all');
    let panels = document.getElementsByClassName('info-panel');
    let clickedContainer = null;
    let otherContainer = null;
    let clickedShowAll = null;
    let otherShowAll = null;

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

    if (target.id === clientContainer.id && clientContainer.childNodes.length > 2) { // if target's ID is equal to the clientContainer element's ID and if clientContainer contains items

      // SET CLICKED CONTAINER VARIABLE AND OTHER CONTAINER VARIABLE FOR DROP-DOWN ARROW FLIP AT END OF FUNCTION
      clickedContainer = clientContainer;
      otherContainer = goalsContainer;
      clickedShowAll = clientShowAll;
      otherShowAll = goalsShowAll;

      if (clientContainer.style.height === "45px" || clientContainer.style.height === "") {

        // COLLAPSE GOALS WINDOW
        if (goalsContainer.style.height === "auto") {
          goalsContainer.style.height = "45px";
          goalsContainer.style.boxShadow = "";
        }

        // SET HEIGHT OF CLIENT CONTAINER
        clientContainer.style.height = "auto";
        clientContainer.style.boxShadow = "0px 4px 8px 0 rgba(0,0,0,0.4)";

      } else {

        // RESET CLIENT CONTAINER
        clientContainer.style.height = "45px";
        clientContainer.style.boxShadow = "";

      }
    } else if (target.id === goalsContainer.id && goalsContainer.childNodes.length > 1) { // if target's ID is equal to the goalsContainer element's ID and if goalsContainer contains items

      // SET CLICKED CONTAINER VARIABLE AND OTHER CONTAINER VARIABLE FOR DROP-DOWN ARROW FLIP AT END OF FUNCTION
      clickedContainer = goalsContainer;
      otherContainer = clientContainer;
      clickedShowAll = goalsShowAll;
      otherShowAll = clientShowAll;

      if (goalsContainer.style.height === "45px" || goalsContainer.style.height === "") {

        // COLLAPSE CLIENT WINDOW
        if (clientContainer.style.height === "auto") {
          clientContainer.style.height = "45px";
          clientContainer.style.boxShadow = "";
        }

        // SET HEIGHT OF GOALS CONTAINER
        goalsContainer.style.height = "auto";
        goalsContainer.style.boxShadow = "0px 4px 8px 0 rgba(0,0,0,0.4)";

      } else {

        // RESET GOALS CONTAINER
        goalsContainer.style.height = "45px";
        goalsContainer.style.boxShadow = "";

      }
    }
    // IF CLICKED CONTAINER IS NOT NULL AND THERE ARE REVIEW-INFO-ITEMS IN THE CLICKED CONTAINER
    if (clickedContainer !== null && clickedContainer.childNodes.length > 1 && document.getElementById) {
      // FLIPS THE DROP-DOWN ARROW
      if (clickedContainer.lastElementChild.style.transform === "") { // if no transform is set
        clickedShowAll.innerText = "HIDE ALL";
        clickedContainer.lastElementChild.style.transform = "rotate(-180deg)"; // rotate dropdown arrow 180 degrees
      } else { // however, if transform is set
        clickedShowAll.innerText = "SHOW ALL";
        clickedContainer.lastElementChild.style.transform = ""; // reset transform property to an empty string
      }
      if (otherContainer.lastElementChild !== null && otherContainer.lastElementChild.style.transform === 'rotate(-180deg)') {
        otherShowAll.innerText = "SHOW ALL";
        otherContainer.lastElementChild.style.transform = ""; // reset transform property to an empty string
      }
    }
  }

  toggleEditWindow(e) {
    e.stopPropagation();
    let goalsContainer = document.getElementById('review-goals-container');
    let clientContainer = document.getElementById('review-client-container');
    let clientShowAll = document.getElementById('client-show-all');
    let goalsShowAll = document.getElementById('goal-show-all');

    // RESET CLIENT CONTAINER, IF NECESSARY
    if (clientContainer.style.height === 'auto') {
      clientContainer.style.height = "45px";
      clientContainer.style.boxShadow = "";
      clientShowAll.innerText = "SHOW ALL";
      clientContainer.lastElementChild.style.transform = "";
    }
    // RESET GOALS CONTAINER, IF NECESSARY
    if (goalsContainer.style.height === 'auto') {
      goalsContainer.style.height = "45px";
      goalsContainer.style.boxShadow = "";
      goalsShowAll.innerText = "SHOW ALL";
      goalsContainer.lastElementChild.style.transform = "";
    }

    console.log('Edit button hit!');
    let editClientContainer = document.getElementById('edit-client-container');
    let goalsShoulder = document.getElementById('goals-shoulder');
    if (editClientContainer.style.transform === '') {
      goalsShoulder.style.transform = 'translateX(25vw)';
      editClientContainer.style.transform = 'translateX(0)';
      editClientContainer.style.opacity = 1;
    } else {
      goalsShoulder.style.transform = '';
      editClientContainer.style.transform = '';
      editClientContainer.style.opacity = 0;
    }
  }
  updateClientInfo() {
    let client = this.props.clientReducer.client;
    let inputs = document.getElementsByTagName('INPUT');
    let editClientContainer = document.getElementById('edit-client-container');
    let goalsShoulder = document.getElementById('goals-shoulder');

    // UPDATE EACH CLIENT INFO FIELD INDIVIDUALLY
    if (inputs[0].value.length > 0 && inputs[0].value !== client.name) {
      this.props.setClientName(inputs[0].value); // set client name to value of first input field
    }
    if (inputs[1].value.length > 0 && inputs[1].value !== client.company) {
      this.props.setClientCompany(inputs[1].value); // set client company to value of second input field
    }
    if (inputs[2].value.length > 0 && inputs[2].value !== client.email) {
      this.props.setClientEmail(inputs[2].value); // set client email to value of third input field
    }
    if (inputs[3].value.length > 0 && inputs[3].value !== client.phone) {
      this.props.setClientPhone(inputs[3].value); // set client phone to value of fourth input field
    }

    // CLOSE EDIT WINDOW
    if (editClientContainer.style.transform === '') {
      goalsShoulder.style.transform = 'translateX(25vw)';
      editClientContainer.style.transform = 'translateX(0)';
      editClientContainer.style.opacity = 1;
    } else {
      goalsShoulder.style.transform = '';
      editClientContainer.style.transform = '';
      editClientContainer.style.opacity = 0;
    }
  }

  formatPhone() {
    let editPhoneInput = document.getElementById('edit-phone-input');

    if (editPhoneInput.value.length < 15) {
      editPhoneInput.value = phoneFormat(editPhoneInput.value);
    } else {
      editPhoneInput.value = editPhoneInput.value.substring(0, 14);
    }
  }

  render() {
    let name = this.props.clientReducer.client.name || null;
    let company = this.props.clientReducer.client.company || null;
    let email = this.props.clientReducer.client.email || null;
    let phone = this.props.clientReducer.client.phone || null;

    let myArray = [name, company, email, phone];

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
                  <FontAwesomeIcon icon={faPencilAlt} id="0-edit" className="fontawesome-pencil" onClick={this.toggleEditWindow.bind(this)}/>
                </div>
                <div id="review-client-container" className="review-info-item-container" onClick={this.showAllItems.bind(this)}>
                  {/*<p className="review-info-item subdued">Click to view…</p>*/}
                  {myArray.map(function(property, i, myArray) {
                    if (property !== null) {
                      return <p key={i} className="review-info-item flair">{property}</p>;
                    }
                    return false;
                  })}
                  <p id="client-show-all" className="show-all">SHOW ALL</p>
                  <FontAwesomeIcon icon={faAngleDown} id="client-dropdown" className="dropper"/>
                </div>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">YOUR GOALS</h3>
                  <FontAwesomeIcon icon={faPencilAlt} id="1-edit" className="fontawesome-pencil" onClick={this.toggleEditWindow.bind(this)}/>
                </div>
                <div id="review-goals-container" className="review-info-item-container" onClick={this.showAllItems.bind(this)}>
                  {/*<p className="review-info-item subdued">Click to view…</p>*/}
                  {this.props.clientReducer.client.goals.length > 0 ? this.props.clientReducer.client.goals.map(function(goal, i, goals) {
                    return <p key={i} className="review-info-item flair">{goal.name}</p>;
                  }) : null}

                  {this.props.clientReducer.client.goals.length > 1 ? <p id="goal-show-all" className="show-all">SHOW ALL</p> : false}
                  {this.props.clientReducer.client.goals.length > 1 ? <FontAwesomeIcon icon={faAngleDown} id="goal-dropdown" className="dropper"/> : false}

                </div>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">YOUR BUNDLE</h3>
                  <FontAwesomeIcon icon={faPencilAlt} id="2-edit" className="fontawesome-pencil" onClick={this.toggleEditWindow.bind(this)}/>
                </div>
                <p className="review-info-item flair">{this.props.clientReducer.client.bundle.name || "None"}</p>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">TOTAL</h3>
                </div>
                <p className="review-info-item emphasis">${this.props.clientReducer.client.bundle.price || "0"}</p>
              </div>
              <Link to="/capitalize" className="buttons continue-button">
                <div id="button-1" className="button-bg"></div>
                <p id="button-text-1" className="button-text"><span role="img" aria-label="lock">&#x1f512;</span> BUY NOW &rarr;</p>
              </Link>
            </div>


          </div>
        </div>
        <div id="edit-client-container" className="couplets-container">
          <div className="edit-heading-container">
            <h1 className="heading noselect">Edit Client Info</h1>
          </div>
          <div id="edit-name" className="edit-couplets">
            <h3 className="goal-sidebar-heading">NAME</h3>
            <div className="edit-answer">
              <input type="text" name="edit-name" id="edit-contact-input" placeholder={this.props.clientReducer.client.name || "Your Full Name"}/>
              {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
            </div>
          </div>

          <div id="edit-company" className="edit-couplets">
            <h3 className="goal-sidebar-heading">COMPANY</h3>
            <div className="edit-answer">
              <input type="text" name="edit-company" id="edit-company-input" placeholder={this.props.clientReducer.client.company || "Your Company's Name"}/>
              {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
            </div>
          </div>

          <div id="edit-email" className="edit-couplets">
            <h3 className="goal-sidebar-heading">EMAIL</h3>
            <div className="edit-answer">
              <input type="text" name="edit-email" id="edit-email-input" placeholder={this.props.clientReducer.client.email || "info@example.com"}/>
              {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
            </div>
          </div>

          <div id="edit-phone" className="edit-couplets">
            <h3 className="goal-sidebar-heading">PHONE</h3>
            <div className="edit-answer">
              <input type="text" name="edit-phone" id="edit-phone-input" placeholder={this.props.clientReducer.client.phone || "(555) 555-5555"} onKeyUp={this.formatPhone.bind(this)}/>
              {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
            </div>
          </div>
          <div className="edit-client-container-buttons-container">
            <p className="cancel-button edit-client-container-button" onClick={this.toggleEditWindow.bind(this)}>Cancel</p>
            <p className="save-button edit-client-container-button" onClick={this.updateClientInfo.bind(this)}>Save</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);