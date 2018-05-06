import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const lowOpacity = 0.125;
const zeroOpacity = 0;
const fullOpacity = 1;
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

class ClientInfo extends Component {

  // createProject() {
  //   const newProj = {
  //     name: 'April 19',
  //     total: 900
  //   };
  //
  //   apiCaller('/api/new-project', {
  //     method: 'POST',
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     body: JSON.stringify(newProj)
  //   });
  // }

  componentDidMount(e) {

    // SET CURRENT STEP TO 0
    this.props.setCurrentStep(0); // sets current step to 0

    // SET CURRENT QUESTION TO 0
    this.props.setCurrentQuestion(0); // sets current question to 0

    // let appData = this.props.appReducer;
    // appData.steps.forEach(function(step, i, steps) {
    //   if (step === steps[0]) {
    //     step.active = true;
    //     step.complete = false;
    //   } else {
    //     step.active = false;
    //     step.complete = false;
    //   }
    // });
    // this.props.setAppData(appData);

    // let submitButton = document.getElementById('submit-button-1');
    let clientData = this.props.clientReducer.client;

    let inputs = document.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
      switch (inputs.item(i).name) {
        case 'name':
          inputs.item(i).value = clientData.name;
          inputs.item(i).focus();
          break;
        case 'company':
          inputs.item(i).value = clientData.company;
          break;
        case 'email':
          inputs.item(i).value = clientData.email;
          break;
        case 'phone':
          inputs.item(i).value = clientData.phone;
          break;
        case 'sales':
          inputs.item(i).value = clientData.stats[0].value;
          break;
        case 'reach':
          inputs.item(i).value = clientData.stats[1].value;
          break;
        case 'accessibility':
          inputs.item(i).value = clientData.stats[2].value;
          break;
        case 'modernity':
          inputs.item(i).value = clientData.stats[3].value;
          break;
        default:
          console.log('again, fell the the default case');
      }
    }


