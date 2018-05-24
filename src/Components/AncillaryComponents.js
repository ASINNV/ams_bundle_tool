import React, { Component } from 'react';

export class GoalsWindow extends Component {

  addGoal(e) {

    let appReducer = this.props.appReducer;
    let currentGoalId = appReducer.currentGoal;
    let currentGoal = appReducer.goals[currentGoalId];
    let clientGoals = this.props.clientReducer.goals;

    // SET TARGET EQUAL TO UPPERMOST PARENT
    let target = e.target;
    while (target.id.indexOf("goal-") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }

    // let checkmark = document.createElement('p');
    // checkmark.className = 'checkmark';
    //
    // if (target.lastChild.className === "checkmark") {
    //   target.removeChild(target.lastChild);
    // } else {
    //   target.appendChild(checkmark);
    // }

    // FUNCTION TO DETERMINE IF SAVED CLIENT GOALS ALREADY INCLUDES CLICKED GOAL
    let count = 0; // element match count
    for (let i = 0; i < clientGoals.length; i++) { // iterates over stored client goals
      if (clientGoals[i] === currentGoal) { // if clicked goal is found in client goals already
        count++; // increment count to indicate a match
      }
    }

    // ADDS CLICKED GOAL TO SAVED CLIENT GOALS IF NOT ALREADY IN IT, OTHERWISE LOGS CLIENT GOALS
    if (count === 0) { // if clicked goal isn't already in saved client goals
      clientGoals.push(appReducer.goals[currentGoalId]); // add clicked goal to working copy of client goals
      this.props.setClientGoals(clientGoals); // overwrite stored client goals with working copy
    } else {
      let newClientGoals = clientGoals.filter((goal) => {
        if (goal === appReducer.goals[currentGoalId]) {
          console.log('awesome');
        } else {
          return goal;
        }
        return false;
      });
      if (newClientGoals[0] === undefined) {
        this.props.setClientGoals([]); // overwrite stored client goals with empty array
      } else {
        this.props.setClientGoals(newClientGoals); // overwrite stored client goals with working copy
      }
    }

  }
  highlightGoal(e) {
    let target = e.target;

    while (target.id.indexOf("goal-") === -1) {
      target = target.parentNode;
    }

    let currentGoal = Number(target.id.slice(target.id.search(/\d/g)));

    if (this.props.appReducer.currentGoal !== currentGoal) {
      this.props.setCurrentGoal(currentGoal);
    }

  }
  checkIfClientGoal(clientGoals, categoryGoal) {
    for (let i = 0; i < clientGoals.length; i++) {
      if (clientGoals[i] === categoryGoal) {
        return true;
      }
    }
  }

  addService(e) {

    let appReducer = this.props.appReducer;
    let currentService = appReducer.currentService;
    let clientServices = this.props.clientReducer.services;

    // SET TARGET EQUAL TO UPPERMOST PARENT
    let target = e.target;
    while (target.id.indexOf("service-") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }

    // FUNCTION TO DETERMINE IF SAVED CLIENT GOALS ALREADY INCLUDES CLICKED GOAL
    let count = 0; // element match count
    for (let i = 0; i < clientServices.length; i++) { // iterates over stored client goals
      if (clientServices[i] === this.props.appReducer.services[currentService]) { // if clicked goal is found in client goals already
        count++; // increment count to indicate a match
      }
    }

    // ADDS CLICKED GOAL TO SAVED CLIENT GOALS IF NOT ALREADY IN IT, OTHERWISE LOGS CLIENT GOALS
    if (count === 0) { // if clicked goal isn't already in saved client goals
      clientServices.push(appReducer.services[currentService]); // add clicked goal to working copy of client goals
      this.props.setClientServices(clientServices); // overwrite stored client goals with working copy
    } else {
      let newClientServices = clientServices.filter((service) => {
        if (service === appReducer.services[currentService]) {
          console.log('awesome');
        } else {
          return service;
        }
        return false;
      });
      if (newClientServices[0] === undefined) {
        this.props.setClientServices([]); // overwrite stored client goals with empty array
      } else {
        this.props.setClientServices(newClientServices); // overwrite stored client goals with working copy
      }
    }

  }
  highlightService(e) {
    let target = e.target;

    while (target.id.indexOf("service-") === -1) {
      target = target.parentNode;
    }

    let currentService = Number(target.id.slice(target.id.search(/\d/g)));

    if (this.props.appReducer.currentService !== currentService) {
      this.props.setCurrentService(currentService);
    }

  }
  checkIfClientService(clientServices, categoryService) {
    for (let i = 0; i < clientServices.length; i++) {
      if (clientServices[i] === categoryService) {
        return true;
      }
    }
  }

  render() {
    if (this.props.page === "goals") {
      let clientGoals = this.props.clientReducer.goals;

      return (
        <div id="goals-torso-goals">
          {this.props.appReducer.categoryGoals.map((goal, i) => {
            let currentGoalCategoryPage = this.props.appReducer.currentGoalCategoryPage;
            if (i >= (currentGoalCategoryPage - 1) * 8 && i < currentGoalCategoryPage * 8) {
              return (
                <div id={"goal-" + (goal.id - 1)} key={i} className="item-card" onClick={this.addGoal.bind(this)} onMouseEnter={this.highlightGoal.bind(this)}>
                  <p className="item-heading">{goal.name}</p>
                  {this.checkIfClientGoal(clientGoals, goal) ? <p className="checkmark" /> : false}
                </div>
              );
            } else {
              return false;
            }
          })}
        </div>
      );
    } else if (this.props.page === "services") {
      let clientServices = this.props.clientReducer.services;

      return (
        <div id="goals-torso-goals">
          {this.props.appReducer.categoryServices.map((service, i) => {
            let currentServiceCategoryPage = this.props.appReducer.currentServiceCategoryPage;
            if (i >= (currentServiceCategoryPage - 1) * 8 && i < currentServiceCategoryPage * 8) {
              return (
                <div id={"service-" + (service.id - 1)} key={i} className="item-card" onClick={this.addService.bind(this)} onMouseEnter={this.highlightService.bind(this)}>
                  <p className="service-heading">{service.name}</p>
                  {this.checkIfClientService(clientServices, service) ? <p className="checkmark" /> : false}
                </div>
              );
            } else {
              return false;
            }
          })}
        </div>
      );
    }


    // let categoryGoals = this.props.appReducer.goals.filter((goal) => {
    //   if (goal.code === "CREATE") {
    //     return goal;
    //   } else {
    //     return false;
    //   }
    // });


  }
}