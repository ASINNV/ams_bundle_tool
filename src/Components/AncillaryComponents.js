import React, { Component } from 'react';

export class GoalsWindow extends Component {

  addGoal(e) {

    let appReducer = this.props.appReducer;
    let currentGoal = appReducer.currentGoal;
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
      if (clientGoals[i] === this.props.appReducer.goals[currentGoal]) { // if clicked goal is found in client goals already
        count++; // increment count to indicate a match
      }
    }

    // ADDS CLICKED GOAL TO SAVED CLIENT GOALS IF NOT ALREADY IN IT, OTHERWISE LOGS CLIENT GOALS
    if (count === 0) { // if clicked goal isn't already in saved client goals
      clientGoals.push(appReducer.goals[currentGoal]); // add clicked goal to working copy of client goals
      this.props.setClientGoals(clientGoals); // overwrite stored client goals with working copy
    } else {
      let newClientGoals = clientGoals.filter((goal) => {
        if (goal === appReducer.goals[currentGoal]) {
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

  render() {
    let clientGoals = this.props.clientReducer.goals;

    // let categoryGoals = this.props.appReducer.goals.filter((goal) => {
    //   if (goal.code === "CREATE") {
    //     return goal;
    //   } else {
    //     return false;
    //   }
    // });

    return (
      <div id="goals-torso-goals">
        {this.props.appReducer.categoryGoals.map((goal, i) => {
          let currentCategoryPage = this.props.appReducer.currentCategoryPage;
          if (i >= (currentCategoryPage - 1) * 8 && i < currentCategoryPage * 8) {
            return (
              <div id={"goal-" + (goal.id - 1)} key={i} className="goal-card" onClick={this.addGoal.bind(this)} onMouseEnter={this.highlightGoal.bind(this)}>
                <p className="goal-heading">{goal.name}</p>
                {this.checkIfClientGoal(clientGoals, goal) ? <p className="checkmark" /> : false}
              </div>
            );
          } else {
            return false;
          }
        })}
      </div>
    );
  }
}