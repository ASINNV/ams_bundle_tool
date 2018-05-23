import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateClientInfo, fetchWrapper } from "./Functions";
import { GoalsWindow } from './AncillaryComponents';
// import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench';
import faFilter from '@fortawesome/fontawesome-free-solid/faFilter';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight';


// const theWindow=window,
//   theDoc=document,
//   theEle=theDoc.documentElement,
//   theBody=theDoc.getElementsByTagName('body')[0],
//   theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth,
//   theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;

// function updateClientInfo(appProps) {
//   let client = appProps.clientReducer.client;
//   let inputs = document.getElementsByTagName('INPUT');
//
//   // UPDATE EACH CLIENT INFO FIELD INDIVIDUALLY
//   if (inputs[0].value.length > 0 && inputs[0].value !== client.name) {
//     appProps.setClientName(inputs[0].value); // set client name to value of first input field
//   }
//   if (inputs[1].value.length > 0 && inputs[1].value !== client.company) {
//     appProps.setClientCompany(inputs[1].value); // set client company to value of second input field
//   }
//   if (inputs[2].value.length > 0 && inputs[2].value !== client.email) {
//     appProps.setClientEmail(inputs[2].value); // set client email to value of third input field
//   }
//   if (inputs[3].value.length > 0 && inputs[3].value !== client.phone) {
//     appProps.setClientPhone(inputs[3].value); // set client phone to value of fourth input field
//   }
// }

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

    // SET CURRENT STEP TO REVIEW (3)
    this.props.setCurrentStep(3); // sets current step to 3

    let currentServiceCategory = this.props.appReducer.currentServiceCategory;
    // let currentCategoryPage = this.props.appReducer.currentCategoryPage;
    let categoryButtons = document.getElementsByClassName('pill-button');

    // if (currentCategoryPage === 1) {
    //   document.getElementById('left-arrow').style.display = 'none';
    // }


    for (let i = 0; i < categoryButtons.length; i++) {
      categoryButtons.item(i).className = 'pill-button';
    }

    console.log('CURRENT CATEGORY IS THE FOLLOWING: ', currentServiceCategory);

    let workingServiceCategory = currentServiceCategory === null ? null : currentServiceCategory.slice(0, 2);

    switch (workingServiceCategory) {
      case null:
        categoryButtons.item(0).className += " active-goal-page";
        break;
      case 'WB':
        categoryButtons.item(1).className += " active-goal-page";
        break;
      case 'GD':
        categoryButtons.item(2).className += " active-goal-page";
        break;
      case 'VD':
        categoryButtons.item(3).className += " active-goal-page";
        break;
      case 'IT':
        categoryButtons.item(4).className += " active-goal-page";
        break;
      default:
        categoryButtons.item(0).className += " active-goal-page";
    }

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
  saveClientInfo() {
    // UPDATES CLIENT INFO
    updateClientInfo(this.props);

    // INITIALIZE NECESSARY VARIABLES
    let editClientContainer = document.getElementById('edit-client-container');
    let goalsShoulder = document.getElementById('goals-shoulder');

    // CLOSE EDIT WINDOW USING INITIALIZED VARIABLES
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

  createProject(e) {
    e.preventDefault();
    // let dataObj = {}; // object for project details going to the database
    // let count = 0; // count to see if project object is full and ready to send to the database
    let clientId = this.props.clientReducer.project.clientId;
    // CHECK COUNT TO VERIFY FULL dataObj, THEN SEND dataObj TO DATABASE
    // if (count === 4) {
    //
    // }
    let appHistory = this.props.history;
    let setProjectId = this.props.setProjectId;

    fetchWrapper('/api/new-project', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        clientId: clientId,
        name: "Testicles 123",
        paymentMethod: 3,
        bundle: {
          id: 2,
          name: 'Accelerator',
          price: 7777
        }
      })
    }, setProjectId, appHistory, "/capitalize", "Project Already Exists!", "A project with your project ID is already in our database. If this is due to error, please give us a call: +1 (844) 426-7999");


    // fetch('/api/new-project', {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     clientId: clientId,
    //     name: "Testicles 123",
    //     paymentMethod: 3,
    //     bundle: {
    //       id: 2,
    //       name: 'Accelerator',
    //       price: 7777
    //     }
    //   })
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setProjectId(data.id);
    //     myHistory.push('/capitalize');
    //     console.log('RETURNED FROM CLIENT INSERT: ', data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  changeServicePage(e) {
    console.log(e.target);
    let targe = e.target;
    let rightArrow = document.getElementById('right-arrow');
    let pillButtons = document.getElementsByClassName('pill-button');
    let categoryServices = [];

    if (targe.id !== 'pill') {
      console.log('whoa there');
      if (targe.className.indexOf(" active-goal-page") === -1) {
        console.log('hey it worked');
        for (let i = 0; i < pillButtons.length; i++) {
          if (pillButtons.item(i).className.indexOf(" active-goal-page") !== -1) {
            pillButtons.item(i).className = "pill-button";
          }
        }
        targe.className += " active-goal-page";
      } else {
        // targe.className = targe.className.slice(0, targe.className.indexOf(" active-goal-page"));
      }

      switch (targe.id) {
        case "pill-button-0":

          if (this.props.appReducer.currentServiceCategory !== null) {
            categoryServices = this.props.appReducer.services;
            this.props.setCategoryServices(categoryServices);
            this.props.setCurrentServiceCategory(null);
          }

          break;
        case "pill-button-1":

          if (this.props.appReducer.currentServiceCategory !== "WB") {
            categoryServices = this.props.appReducer.services.filter((service) => {

              if (service.code.indexOf("WB") !== -1) {
                return service;
              } else {
                return false;
              }
            });

            this.props.setCategoryServices(categoryServices);
            this.props.setCurrentServiceCategory("WB");
          }

          break;
        case "pill-button-2":

          if (this.props.appReducer.currentServiceCategory !== "GD") {
            categoryServices = this.props.appReducer.services.filter((service) => {

              if (service.code.indexOf("GD") !== -1) {
                return service;
              } else {
                return false;
              }
            });

            this.props.setCategoryServices(categoryServices);
            this.props.setCurrentServiceCategory("GD");
          }

          break;
        case "pill-button-3":

          if (this.props.appReducer.currentServiceCategory !== "VD") {
            categoryServices = this.props.appReducer.services.filter((service) => {

              if (service.code.indexOf("VD") !== -1) {
                return service;
              } else {
                return false;
              }
            });

            this.props.setCategoryServices(categoryServices);
            this.props.setCurrentServiceCategory("VD");
          }

          break;
        case "pill-button-4":

          if (this.props.appReducer.currentServiceCategory !== "IT") {
            categoryServices = this.props.appReducer.services.filter((service) => {

              if (service.code.indexOf("IT") !== -1) {
                return service;
              } else {
                return false;
              }
            });

            this.props.setCategoryServices(categoryServices);
            this.props.setCurrentServiceCategory("IT");
          }

          break;
        default:
          console.log('fell to the default case in changeGoalPage()');
      }

      this.props.setCurrentServiceCategoryPage(1);

      if (categoryServices.length > 8 && rightArrow !== null) {
        console.log('hey what the fuck is going on here!>!>!>!?!?!?!?!?!?!?!');
        rightArrow.style.display = '';
      }
    }
  }

  showMoreServices(e) {
    // SET TARGET EQUAL TO UPPERMOST PARENT
    let target = e.target;
    while (target.id.indexOf("-arrow") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }

    let categoryServices = this.props.appReducer.categoryServices;
    let currentServiceCategoryPage = this.props.appReducer.currentServiceCategoryPage;
    let totalPages = Math.ceil(categoryServices.length/8);

    // let leftArrow = document.getElementById('left-arrow');
    let rightArrow = document.getElementById('right-arrow');
    let workingPage = 1;


    switch (target.id) {
      case "left-arrow":
        if (currentServiceCategoryPage > 1) {
          workingPage = currentServiceCategoryPage - 1;
          this.props.setCurrentServiceCategoryPage(workingPage);
        } else {
          console.log("You want to go to the previous page of goals, don't you? No dice!");
        }
        break;
      case "right-arrow":
        if (currentServiceCategoryPage < totalPages) {
          workingPage = currentServiceCategoryPage + 1;
          this.props.setCurrentServiceCategoryPage(workingPage);
        } else {
          console.log("You want to go to the next page of goals, don't you? No dice!");
        }
        break;
      default:
        console.log('Fell to the default block in showMoreGoals() switch statement');
    }

    if (workingPage === totalPages) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }


  }

  customizeProject() {
    console.log("This does nothing yet. Soon it will customize the user's project");
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

          {this.props.appReducer.currentServiceCategoryPage > 1 ? <FontAwesomeIcon icon={faArrowLeft} id="left-arrow" className="nav-arrow" onClick={this.showMoreGoals.bind(this)}/> : false}

          <div className="review-torso-heading-container">

            <div className="flex">
              <h1 className="heading">Review Your Order</h1>
              <div id="customize-container" onClick={this.customizeProject.bind(this)}>
                <FontAwesomeIcon icon={faWrench} />
                <p className="customize-label">Customize</p>
              </div>
            </div>

            <div className="filter-container">
              <div className="filter-label-container">
                <p className="filter-label">Categories</p>
                <FontAwesomeIcon icon={faFilter} id="" className="filter-icon" />
              </div>
              <div id="pill" className="pill-buttons-container" onClick={this.changeServicePage.bind(this)}>
                <p id="pill-button-0" className="pill-button">All</p>
                <p id="pill-button-1" className="pill-button">Web</p>
                <p id="pill-button-2" className="pill-button">Graphics</p>
                <p id="pill-button-3" className="pill-button">Video</p>
                <p id="pill-button-4" className="pill-button">IT/Repair</p>
              </div>
            </div>

          </div>

          <GoalsWindow page="services" appReducer={this.props.appReducer} clientReducer={this.props.clientReducer} setCurrentService={this.props.setCurrentService} setClientServices={this.props.setClientServices}/>
          {console.log(this.props.appReducer.categoryServices.length + ' is how many goals are in the category goals array')}
          {this.props.appReducer.categoryServices.length > 8 ? <FontAwesomeIcon icon={faArrowRight} id="right-arrow" className="nav-arrow" onClick={this.showMoreServices.bind(this)}/> : false}

        </div>
        <div id="goals-shoulder">
          <div id="container-0" className="container">

            <div id="" className="info-section">
              <div className="info-panel">
                <h1 className="heading noselect">Project Details</h1>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">YOUR INFO</h3>
                  <FontAwesomeIcon icon={faPencilAlt} id="0-edit" className="fontawesome-pencil" onClick={this.toggleEditWindow.bind(this)}/>
                </div>
                <div id="review-client-container" className="review-info-item-container" onClick={this.showAllItems.bind(this)}>
                  {/*<p className="review-info-item subdued">Click to view…</p>*/}
                  {myArray.map(function(property, i) {
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
                  <Link to="/personalize"><FontAwesomeIcon icon={faPencilAlt} id="1-edit" className="fontawesome-pencil"/></Link>
                </div>
                <div id="review-goals-container" className="review-info-item-container" onClick={this.showAllItems.bind(this)}>
                  {/*<p className="review-info-item subdued">Click to view…</p>*/}
                  {this.props.clientReducer.goals.length > 0 ? this.props.clientReducer.goals.map(function(goal, i, goals) {
                    return <p key={i} className="review-info-item flair">{goal.name}</p>;
                  }) : null}

                  {this.props.clientReducer.goals.length > 1 ? <p id="goal-show-all" className="show-all">SHOW ALL</p> : false}
                  {this.props.clientReducer.goals.length > 1 ? <FontAwesomeIcon icon={faAngleDown} id="goal-dropdown" className="dropper"/> : false}

                </div>
              </div>
              <div id="" className="info-panel no-bottom-margin">
                <div className="goal-sidebar-heading-container no-bottom-margin">
                  <h3 className="goal-sidebar-heading">YOUR BUNDLE</h3>
                  <Link to="/decide"><FontAwesomeIcon icon={faPencilAlt} id="2-edit" className="fontawesome-pencil"/></Link>
                </div>
                <p className="review-info-item emphasis">{this.props.clientReducer.project.bundle.name || "None"}</p>
                <hr/>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container ten-bottom-margin">
                  <h3 className="goal-sidebar-heading">TOTAL</h3>
                </div>
                <p className="review-info-item emphasis">${this.props.clientReducer.project.bundle.price || "0"}</p>
                {/*{this.props.clientReducer.project.bundle.price ? <p className="review-info-item emphasis">${this.props.clientReducer.project.bundle.price}</p> : <p className="review-info-item emphasis">Quote</p>}*/}
              </div>
              <Link to="/capitalize" className="buttons continue-button" onClick={this.createProject.bind(this)}>
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
            <p className="save-button edit-client-container-button" onClick={this.saveClientInfo.bind(this)}>Save</p>
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
    setClientServices: (services) => {
      dispatch({
        type: "SET_CLIENT_SERVICES",
        payload: services
      });
    },
    setClientStats: (stats) => {
      dispatch({
        type: "SET_CLIENT_STATS",
        payload: stats
      });
    },
    setClientId: (id) => {
      dispatch({
        type: "SET_CLIENT_ID",
        payload: id
      });
    },
    setProjectId: (id) => {
      dispatch({
        type: "SET_PROJECT_ID",
        payload: id
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
    setCurrentGoalCategory: (category) => {
      dispatch({
        type: "SET_CURRENT_GOAL_CATEGORY",
        payload: category
      });
    },
    setCurrentGoalCategoryPage: (pageNumber) => {
      dispatch({
        type: "SET_CURRENT_GOAL_CATEGORY_PAGE",
        payload: pageNumber
      });
    },
    setServices: (servicesArray) => {
      dispatch({
        type: "SET_SERVICES",
        payload: servicesArray
      });
    },
    setCurrentService: (service) => {
      dispatch({
        type: "SET_CURRENT_SERVICE",
        payload: service
      });
    },
    setCategoryServices: (servicesArray) => {
      dispatch({
        type: "SET_CATEGORY_SERVICES",
        payload: servicesArray
      });
    },
    setCurrentServiceCategory: (category) => {
      dispatch({
        type: "SET_CURRENT_SERVICE_CATEGORY",
        payload: category
      });
    },
    setCurrentServiceCategoryPage: (pageNumber) => {
      dispatch({
        type: "SET_CURRENT_SERVICE_CATEGORY_PAGE",
        payload: pageNumber
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