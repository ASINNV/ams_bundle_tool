import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilter from '@fortawesome/fontawesome-free-solid/faFilter';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight';
import { GoalsWindow } from './AncillaryComponents';

// const theWindow=window,
//   theDoc=document,
//   theEle=theDoc.documentElement,
//   theBody=theDoc.getElementsByTagName('body')[0],
//   theWindowWidth=theWindow.innerWidth||theEle.clientWidth||theBody.clientWidth,
//   theWindowHeight=theWindow.innerHeight||theEle.clientHeight||theBody.clientHeight;


class Goals extends Component {

  componentDidMount(e) {
    // SET CURRENT STEP TO GOALS (1)
    this.props.setCurrentStep(1); // sets current step to 1

    let currentCategory = this.props.appReducer.currentCategory;
    // let currentCategoryPage = this.props.appReducer.currentCategoryPage;
    let categoryButtons = document.getElementsByClassName('pill-button');

    // if (currentCategoryPage === 1) {
    //   document.getElementById('left-arrow').style.display = 'none';
    // }


    for (let i = 0; i < categoryButtons.length; i++) {
      categoryButtons.item(i).className = 'pill-button';
    }

    console.log('CURRENT CATEGORY IS THE FOLLOWING: ', currentCategory);

    switch (currentCategory) {
      case null:
        categoryButtons.item(0).className += " active-goal-page";
        break;
      case 'XX1':
        categoryButtons.item(1).className += " active-goal-page";
        break;
      case 'XX2':
        categoryButtons.item(2).className += " active-goal-page";
        break;
      case 'XX3':
        categoryButtons.item(3).className += " active-goal-page";
        break;
      case 'XX4':
        categoryButtons.item(4).className += " active-goal-page";
        break;
      default:
        categoryButtons.item(0).className += " active-goal-page";
    }
  }

  changeGoalPage(e) {
    console.log(e.target);
    let targe = e.target;
    let rightArrow = document.getElementById('right-arrow');
    let pillButtons = document.getElementsByClassName('pill-button');
    let categoryGoals = [];

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

          if (this.props.appReducer.currentCategory !== null) {
          categoryGoals = this.props.appReducer.goals;
            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentGoalCategoryPage(null);
          }

          break;
        case "pill-button-1":

          if (this.props.appReducer.currentCategory !== "XX1") {
           categoryGoals = this.props.appReducer.goals.filter((goal) => {

              if (goal.code.indexOf("XX1") !== -1) {
                return goal;
              } else {
                return false;
              }
            });

            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentGoalCategoryPage("XX1");
          }

          break;
        case "pill-button-2":

          if (this.props.appReducer.currentCategory !== "XX2") {
           categoryGoals = this.props.appReducer.goals.filter((goal) => {

              if (goal.code.indexOf("XX2") !== -1) {
                return goal;
              } else {
                return false;
              }
            });

            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentGoalCategoryPage("XX2");
          }

          break;
        case "pill-button-3":

          if (this.props.appReducer.currentCategory !== "XX3") {
           categoryGoals = this.props.appReducer.goals.filter((goal) => {

              if (goal.code.indexOf("XX3") !== -1) {
                return goal;
              } else {
                return false;
              }
            });

            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentGoalCategoryPage("XX3");
          }

          break;
        case "pill-button-4":

          if (this.props.appReducer.currentCategory !== "XX4") {
           categoryGoals = this.props.appReducer.goals.filter((goal) => {

              if (goal.code.indexOf("XX4") !== -1) {
                return goal;
              } else {
                return false;
              }
            });

            this.props.setCategoryGoals(categoryGoals);
            this.props.setCurrentGoalCategoryPage("XX4");
          }

          break;
        default:
          console.log('fell to the default case in changeGoalPage()');
      }

      this.props.setCurrentGoalCategoryPage(1);

      if (categoryGoals.length > 8 && rightArrow !== null) {
        console.log('hey what the fuck is going on here!>!>!>!?!?!?!?!?!?!?!');
        rightArrow.style.display = '';
      }
    }
  }

  showMoreGoals(e) {
    // SET TARGET EQUAL TO UPPERMOST PARENT
    let target = e.target;
    while (target.id.indexOf("-arrow") === -1) { // while id doesn't match
      target = target.parentNode; // set target equal to its parent
    }

    let categoryGoals = this.props.appReducer.categoryGoals;
    let currentGoalCategoryPage = this.props.appReducer.currentGoalCategoryPage;
    let totalPages = Math.ceil(categoryGoals.length/8);

    // let leftArrow = document.getElementById('left-arrow');
    let rightArrow = document.getElementById('right-arrow');
    let workingPage = 1;


    switch (target.id) {
      case "left-arrow":
        if (currentGoalCategoryPage > 1) {
          workingPage = currentGoalCategoryPage - 1;
          this.props.setCurrentGoalCategoryPage(workingPage);
        } else {
          console.log("You want to go to the previous page of goals, don't you? No dice!");
        }
        break;
      case "right-arrow":
        if (currentGoalCategoryPage < totalPages) {
          workingPage = currentGoalCategoryPage + 1;
          this.props.setCurrentGoalCategoryPage(workingPage);
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

  render() {

    return (
      <div id="goals-body" className="page-body">



        <div id="goals-torso">

          {this.props.appReducer.currentGoalCategoryPage > 1 ? <FontAwesomeIcon icon={faArrowLeft} id="left-arrow" className="nav-arrow" onClick={this.showMoreGoals.bind(this)}/> : false}

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

          <GoalsWindow page="goals" appReducer={this.props.appReducer} clientReducer={this.props.clientReducer} setCurrentGoal={this.props.setCurrentGoal} setClientGoals={this.props.setClientGoals} setClientServices={this.props.setClientServices}/>
          {console.log(this.props.appReducer.categoryGoals.length + ' is how many goals are in the category goals array')}
          {this.props.appReducer.categoryGoals.length > 8 ? <FontAwesomeIcon icon={faArrowRight} id="right-arrow" className="nav-arrow" onClick={this.showMoreGoals.bind(this)}/> : false}

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

export default connect(mapStateToProps, mapDispatchToProps)(Goals);