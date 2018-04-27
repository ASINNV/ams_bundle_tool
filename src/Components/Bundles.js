import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";

const theWindow=window,
  theDoc=document,
  theEle=theDoc.documentElement,
  theBody=theDoc.getElementsByTagName('body')[0],
  theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth;
  // theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;


class Bundles extends Component {

  componentDidMount() {
    let appData = this.props.appReducer;
    appData.currentStep = 2;
    this.props.setAppData(appData);
  }

  openBundle(e) {
    let targe = e.target;
    let button_text = document.getElementsByClassName('button-text');
    let classCards = document.getElementsByClassName('cards');
    var classInfos = document.getElementsByClassName('info');

    let closed = false;

    let cards = [];
    let infos = [];

    for (let i = 0; i < classCards.length; i++) {
      cards.push(classCards.item(i));
    }
    for (let i = 0; i < classInfos.length; i++) {
      infos.push(classInfos.item(i));
    }



    let cardRects = cards.map(function(card) {
      return card.getBoundingClientRect();
    });


    while (targe.id.indexOf('card') === -1) {
      targe = targe.parentNode;
    }

    let targeRect = targe.getBoundingClientRect();

    if (closed === false) { // if no cards expanded, expand clicked card and move others off-screen
      closed = true;
      cards.forEach(function(card, i) { // for each card, execute the following code:

        if (card !== targe) { // if card isn't the one that was clicked, execute the following code:
          card.style.transition = "transform 1s ease-in-out";
          targe.style.transition = "transform 1s ease-in-out, width 1s ease-in-out, left 1s ease-in-out";
          card.style.position = "absolute";
          card.style.minWidth = "25%";
          card.style.top = cardRects[i].top + "px";
          card.style.left = cardRects[i].left + "px";
          card.style.right = cardRects[i].right + "px";
          card.style.bottom = cardRects[i].bottom + "px";
          setTimeout(function() {

            // NEW CODE BELOW - MOVES ELEMENTS OFF-SCREEN IN LINEAR FASHION
            if (cardRects[i].left < targeRect.left) {
              card.style.transform = "translate3d(-" + targeRect.left + "px, 0, 0)";
            } else {
              card.style.transform = "translate3d(" + (theWindowWidth - targeRect.right) + "px, 0, 0)";
            }

            // OLD CODE BELOW - HAD ELEMENTS MOVE OFF-SCREEN IN OVERLAPPING FASHION
            // switch (i) {
            //   case 0:
            //     if (cardRects[i].left < targeRect.left) {
            //       card.style.transform = "translate3d(-" + cardRects[i].width + "px, 0, 0)";
            //     }
            //     console.log('this zero');
            //     break;
            //   case 1:
            //     if (cardRects[i].left < targeRect.left) {
            //       card.style.transform = "translate3d(-" + cardRects[i].width*2 + "px, 0, 0)";
            //     } else {
            //       card.style.transform = "translate3d(" + cardRects[i].width*3 + "px, 0, 0)";
            //     }
            //     console.log('this one');
            //     break;
            //   case 2:
            //     if (cardRects[i].left < targeRect.left) {
            //       card.style.transform = "translate3d(-" + cardRects[i].width*3 + "px, 0, 0)";
            //     } else {
            //       card.style.transform = "translate3d(" + cardRects[i].width*2 + "px, 0, 0)";
            //     }
            //     console.log('this two');
            //     break;
            //   case 3:
            //     if (cardRects[i].left < targeRect.left) {
            //       // card.style.transform = "translate3d(-" + cardRects[i].width*2 + "px, 0, 0)";
            //     } else {
            //       card.style.transform = "translate3d(" + cardRects[i].width + "px, 0, 0)";
            //     }
            //     console.log('this three');
            //     break;
            // }

          }, 50);
        } else { // if clicked card, execute the following code:
          infos[i].style.width = targeRect.width + "px";
          targe.style.position = "absolute";
          targe.style.minWidth = "25%";
          targe.style.top = targeRect.top + "px";
          targe.style.left = targeRect.left + "px";
          targe.style.right = targeRect.right + "px";
          targe.style.bottom = targeRect.bottom + "px";
          // button_text[i].innerText = "close";
          setTimeout(function() {
            targe.style.width = "100%";
            targe.style.transform = "translate3d(" + (targeRect.left*(-1)) + "px, 0, 0)"; // faster than using the 'left' css property
            // targe.style.left = 0;
            button_text[i].innerText = "close";
          }, 50);
        }

      });
    } else { // if looking at expanded card view, return cards back to origin position
      closed = false;
      cards.forEach(function(card, i) {
        if (card !== targe) {
          card.style.transform = "translate3d(0, 0, 0)";
        } else {
          targe.style.transform = "translate3d(0, 0, 0)";
          setTimeout(function() {
            targe.style.width = '';
          }, 20);
          button_text[i].innerText = "select";
        }
      });
    }
  }

  render() {

    return (
      <div id="bundles-body" className="page-body">
        <div id="container-0" className="container">
          <div id="card-1" className="cards" onClick={this.openBundle.bind(this)}>
            <div id="info-1" className="info">
              <p className="name">STARTER</p>
              <p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>
              <div className="buttons">
                <div id="button-1" className="button-bg"></div>
                <span id="button-text-1" className="button-text">select</span>
              </div>
            </div>
          </div>

          <div id="card-2" className="cards" onClick={this.openBundle.bind(this)}>
            <div id="info-2" className="info">
              <p className="name">ACCELERATOR</p>
              <p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>
              <div className="buttons">
                <div id="button-1" className="button-bg"></div>
                <span id="button-text-1" className="button-text">select</span>
              </div>
            </div>
          </div>

          <div id="card-3" className="cards" onClick={this.openBundle.bind(this)}>
            <div id="info-3" className="info">
              <p className="name">TURBO</p>
              <p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>
              <div className="buttons">
                <div id="button-1" className="button-bg"></div>
                <span id="button-text-1" className="button-text">select</span>
              </div>
            </div>
          </div>

          <div id="card-4" className="cards" onClick={this.openBundle.bind(this)}>
            <div id="info-4" className="info">
              <p className="name">CUSTOM</p>
              <p className="desc">This is a description and I don't know if you know what it means but hey, here it is.</p>
              <div className="buttons">
                <div id="button-1" className="button-bg"></div>
                <span id="button-text-1" className="button-text">select</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bundles);