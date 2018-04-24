import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";

const theWindow=window,
  theDoc=document,
  theEle=theDoc.documentElement,
  theBody=theDoc.getElementsByTagName('body')[0],
  // theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth,
  theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;

function apiCaller(path, initObj) {
  if (initObj !== undefined) {
    fetch(path, initObj)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log(err, ' in the app.js apiCaller if block');
      })
  } else {
    fetch(path)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log(err, ' in the app.js apiCaller else block');
      })
  }
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
    // apiCaller('/api/clients');

    // let question = document.getElementById('qa-couplet-0');
    // let nextQuestion = document.getElementById('qa-couplet-1');

    // question.style.transform = "translateY(-50%)";
    // nextQuestion.style.transform = "translateY(-25%)";

    let couplets = document.getElementsByClassName('qa-couplet');

    for (let i = 0; i < couplets.length; i++) {

      couplets.item(i).style.transform = "translateY(" + (Number(theWindowHeight/2 + (i*(theWindowHeight/4))) - (couplets.item(i).getBoundingClientRect().height/2)) + "px)";
      setTimeout(function() {
        couplets.item(i).style.transition = "transform 1s ease-in-out, opacity 0.5s ease-in-out";
      }, 1);

      if (i === this.props.question.currentQuestion) {

        couplets.item(i).style.opacity = 1;
        couplets.item(i).childNodes[1].childNodes[0].focus();

      } else if (i < this.props.question.currentQuestion - 1 || i > this.props.question.currentQuestion + 1) {
        couplets.item(i).style.opacity = 0;
      } else {
        couplets.item(i).style.opacity = 0.125;
      }

    }

    // setTimeout(function() {
    //   question.style.transform = "translateY(" + window.innerHeight/2 + "px)";
    //   // question.style.transform = "translateY(-50%) scale(1)";
    //   question.style.opacity = 1;
    //   question.childNodes[1].childNodes[0].focus();
    //
    //   nextQuestion.style.transform = "translateY(" + ((window.innerHeight/4)*3) + "px)";
    //   // nextQuestion.style.transform = "translateY(-50%) scale(0.8)";
    //   nextQuestion.style.opacity = 0.125;
    // }, 200);

    console.log(this.props.client);
  }

  saveName() {
    let name = document.getElementById('client_name').value; // get value from client_name input field
    this.props.setClientName(name); // store client_name in state
  }

  nextQuestion(e) {
    console.log(e.which);
    console.log('The current question is ' + this.props.question.currentQuestion);
    if (e.which === 13 || e.which === 9) {

      let couplets = document.getElementsByClassName('qa-couplet');
      let currentQuestion = this.props.question.currentQuestion;

      for (let i = 0; i < couplets.length; i++) {

        // if (i < (this.props.question.currentQuestion - 1) || i > (this.props.question.currentQuestion + 1)) {
        //   couplets.item(i).style.opacity = 0;
        // } else if (i === this.props.question.currentQuestion || i === this.props.question.currentQuestion - 2) {
        //   couplets.item(i).style.opacity = 0.125;
        // } else {
        //   couplets.item(i).style.opacity = 1;
        //   couplets.item(i).style.color = 'red';
        //   if (e.which === 13) {
        //     couplets.item(i).childNodes[1].childNodes[0].focus();
        //   }
        // }


        if (i < currentQuestion) {
          couplets.item(i).style.opacity = 0;
        }

        if (i === currentQuestion) {
          couplets.item(i).style.opacity = 0.125;
          // if (couplets.item((i + 1))) {
          //   couplets.item((i + 1)).style.opacity = 1;
          // }
        }

        if (i === currentQuestion + 1) {
          couplets.item(i).style.opacity = 1;
          if (e.which === 13) {
            couplets.item(i).childNodes[1].childNodes[0].focus();
          }
        }

        if (i > (currentQuestion + 1)) {
          couplets.item(i).style.opacity = 0.125;
        }

        couplets.item(i).style.transform = "translateY(" + (Number(couplets.item(i).style.transform.slice(11, -3)) - theWindowHeight/4) + "px)";

        this.props.setQuestion(this.props.question.currentQuestion + 1);
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
      this.props.setClientObj(obj);

    }

      // if (this.props.question.secondLastQuestion !== -1 && this.props.question.secondLastQuestion !== null) {
      //   let secondLastQuestion = document.getElementById('qa-couplet-' + this.props.question.secondLastQuestion);
      //   // secondLastQuestion.style.transform = "translateY(-2000%)";
      //   secondLastQuestion.style.transform = "translateY(" + (secondLastQuestion.getBoundingClientRect().height*(-1)) + "px)";
      //   // secondLastQuestion.style.transform = "translateY(-50%) scale(1.2)";
      //   // secondLastQuestion.style.opacity = 0;
      //   secondLastQuestion.style.opacity = 0;
      // }
      // if (this.props.question.lastQuestion !== -1) {
      //   let lastQuestion = document.getElementById('qa-couplet-' + this.props.question.lastQuestion);
      //   // lastQuestion.style.transform = "translateY(-2000%)";
      //   lastQuestion.style.transform = "translateY(" + window.innerHeight/4 + "px)";
      //   // lastQuestion.style.transform = "translateY(-50%) scale(1.2)";
      //   // lastQuestion.style.opacity = 0;
      //   lastQuestion.style.opacity = 0.125;
      // }
      // if (document.getElementById('qa-couplet-' + this.props.question.currentQuestion)) {
      //   let question = document.getElementById('qa-couplet-' + this.props.question.currentQuestion);
      //   // question.style.transform = "translateY(-50%)";
      //   question.style.transform = "translateY(" + window.innerHeight/2 + "px)";
      //   // question.style.transform = "translateY(-50%) scale(1)";
      //   question.style.opacity = 1;
      //   if (e.which === 13) {
      //     question.childNodes[1].childNodes[0].focus();
      //   }
      //   this.props.setQuestion(this.props.question.currentQuestion + 1);
      // }
      //
      // if (document.getElementById('qa-couplet-' + (this.props.question.currentQuestion + 1))) {
      //   let nextQuestion = document.getElementById('qa-couplet-' + (this.props.question.currentQuestion + 1));
      //   // nextQuestion.style.transform = "translateY(-25%)";
      //   nextQuestion.style.transform = "translateY(" + ((window.innerHeight/4)*3) + "px)";
      //   // nextQuestion.style.transform = "translateY(-50%) scale(0.8)";
      //   nextQuestion.style.opacity = 0.125;
      // }


    }


  editAnswer(e) {
    let couplets = document.getElementsByClassName('qa-couplet');
    let currentQuestion = this.props.question.currentQuestion;

    let target = e.target;
    while (target.id.indexOf("qa-couplet-") === -1) {
      target = target.parentNode;
    }


    if (currentQuestion < (couplets.length + 1)) {
      let idNumber = Number(target.id.slice(-1));

      if (idNumber > currentQuestion) {

        for (let i = 0; i < couplets.length; i++) {


          if (i < currentQuestion) {
            couplets.item(i).style.opacity = 0;
          }

          if (i === currentQuestion) {
            couplets.item(i).style.opacity = 0.125;
            // if (couplets.item((i + 1))) {
            //   couplets.item((i + 1)).style.opacity = 1;
            // }
          }

          if (i === currentQuestion + 1) {
            couplets.item(i).style.opacity = 1;
            couplets.item(i).childNodes[1].childNodes[0].focus();
          }

          if (i > (currentQuestion + 1)) {
            couplets.item(i).style.opacity = 0.125;
          }

          couplets.item(i).style.transform = "translateY(" + (Number(couplets.item(i).style.transform.slice(11, -3)) - theWindowHeight/4) + "px)";

          this.props.setQuestion(this.props.question.currentQuestion + 1);
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
        // this.props.setClientObj(obj);



      } else if (idNumber < currentQuestion) {
        for (let i = 0; i < couplets.length; i++) {

          if (i > currentQuestion) {
            couplets.item(i).style.opacity = 0;
          }

          if (i === currentQuestion) {
            couplets.item(i).style.opacity = 0.125;
            // if (couplets.item((i + 1))) {
            //   couplets.item((i + 1)).style.opacity = 1;
            // }
          }

          if (i === currentQuestion - 1) {
            couplets.item(i).style.opacity = 1;
            couplets.item(i).childNodes[1].childNodes[0].focus();
          }

          if (i < (currentQuestion - 1)) {
            couplets.item(i).style.opacity = 0.125;
          }

          couplets.item(i).style.transform = "translateY(" + (Number(couplets.item(i).style.transform.slice(11, -3)) + theWindowHeight/4) + "px)";

          this.props.setQuestion(this.props.question.currentQuestion - 1);
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
        // this.props.setClientObj(obj);
      } else {

      }
    }

  }

  render() {
    return (
        <div id="client-info-body">

          {/*<span className="movement">Press Me</span>*/}

          {/*<p className="buttons" onClick={this.createProject.bind(this)}>create new project</p>*/}
          <div id="stream" onKeyDown={this.nextQuestion.bind(this)}>
            <div onClick={this.editAnswer.bind(this)} id="qa-couplet-0" className="qa-couplet">
              <div className="question">
                <label htmlFor="name">What is your name?</label>
              </div>
              <div className="answer">
                <input type="text" name="name" id="contact_name" placeholder="Your Full Name"/>
                {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
              </div>
            </div>

            <div onClick={this.editAnswer.bind(this)} id="qa-couplet-1" className="qa-couplet">
              <div className="question">
                <label htmlFor="company-name">What is your company name?</label>
              </div>
              <div className="answer">
                <input type="text" name="company-name" id="company_name" placeholder="Your Company Name"/>
                {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
              </div>
            </div>

            <div onClick={this.editAnswer.bind(this)} id="qa-couplet-2" className="qa-couplet">
              <div className="question">
                <label htmlFor="email">What is your email?</label>
              </div>
              <div className="answer">
                <input type="text" name="email" id="email" placeholder="Your Email"/>
                {/*<button className="buttons" onClick={this.saveName.bind(this)}>enter</button>*/}
              </div>
            </div>
          </div>

        </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    client: state.clientReducer,
    project: state.projectReducer,
    question: state.questionReducer
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);