    // apiCaller('/api/clients');
  }


  nextQuestion(e) {

    let currentQuestion = this.props.appReducer.currentQuestion;

    let charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13 || charCode === 9) {
      e.preventDefault();
      let stats = this.props.clientReducer.client.stats;
      switch (e.target.name) {
        case 'name':
          this.props.setClientName(e.target.value);
          break;
        case 'company':
          this.props.setClientCompany(e.target.value);
          break;
        case 'email':
          this.props.setClientEmail(e.target.value);
          break;
        case 'phone':
          this.props.setClientPhone(e.target.value);
          break;
        case 'sales':
          stats[0].value = Number(e.target.value.replace(/\D/g, ''));
          this.props.setClientStats(stats); // set client name to value of fourth input field
          break;
        case 'reach':
          stats[1].value = Number(e.target.value.replace(/\D/g, ''));
          this.props.setClientStats(stats); // set client name to value of fourth input field
          break;
        case 'accessibility':
          stats[2].value = Number(e.target.value.replace(/\D/g, ''));
          this.props.setClientStats(stats); // set client name to value of fourth input field
          break;
        case 'modernity':
          stats[3].value = Number(e.target.value.replace(/\D/g, ''));
          this.props.setClientStats(stats); // set client name to value of fourth input field
          break;
        default:
          console.log('fell to the default case');
      }

      // RESIZES HEADING AFTER FIRST ANSWER
      if (document.getElementById('floating-instruction') && document.getElementById('floating-instruction').style.transform === '') {
        // let stream = document.getElementById('stream');
        let floatingInstruction = document.getElementById('floating-instruction');
        floatingInstruction.childNodes[0].style.transform = "translateY(-20vh) scale(0.5)";
      }

      let couplets = document.getElementsByClassName('qa-couplet');
      let scrollingStream = document.getElementById('scrolling-stream');
      let submitButton = document.getElementById('submit-button-1');

      if (currentQuestion < couplets.length) {

        if (currentQuestion === (couplets.length - 1)) {

          this.props.setCurrentStep(1);
          this.props.history.push('/personalize');
          return false;

        }

        if (currentQuestion === (couplets.length - 2)) {
          submitButton.style.opacity = fullOpacity;
        }

        for (let i = 0; i < couplets.length; i++) {

          if (i < currentQuestion) { // set outgoing question to zero opacity (transparent) as it goes off-screen
            couplets.item(i).style.opacity = zeroOpacity;
          }

          if (i === currentQuestion) { // set outgoing question to lower opacity
            couplets.item(i).style.opacity = lowOpacity;
          }

          if (i === currentQuestion + 1) { // set incoming question to full opacity and place cursor inside of its input field
            couplets.item(i).style.opacity = fullOpacity;
            couplets.item(i).childNodes[1].childNodes[0].focus();
          }

          if (i === (currentQuestion + 2)) { // set soon-to-be-incoming question to low opacity
            couplets.item(i).style.opacity = lowOpacity;
          }

          if (i > (currentQuestion + 2)) {
            couplets.item(i).style.opacity = zeroOpacity;
          }
        }
        if (scrollingStream.style.transform === '') {
          scrollingStream.style.transform = "translateY(20vh)";
        } else {
          scrollingStream.style.transform = "translateY(" + (Number(scrollingStream.style.transform.slice(11, -3)) - 25) + "vh)";
        }

        // INCREMENT AND SET CURRENT QUESTION
        currentQuestion += 1; // increments current question
        this.props.setCurrentQuestion(currentQuestion); // sets current question
      }
    }
  }
  editAnswer(e) {

    let currentQuestion = this.props.appReducer.currentQuestion;
    // let lastQuestion = this.props.appReducer.lastQuestion;
    let couplets = document.getElementsByClassName('qa-couplet');
    let submitButton = document.getElementById('submit-button-1');

    let target = e.target;

    while (target.id.indexOf("-qa-couplet") === -1) {
      target = target.parentNode;
    }

    if (target === couplets.item(couplets.length - 1)) {
      submitButton.style.opacity = fullOpacity;
    } else {
      submitButton.style.opacity = zeroOpacity;
    }

    let clickedNumId = Number(target.id.slice(0, target.id.indexOf('-qa-couplet')));

    if (!isNaN(clickedNumId)) {

      let scrollingStream = document.getElementById('scrolling-stream');

      for (let i = 0; i < couplets.length; i++) {
        if (i === clickedNumId) {
          couplets.item(i).style.opacity = fullOpacity;
          couplets.item(i).childNodes[1].childNodes[0].focus();

        } else if (i < clickedNumId - 1 || i > clickedNumId + 1) {
          couplets.item(i).style.opacity = zeroOpacity;
        } else {
          couplets.item(i).style.opacity = lowOpacity;
        }
      }
      if (clickedNumId !== currentQuestion) {
        scrollingStream.style.transform = "translateY(" + (45 - (clickedNumId*25)) + "vh)";
        console.log('currentQuestion = ' + currentQuestion, 'clickedNumId = ' + clickedNumId);
        currentQuestion = clickedNumId;
        this.props.setCurrentQuestion(currentQuestion);

        // RESIZES HEADING AFTER FIRST ANSWER
        if (document.getElementById('floating-instruction') && document.getElementById('floating-instruction').style.transform === '') {

          let floatingInstruction = document.getElementById('floating-instruction');
          floatingInstruction.childNodes[0].style.transform = "translateY(-20vh) scale(0.5)";

        }

        // SETS CLIENT INFORMATION
        let client = this.props.clientReducer.client;
        let inputs = document.getElementsByTagName('input'); // grab all inputs on page
        let stats = this.props.clientReducer.client.stats;

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
        if (inputs[4].value.length > 0 && inputs[4].value !== client.stats) {
          stats[0].value = Number(inputs[4].value.replace(/\D/g, ''));
          this.props.setClientStats(stats); // set client stats to value of fourth input field
        }
        if (inputs[5].value.length > 0 && inputs[5].value !== client.stats) {
          stats[1].value = Number(inputs[5].value.replace(/\D/g, ''));
          this.props.setClientStats(stats); // set client stats to value of fourth input field
        }
        if (inputs[6].value.length > 0 && inputs[6].value !== client.stats) {
          stats[2].value = Number(inputs[6].value.replace(/\D/g, ''));
          this.props.setClientStats(stats); // set client stats to value of fourth input field
        }
        if (inputs[7].value.length > 0 && inputs[7].value !== client.stats) {
          stats[3].value = Number(inputs[7].value.replace(/\D/g, ''));
          this.props.setClientStats(stats); // set client stats to value of fourth input field
        }

      }
    }
  }

  formatPhone() {
    let currentQuestion = this.props.appReducer.currentQuestion;

    if (currentQuestion === 3) {
      let phoneInput = document.getElementById('phone-input');

      if (phoneInput.value.length < 15) {
        phoneInput.value = phoneFormat(phoneInput.value);
      } else {
        phoneInput.value = phoneInput.value.substring(0, 14);
      }

      // let client_phone = phoneInput.value.replace(/\D/g, '')
    }
  }

  formatPercentage(e) {
    // let target = e.target;

    // while (target.id.indexOf("-qa-couplet") === -1) {
    //   target = target.parentNode;
    // }

    if (e.target.value) {
      e.target.value = e.target.value.replace(/\D/g, '');
      if (e.target.value.length > 2 && e.target.value !== '100') {
        if (e.target.value.slice(0, 3) === '100') {
          e.target.value = e.target.value.slice(0, 3);
        } else {
          e.target.value = e.target.value.slice(0, 2);
        }
      }
    }

  }

  nextPhase() {
    let scrollingStream = document.getElementById('scrolling-stream');
    let lastCouplet = scrollingStream.childNodes[(scrollingStream.childNodes.length - 2)];
    let lastInput = lastCouplet.childNodes[1].childNodes[0];

    let stats = this.props.clientReducer.client.stats;
    let lastStat = stats.length - 1;

    stats[lastStat].value = Number(lastInput.value.replace(/\D/g, '')); // problem line

    this.props.setClientStats(stats); // set client name to value of fourth input field

    this.props.setCurrentStep(1);

  }

  render() {
    return (
        <div id="client-info-body" className="page-body">

          {/*<span className="movement">Press Me</span>*/}

          {/*<p className="buttons" onClick={this.createProject.bind(this)}>create new project</p>*/}
          <div id="stream">
            <div id="floating-instruction">
              <p>Tell us about your business</p>
            </div>
            <div id="scrolling-stream">

              <div id="0-qa-couplet" className="qa-couplet" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)}>
                <div className="question">
                  <label htmlFor="name">What is your name?</label>
                </div>
                <div className="answer">
                  <input type="text" name="name" id="contact-input" placeholder="Your Full Name"/>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="1-qa-couplet" className="qa-couplet" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)}>
                <div className="question">
                  <label htmlFor="company">What is your company's name?</label>
                </div>
                <div className="answer">
                  <input type="text" name="company" id="company-input" placeholder="Example, Inc."/>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="2-qa-couplet" className="qa-couplet" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)}>
                <div className="question">
                  <label htmlFor="email">What is your email address?</label>
                </div>
                <div className="answer">
                  <input type="text" name="email" id="email-input" placeholder="info@example.com"/>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="3-qa-couplet" className="qa-couplet" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)} onKeyUp={this.formatPhone.bind(this)}>
                <div className="question">
                  <label htmlFor="phone">What is your phone number?</label>
                </div>
                <div className="answer">
                  <input type="text" name="phone" id="phone-input" placeholder="(555) 555-5555"/>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="4-qa-couplet" className="qa-couplet" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)} onKeyUp={this.formatPercentage.bind(this)}>
                <div className="question">
                  <label htmlFor="sales">What percentage of your target sales are you currently making?</label>
                </div>
                <div className="answer">
                  <input type="text" name="sales" id="sales-input" placeholder="50"/>
                  <span className="format-symbol">%</span>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="5-qa-couplet" className="qa-couplet" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)} onKeyUp={this.formatPercentage.bind(this)}>
                <div className="question">
                  <label htmlFor="reach">What percentage of your target audience are you reaching?</label>
                </div>
                <div className="answer">
                  <input type="text" name="reach" id="reach-input" placeholder="50"/>
                  <span className="format-symbol">%</span>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="6-qa-couplet" className="qa-couplet" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)} onKeyUp={this.formatPercentage.bind(this)}>
                <div className="question">
                  <label htmlFor="accessibility">How accessible are your brand and services?</label>
                </div>
                <div className="answer">
                  <input type="text" name="accessibility" id="accessibility-input" placeholder="50"/>
                  <span className="format-symbol">%</span>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="7-qa-couplet" className="qa-couplet" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)} onKeyUp={this.formatPercentage.bind(this)}>
                <div className="question">
                  <label htmlFor="modernity">How up-to-date is your business?</label>
                </div>
                <div className="answer">
                  <input type="text" name="modernity" id="modernity-input" placeholder="50"/>
                  <span className="format-symbol">%</span>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="submit-container-1" className="submit-container">
                <Link to="/personalize" id="submit-button-1" className="main-button" onClick={this.nextPhase.bind(this)}>NEXT STEP &rarr;</Link>
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
    },
    setClientStats: (stats) => {
      dispatch({
        type: "SET_CLIENT_STATS",
        payload: stats
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);

// const appReducer = (state = appState, action) => {
//   switch (action.type) {
//     case "SET_APP_DATA":
//       state = {
//         ...state,
//         ...action.payload
//       };
//       break;
//     case "SET_CHOSEN_BUNDLE":
//       state = {
//         ...state,
//         chosenBundle: action.payload
//       };
//       break;
//     case "SET_CURRENT_QUESTION":
//       state = {
//         ...state,
//         currentQuestion: action.payload
//       };
//       break;
//     case "SET_CURRENT_STEP":
//       state = {
//         ...state,
//         currentStep: action.payload
//       };
//       break;
//     case "SET_STEPS":
//       state = {
//         ...state,
//         steps: action.payload
//       };
//       break;
//     default:
//       return state;
//   }
//   return state;


// const clientReducer = (state = clientState, action) => {
//   switch (action.type) {
//     case "SET_CUSTOMER_DATA":
//       state = {
//         ...state,
//         ...action.payload
//       };
//       break;
//     case "SET_CLIENT_NAME":
//       state = {
//         ...state,
//         client: {
//           ...state.client,
//           name: action.payload
//         }
//       };
//       break;
//     case "SET_CLIENT_COMPANY":
//       state = {
//         ...state,
//         client: {
//           ...state.client,
//           company: action.payload
//         }
//       };
//       break;
//     case "SET_CLIENT_EMAIL":
//       state = {
//         ...state,
//         client: {
//           ...state.client,
//           email: action.payload
//         }
//       };
//       break;
//     case "SET_CLIENT_PHONE":
//       state = {
//         ...state,
//         client: {
//           ...state.client,
//           phone: action.payload
//         }
//       };
//       break;
//     case "SET_CLIENT_DISCOUNT":
//       state = {
//         ...state,
//         client: {
//           ...state.client,
//           discount: action.payload
//         }
//       };
//       break;
//     case "SET_CLIENT_STATS":
//       state = {
//         ...state,
//         client: {
//           ...state.client,
//           stats: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_NAME":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           name: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_GOALS":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           goals: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_STATUS":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           status: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_PAYMENT_METHOD":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           paymentMethod: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_TOTAL":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           total: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_BUNDLE_NAME":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           bundleName: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_BUNDLE_ID":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           bundleId: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_SERVICES":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           services: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_START_DATE":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           startDate: action.payload
//         }
//       };
//       break;
//     case "SET_PROJECT_DUE_DATE":
//       state = {
//         ...state,
//         project: {
//           ...state.project,
//           dueDate: action.payload
//         }
//       };
//       break;
//     default:
//       return state;
//   }
//   return state;
// };
//
// };