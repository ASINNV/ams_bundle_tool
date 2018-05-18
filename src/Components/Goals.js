import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilter from '@fortawesome/fontawesome-free-solid/faFilter';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight';

// const theWindow=window,
//   theDoc=document,
//   theEle=theDoc.documentElement,
//   theBody=theDoc.getElementsByTagName('body')[0],
//   theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth,
//   theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;

class GoalsWindow extends Component {

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
      if (clientGoals[i].name === categoryGoal.name) {
        return true;
      }
    }
  }

  render() {
    let clientGoals = this.props.clientReducer.goals;
    // let categoryGoals = this.props.appReducer.goals.filter((goal) => {
    //   if (goal.category === "CREATE") {
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


class Goals extends Component {

  componentDidMount(e) {
    // SET CURRENT STEP TO GOALS (1)
    this.props.setCurrentStep(1); // sets current step to 1

    let currentCategory = this.props.appReducer.currentCategory;
    let currentCategoryPage = this.props.appReducer.currentCategoryPage;
    let categoryButtons = document.getElementsByClassName('pill-button');

    if (currentCategoryPage === 1) {
      document.getElementById('left-arrow').style.display = 'none';
    }


    for (let i = 0; i < categoryButtons.length; i++) {
      categoryButtons.item(i).className = 'pill-button';
    }

    switch (currentCategory) {
      case 'ALL':
        categoryButtons.item(0).className += " active-goal-page";
        break;
      case 'CREATE':
        categoryButtons.item(1).className += " active-goal-page";
        break;
      case 'UPDATE':
        categoryButtons.item(2).className += " active-goal-page";
        break;
      case 'MANAGE':
        categoryButtons.item(3).className += " active-goal-page";
        break;
      case 'OTHER':
        categoryButtons.item(4).className += " active-goal-page";
        break;
      default:
        categoryButtons.item(0).className += " active-goal-page";
    }

    // let clientGoals = this.props.clientReducer.goals;
    // let cards = document.getElementsByClassName('goal-card');

    // for (let i = 0; i < cards.length; i++) {
    //   for (let j = 0; j < clientGoals.length; j++) {
    //     let cardId = Number(cards.item(i).id.slice(Number(cards.item(i).id.search(/\d/g))));
    //     let goalId = Number(clientGoals[j].id) - 1;
    //
    //     if (cardId === goalId) {
    //       let checkmark = document.createElement('p');
    //       checkmark.className = 'checkmark';
    //       cards.item(i).appendChild(checkmark);
    //       console.log(cardId, " - cardId inside block");
    //       console.log(goalId, " - goalId inside block");
    //     }
    //     // console.log(cardId, " - outside block");
    //     // console.log(goalId, " - outside block");
    //   }
    // }


    // let appData = this.props.appReducer;
    // appData.steps.forEach(function(step, i, steps) {
    //   if (step === steps[0]) {
    //     step.active = false;
    //     step.complete = true;
    //   } else if (step === steps[1]) {
    //     step.active = true;
    //     step.complete = false;
    //   } else {
    //     step.active = false;
    //     step.complete = false;
    //   }
    // });

    // let goals = document.getElementById('goals-body');
    // goals.style.transition = "transform .5s ease-in-out";
    // setTimeout(function() {
    //   goals.style.transform = "translateX(0)";
    // }, 10);

    // let context = this;
    // function nextPage() {
    //   context.props.history.push('/goals');
    // }
    // setTimeout(nextPage, 500);
  }

  changeGoalPage(e) {
    console.log(e.target);
    let targe = e.target;
    let pillButtons = document.getElementsByClassName('pill-button');

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

          if (this.props.appReducer.currentCategory !== "ALL") {
            this.props.setCategoryGoals(this.props.appReducer.goals);
            this.props.setCurrentCategory("ALL");
          }

          break;
        case "pill-button-1":

          if (this.props.appReducer.currentCategory !== "CREATE") {
            let categoryGoals = this.props.appReducer.goals.filter((goal) => {

              if (goal.category === "CREATE") {
                return goal;
              } else {
                return false;
              }
            });

            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentCategory("CREATE");
          }

          break;
        case "pill-button-2":

          if (this.props.appReducer.currentCategory !== "UPDATE") {
            let categoryGoals = this.props.appReducer.goals.filter((goal) => {

              if (goal.category === "UPDATE") {
                return goal;
              } else {
                return false;
              }
            });

            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentCategory("UPDATE");
          }

          break;
        case "pill-button-3":

          if (this.props.appReducer.currentCategory !== "MANAGE") {
            let categoryGoals = this.props.appReducer.goals.filter((goal) => {

              if (goal.category === "MANAGE") {
                return goal;
              } else {
                return false;
              }
            });

            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentCategory("MANAGE");
          }

          break;
        case "pill-button-4":

          if (this.props.appReducer.currentCategory !== "OTHER") {
            let categoryGoals = this.props.appReducer.goals.filter((goal) => {

              if (goal.category === "OTHER") {
                return goal;
              } else {
                return false;
              }
            });

            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentCategory("OTHER");
          }

          break;
        default:
          console.log('fell to the default case in changeGoalPage()');
      }

      this.props.setCurrentCategoryPage(1);

    }
  }

  showMoreGoals(e) {
    // SET TARGET EQUAL TO UPPERMOST PARENT
    let target = e.target;
    while (target.id.indexOf("-arrow") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }

    let categoryGoals = this.props.appReducer.categoryGoals;
    let currentCategoryPage = this.props.appReducer.currentCategoryPage;
    let totalPages = Math.ceil(categoryGoals.length/8);

    let leftArrow = document.getElementById('left-arrow');
    let rightArrow = document.getElementById('right-arrow');
    let workingPage = 1;


    switch (target.id) {
      case "left-arrow":
        if (currentCategoryPage > 1) {
          workingPage = currentCategoryPage - 1;
          this.props.setCurrentCategoryPage(workingPage);
        } else {
          console.log("You want to go to the previous page of goals, don't you? No dice!");
        }
        break;
      case "right-arrow":
        if (currentCategoryPage < totalPages) {
          workingPage = currentCategoryPage + 1;
          this.props.setCurrentCategoryPage(workingPage);
        } else {
          console.log("You want to go to the next page of goals, don't you? No dice!");
        }
        break;
      default:
        console.log('Fell to the default block in showMoreGoals() switch statement');
    }

    if (workingPage > 1 && leftArrow.style.display !== '') {
      leftArrow.style.display = '';
    } else if (workingPage === 1 && leftArrow.style.display === '') {
      leftArrow.style.display = 'none';
      console.log('this one this one this one this one this one');
    }

    if (workingPage === totalPages) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }


  }

  render() {

    return (
      <div id="goals-body" className="page-body">



        <div id="goals-torso">

          <FontAwesomeIcon icon={faArrowLeft} id="left-arrow" className="nav-arrow" onClick={this.showMoreGoals.bind(this)}/>

          <div className="goals-torso-heading-container">
            <h1 className="heading">Pick Your Goals</h1>
            <div className="filter-container">
              <div className="filter-label-container">
                <p className="filter-label">Categories</p>
                <FontAwesomeIcon icon={faFilter} id="" className="filter-icon" />
              </div>
              <div id="pill" className="pill-buttons-container" onClick={this.changeGoalPage.bind(this)}>
                <p id="pill-button-0" className="pill-button">All</p>
                <p id="pill-button-1" className="pill-button">Create</p>
                <p id="pill-button-2" className="pill-button">Update</p>
                <p id="pill-button-3" className="pill-button">Manage</p>
                <p id="pill-button-4" className="pill-button">Other</p>
              </div>
            </div>
          </div>

          <GoalsWindow appReducer={this.props.appReducer} clientReducer={this.props.clientReducer} setCurrentGoal={this.props.setCurrentGoal} setClientGoals={this.props.setClientGoals}/>

          <FontAwesomeIcon icon={faArrowRight} id="right-arrow" className="nav-arrow" onClick={this.showMoreGoals.bind(this)}/>

        </div>



        <div id="goals-shoulder">
          <div id="container-0" className="container">
            <div className="info-section">
              <div className="info-panel">
                <h1 className="heading noselect">Detail Panel</h1>
              </div>
              <div className="info-panel">
                <div id="stats" className="">
                  <div id="stat-panel">
                    <div className="goal-sidebar-heading-container">
                      <h3 className="goal-sidebar-heading">COMPANY STATS</h3>
                    </div>
                    <div id="graph">
                      {this.props.clientReducer.stats.map((stat, i) => {
                        return (
                          <div className="stat-info" key={i}>
                            <h4 className="stat-name">{stat.name}</h4>
                            <div className="stat-case">
                              <div className="stat" style={{width: (stat.value ? stat.value + '%' : '0')}}></div>
                              <div id={"additional-stat-" + i} className="additional-stat"></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">GOAL NAME</h3>
                </div>
                <p className="goal-sidebar-name">{this.props.appReducer.currentGoal !== null ? this.props.appReducer.goals[this.props.appReducer.currentGoal].name : "N/A"}</p>
              </div>
              <div id="" className="info-panel">
                <div className="goal-sidebar-heading-container">
                  <h3 className="goal-sidebar-heading">GOAL DESC</h3>
                </div>
                <p className="goal-sidebar-desc overflowing">{this.props.appReducer.currentGoal !== null ? this.props.appReducer.goals[this.props.appReducer.currentGoal].description : "Mouse over a goal to see its description here."}</p>
              </div>
              <Link to="/decide" className="buttons continue-button">
                <div id="button-1" className="button-bg"></div>
                <p id="button-text-1" className="button-text">next step &rarr;</p>
              </Link>
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
    setCategoryGoals: (goalsArray) => {
      dispatch({
        type: "SET_CATEGORY_GOALS",
        payload: goalsArray
      });
    },
    setCurrentCategory: (category) => {
      dispatch({
        type: "SET_CURRENT_CATEGORY",
        payload: category
      });
    },
    setCurrentCategoryPage: (pageNumber) => {
      dispatch({
        type: "SET_CURRENT_CATEGORY_PAGE",
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

export default connect(mapStateToProps, mapDispatchToProps)(Goals);