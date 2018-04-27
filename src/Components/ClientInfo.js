import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";

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


    let appData = this.props.appReducer;
    appData.currentStep = 0;
    this.props.setAppData(appData);


    let firstInput = document.getElementById('contact_name');
    firstInput.focus();
    // apiCaller('/api/clients');

    // let scrollingStream = document.getElementById('scrolling-stream');
    //
    // let questionArray = this.props.question.questions;
    // let currentQuestion = this.props.question.currentQuestion;
    //
    // questionArray.forEach(function(questionObj, i) {
    //   let couplet = document.createElement('div');
    //   let coupletQ = document.createElement('div');
    //   let coupletQLabel = document.createElement('label');
    //   let coupletA = document.createElement('div');
    //   let coupletAInput = document.createElement('input');
    //   couplet.id = questionObj.coupletId;
    //   couplet.className = 'qa-couplet';
    //   coupletQ.className = 'question';
    //   coupletQLabel.htmlFor = questionObj.htmlFor;
    //   coupletQLabel.innerText = questionObj.question;
    //   coupletA.className = 'answer';
    //   coupletAInput.type = questionObj.inputType;
    //   coupletAInput.name = questionObj.inputName;
    //   coupletAInput.id = questionObj.inputId;
    //   coupletAInput.placeholder = questionObj.inputPlaceholder;
    //   coupletQ.appendChild(coupletQLabel);
    //   coupletA.appendChild(coupletAInput);
    //   couplet.appendChild(coupletQ);
    //   couplet.appendChild(coupletA);
    //   scrollingStream.appendChild(couplet);
    //
    //   if (i === currentQuestion) {
    //     couplet.childNodes[1].childNodes[0].focus();
    //   }
    // });


    // let couplets = document.getElementsByClassName('qa-couplet');
    //
    // for (let i = 0; i < couplets.length; i++) {
    //
    //   if (i === this.props.question.currentQuestion) {
    //
    //     couplets.item(i).style.opacity = fullOpacity;
    //     couplets.item(i).childNodes[1].childNodes[0].focus();
    //
    //   } else if (i < this.props.question.currentQuestion - 1 || i > this.props.question.currentQuestion + 1) {
    //     couplets.item(i).style.opacity = zeroOpacity;
    //   } else {
    //     couplets.item(i).style.opacity = lowOpacity;
    //   }
    //
    // }

    // console.log(this.props.client);
  }

  // saveName() {
  //   let name = document.getElementById('client_name').value; // get value from client_name input field
  //   this.props.setClientName(name); // store client_name in state
  // }

  nextQuestion(e) {
    e.stopPropagation();

    if (e.which === 13 || e.which === 9) {
      e.preventDefault();

      let couplets = document.getElementsByClassName('qa-couplet');
      let scrollingStream = document.getElementById('scrolling-stream');
      let appData = this.props.appReducer;

      if (appData.currentQuestion === couplets.length - 1) {
        // let clientInfo = document.getElementById('client-info-body');
        // clientInfo.style.opacity = 0;
        appData.steps[0].active = false;
        appData.steps[0].complete = true;
        appData.steps[1].active = true;
        this.props.setAppData(appData);
        this.props.history.push('/personalize');
        return false;
        // let context = this;
        // setTimeout(function() {
        //   context.props.history.push('/goals');
        // }, 200);
      }

      for (let i = 0; i < couplets.length; i++) {

        if (i < appData.currentQuestion) { // set outgoing question to zero opacity (transparent) as it goes off-screen
          couplets.item(i).style.opacity = zeroOpacity;
        }

        if (i === appData.currentQuestion) { // set outgoing question to lower opacity
          couplets.item(i).style.opacity = lowOpacity;
        }

        if (i === appData.currentQuestion + 1) { // set incoming question to full opacity and place cursor inside of its input field
          couplets.item(i).style.opacity = fullOpacity;
          couplets.item(i).childNodes[1].childNodes[0].focus();
        }

        if (i === (appData.currentQuestion + 2)) { // set soon-to-be-incoming question to low opacity
          couplets.item(i).style.opacity = lowOpacity;
        }

        if (i > (appData.currentQuestion + 2)) {
          couplets.item(i).style.opacity = zeroOpacity;
        }
      }
      if (scrollingStream.style.transform === '') {
        scrollingStream.style.transform = "translate3d(0, 20vh, 0)";
      } else {
        scrollingStream.style.transform = "translate3d(0, " + (Number(scrollingStream.style.transform.slice(17, -8)) - 25) + "vh, 0)";
      }

      // let obj = {};
      //
      // switch (e.target.id) {
      //   case "contact_name":
      //     obj.contact_name = e.target.value;
      //     break;
      //   case "company_name":
      //     obj.company_name = e.target.value;
      //     break;
      //   case "email":
      //     obj.email = e.target.value;
      //     break;
      //   case "phone":
      //     obj.phone = e.target.value;
      //     break;
      //   default:
      //     return e.target.id;
      // }
      appData.currentQuestion += 1;
      this.props.setAppData(appData);
      // this.props.setClientObj(obj);

    }

  }
  editAnswer(e) {
    let appData = this.props.appReducer;
    let couplets = document.getElementsByClassName('qa-couplet');
    // let currentQuestion = this.props.question.currentQuestion;

    let target = e.target;

    if (target.id === "stream" || target.id === "scrolling-stream") {

    } else {
      while (target.id.indexOf("-qa-couplet") === -1) {
        target = target.parentNode;
      }
    }

    let clickedNumId = Number(target.id.slice(0, target.id.indexOf('-qa-couplet')));

    if (!isNaN(clickedNumId)) {

      let scrollingStream = document.getElementById('scrolling-stream');
      // console.log(currentQuestion + ' = currentQuestion', clickedNumId + ' = clickedNumId');

      // if (clickedNumId < currentQuestion) {
      //
      //   for (let i = 0; i < couplets.length; i++) {
      //     if (i === currentQuestion) {
      //       couplets.item(i).style.opacity = fullOpacity;
      //     } else if (i === currentQuestion + 1 || i === currentQuestion - 1) {
      //       couplets.item(i).style.opacity = lowOpacity;
      //     } else {
      //       couplets.item(i).style.opacity = zeroOpacity;
      //     }
      //   }
      // } else if (clickedNumId > currentQuestion) {
      //
      //   for (let i = 0; i < couplets.length; i++) {
      //     if (i === currentQuestion + 1) {
      //       couplets.item(i).style.opacity = fullOpacity;
      //     } else if (i === currentQuestion + 2 || i === currentQuestion) {
      //       couplets.item(i).style.opacity = lowOpacity;
      //     } else {
      //       couplets.item(i).style.opacity = zeroOpacity;
      //     }
      //   }
      // } else {
      //   console.log('Fell to the else block.........................');
      // }
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
      if (clickedNumId !== appData.currentQuestion) {
        scrollingStream.style.transform = "translate3d(0, " + (45 - (clickedNumId*25)) + "vh, 0)";
      }

      appData.currentQuestion = clickedNumId;
      this.props.setAppData(appData);

      // for (let i = 0; i < couplets.length; i++) {
      //   let halfElementHeight = couplets.item(i).getBoundingClientRect().height/2;
      //   let inactiveElementPosition = Number(theWindowHeight/2 + ((i - clickedNumId)*(theWindowHeight/4))) - (halfElementHeight);
      //
      //   if (i === clickedNumId) {
      //     couplets.item(i).style.opacity = fullOpacity;
      //     couplets.item(i).childNodes[1].childNodes[0].focus();
      //     couplets.item(i).style.transform = "translateY(" + (Number(theWindowHeight/2) - (halfElementHeight)) + "px)";
      //
      //   } else if (i < clickedNumId - 1 || i > clickedNumId + 1) {
      //     couplets.item(i).style.opacity = zeroOpacity;
      //     couplets.item(i).style.transform = "translateY(" + inactiveElementPosition + "px)";
      //   } else {
      //     couplets.item(i).style.opacity = lowOpacity;
      //     couplets.item(i).style.transform = "translateY(" + inactiveElementPosition + "px)";
      //   }
      // }
    }
  }

  render() {
    return (
        <div id="client-info-body" className="page-body">

          {/*<span className="movement">Press Me</span>*/}

          {/*<p className="buttons" onClick={this.createProject.bind(this)}>create new project</p>*/}
          <div id="stream" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)}>
            <div id="scrolling-stream">

              <div id="0-qa-couplet" className="qa-couplet">
                <div className="question">
                  <label htmlFor="name">What is your name?</label>
                </div>
                <div className="answer">
                  <input type="text" name="name" id="contact_name" placeholder="Your Full Name"/>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="1-qa-couplet" className="qa-couplet">
                <div className="question">
                  <label htmlFor="company">What is your company's name?</label>
                </div>
                <div className="answer">
                  <input type="text" name="company" id="company_name" placeholder="Your Company Name"/>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="2-qa-couplet" className="qa-couplet">
                <div className="question">
                  <label htmlFor="email">What is your email?</label>
                </div>
                <div className="answer">
                  <input type="text" name="email" id="email" placeholder="Your Email"/>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
              </div>

              <div id="3-qa-couplet" className="qa-couplet">
                <div className="question">
                  <label htmlFor="phone">What is your phone?</label>
                </div>
                <div className="answer">
                  <input type="text" name="phone" id="phone" placeholder="(XXX) XXX-XXXX"/>
                  {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
                </div>
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
    projectReducer: state.projectReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProjectData: (dataObj) => {
      dispatch({
        type: "SET_PROJECT_DATA",
        payload: dataObj
      });
    },
    setAppData: (dataObj) => {
      dispatch({
        type: "SET_APP_DATA",
        payload: dataObj
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);