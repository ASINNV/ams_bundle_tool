import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";

const lowOpacity = 0.125;
const zeroOpacity = 0;
const fullOpacity = 1;
const theWindow=window,
  theDoc=document,
  theEle=theDoc.documentElement,
  theBody=theDoc.getElementsByTagName('body')[0],
  // theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth,
  theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;

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
    // apiCaller('/api/clients');

    let stream = document.getElementById('stream');

    let questionArray = this.props.question.questions;

    questionArray.forEach(function(questionObj) {
      let couplet = document.createElement('div');
      let coupletQ = document.createElement('div');
      let coupletQLabel = document.createElement('label');
      let coupletA = document.createElement('div');
      let coupletAInput = document.createElement('input');
      couplet.id = questionObj.coupletId;
      couplet.className = 'qa-couplet';
      coupletQ.className = 'question';
      coupletQLabel.htmlFor = questionObj.htmlFor;
      coupletQLabel.innerText = questionObj.question;
      coupletA.className = 'answer';
      coupletAInput.type = questionObj.inputType;
      coupletAInput.name = questionObj.inputName;
      coupletAInput.id = questionObj.inputId;
      coupletAInput.placeholder = questionObj.inputPlaceholder;
      coupletQ.appendChild(coupletQLabel);
      coupletA.appendChild(coupletAInput);
      couplet.appendChild(coupletQ);
      couplet.appendChild(coupletA);
      stream.appendChild(couplet);
    });


    let couplets = document.getElementsByClassName('qa-couplet');

    for (let i = 0; i < couplets.length; i++) {

      couplets.item(i).style.transform = "translateY(" + (Number(theWindowHeight/2 + (i*(theWindowHeight/4))) - (couplets.item(i).getBoundingClientRect().height/2)) + "px)";
      // setTimeout(function() {
      //   couplets.item(i).style.transition = "transform 1s ease-in-out, opacity 0.5s ease-in-out";
      // }, 1);

      if (i === this.props.question.currentQuestion) {

        couplets.item(i).style.opacity = fullOpacity;
        couplets.item(i).childNodes[1].childNodes[0].focus();

      } else if (i < this.props.question.currentQuestion - 1 || i > this.props.question.currentQuestion + 1) {
        couplets.item(i).style.opacity = zeroOpacity;
      } else {
        couplets.item(i).style.opacity = lowOpacity;
      }

    }

    // console.log(this.props.client);
  }

  saveName() {
    let name = document.getElementById('client_name').value; // get value from client_name input field
    this.props.setClientName(name); // store client_name in state
  }

  nextQuestion(e) {
    e.stopPropagation();

    if (e.which === 13 || e.which === 9) {
      e.preventDefault();

      let couplets = document.getElementsByClassName('qa-couplet');
      let currentQuestion = this.props.question.currentQuestion;

      if (currentQuestion === couplets.length - 1) {
        // let clientInfo = document.getElementById('client-info-body');
        // clientInfo.style.opacity = 0;
        this.props.history.push('/goals');
        this.props.setQuestion(0);
        return false;
        // let context = this;
        // setTimeout(function() {
        //   context.props.history.push('/goals');
        // }, 200);
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

        couplets.item(i).style.transform = "translateY(" + (Number(couplets.item(i).style.transform.slice(11, -3)) - theWindowHeight/4) + "px)";
      }

      let obj = {};

      switch (e.target.id) {
        case "contact_name":
          obj.contact_name = e.target.value;
          break;
        case "company_name":
          obj.company_name = e.target.value;
          break;
        case "email":
          obj.email = e.target.value;
          break;
        case "phone":
          obj.phone = e.target.value;
          break;
        default:
          return e.target.id;
      }
      this.props.setQuestion(this.props.question.currentQuestion + 1);
      this.props.setClientObj(obj);

    }

  }
  editAnswer(e) {

    let couplets = document.getElementsByClassName('qa-couplet');
    // let currentQuestion = this.props.question.currentQuestion;

    let target = e.target;

    if (target.id === "stream") {

    } else {
      while (target.id.indexOf("-qa-couplet") === -1) {
        target = target.parentNode;
      }
    }

    let clickedNumId = Number(target.id.slice(0, target.id.indexOf('-qa-couplet')));

    if (!isNaN(clickedNumId)) {

      this.props.setQuestion(clickedNumId);

      for (let i = 0; i < couplets.length; i++) {
        let halfElementHeight = couplets.item(i).getBoundingClientRect().height/2;
        let inactiveElementPosition = Number(theWindowHeight/2 + ((i - clickedNumId)*(theWindowHeight/4))) - (halfElementHeight);

        if (i === clickedNumId) {
          couplets.item(i).style.opacity = fullOpacity;
          couplets.item(i).childNodes[1].childNodes[0].focus();
          couplets.item(i).style.transform = "translateY(" + (Number(theWindowHeight/2) - (halfElementHeight)) + "px)";

        } else if (i < clickedNumId - 1 || i > clickedNumId + 1) {
          couplets.item(i).style.opacity = zeroOpacity;
          couplets.item(i).style.transform = "translateY(" + inactiveElementPosition + "px)";
        } else {
          couplets.item(i).style.opacity = lowOpacity;
          couplets.item(i).style.transform = "translateY(" + inactiveElementPosition + "px)";
        }
      }
    }
  }

  render() {
    return (
        <div id="client-info-body">

          {/*<span className="movement">Press Me</span>*/}

          {/*<p className="buttons" onClick={this.createProject.bind(this)}>create new project</p>*/}
          <div id="stream" onKeyDown={this.nextQuestion.bind(this)} onClick={this.editAnswer.bind(this)}>
            {/*<div onClick={this.editAnswer.bind(this)} id="qa-couplet-0" className="qa-couplet">*/}
              {/*<div className="question">*/}
                {/*<label htmlFor="name">What is your name?</label>*/}
              {/*</div>*/}
              {/*<div className="answer">*/}
                {/*<input type="text" name="name" id="contact_name" placeholder="Your Full Name"/>*/}
                {/*/!*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*!/*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>

        </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    client: state.clientReducer,
    project: state.projectReducer,
    question: state.questionReducer,
    progress: state.progressReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClientObj: (clientObj) => {
      dispatch({
        type: "SET_CLIENT_OBJ",
        payload: clientObj
      });
    },
    setBundle: (number) => {
      dispatch({
        type: "SET_BUNDLE",
        payload: number
      });
    },
    setQuestion: (index) => {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: index
      });
    },
    setData: (dataObj) => {
      dispatch({
        type: "SET_DATA",
        payload: dataObj
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);