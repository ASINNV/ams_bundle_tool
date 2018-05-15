import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt';

class Review extends Component {

  componentDidMount() {

    // SET CURRENT STEP TO CAPITALIZE (4)
    this.props.setCurrentStep(4); // sets current step to 4

    // // HIDES PROGRESS BAR TO ELIMINATE NAVIGATION POSSIBILITY
    // let foundation = document.getElementById('foundation');
    // let pbHoverArea = document.getElementById('pb-hover-area');
    // pbHoverArea.style.transform = 'translateY(75px)';
    // setTimeout(function() {
    //   foundation.removeChild(pbHoverArea);
    // }, 500);

  }

  handlePrint() {
    // HIDES PROGRESS BAR AND FOUNDATION HEADER TO ELIMINATE NAVIGATION POSSIBILITY
    let foundationHeader = document.getElementById('foundation-header');
    let pbHoverArea = document.getElementById('pb-hover-area');
    let printButtonContainer = document.getElementById('print-button-container');
    let foundationHeaderRect = foundationHeader.getBoundingClientRect();
    let pbRect = pbHoverArea.getBoundingClientRect();
    foundationHeader.style.transform = 'translateY(-' + foundationHeaderRect.height + 'px)';
    pbHoverArea.style.transform = 'translateY(' + pbRect.height + 'px)';
    printButtonContainer.style.opacity = '0';
    setTimeout(function() {
      foundationHeader.style.transform = '';
      pbHoverArea.style.transform = '';
      printButtonContainer.style.opacity = '';
      // foundation.removeChild(pbHoverArea);
    }, 1);
    window.print();
  }

  render() {
    let date = new Date();
    let newdate = new Date(date);

    newdate.setDate(newdate.getDate() + 14);

    let dd = newdate.getDate();
    let mm = newdate.getMonth() + 1;
    let y = newdate.getFullYear();

    let someFormattedDate = mm + '/' + dd + '/' + y;
    return (
      <div id="goals-body" className="page-body">
        <div id="goals-torso">

        </div>
        <div id="goals-shoulder">
          <div id="container-0" className="container">

            <div id="" className="info-section">
              <div className="info-panel">
                <h1 className="heading noselect">Project Details</h1>
              </div>
              <div id="" className="confirmation-info-panel">
                <div className="confirmation-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">PROJECT ID</h3>
                </div>
                <p className="confirmation-info-item">{this.props.clientReducer.project.id || "N/A"}</p>
              </div>
              <div id="" className="confirmation-info-panel">
                <div className="confirmation-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">CLIENT ID</h3>
                </div>
                <p className="confirmation-info-item">{this.props.clientReducer.project.clientId || "N/A"}</p>
              </div>
              <div id="" className="confirmation-info-panel">
                <div className="confirmation-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">YOUR BUNDLE</h3>
                </div>
                <p className="confirmation-info-item">{this.props.clientReducer.project.bundle.name || "N/A"}</p>
              </div>
              <div id="" className="confirmation-info-panel">
                <div className="confirmation-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">TOTAL</h3>
                </div>
                <p className="confirmation-info-item">${this.props.clientReducer.project.bundle.price || "0"}</p>
              </div>
              <div id="" className="confirmation-info-panel">
                <div className="confirmation-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">START DATE</h3>
                </div>
                <p className="confirmation-info-item">{someFormattedDate}</p>
              </div>
              <div id="print-button-container" className="buttons continue-button" onClick={this.handlePrint.bind(this)}>
                <div id="button-1" className="button-bg"></div>
                <p id="button-text-1" className="button-text"><FontAwesomeIcon icon={faFileAlt} id="print-icon"/> PRINT PAGE</p>
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
    setBundles: (bundles) => {
      dispatch({
        type: "SET_CURRENT_GOAL",
        payload: bundles
      });
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);