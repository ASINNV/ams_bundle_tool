import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import registerServiceWorker from './registerServiceWorker';

const clientState = {
  client: {
    name: null,
    company: null,
    email: null,
    phone: null
  },
  project: {
    id: null,
    clientId: null,
    name: null,
    paymentMethod: null,
    bundle: {},
    services: null,
    startDate: null,
    dueDate: null
  },
  goals: [],
  stats: [
    {
      name: 'Sales',
      value: null
    },
    {
      name: 'Reach',
      value: null
    },
    {
      name: 'Accessibility',
      value: null
    },
    {
      name: 'Modernity',
      value: null
    }
  ]

};

const appState = {
  chosenBundle: -1,
  currentQuestion: 0,
  lastQuestion: -1,
  currentStep: -1,
  currentGoal: null,
  steps: ['Calibrate', 'Personalize', 'Decide', 'Review', 'Capitalize'],
  goals: [],
  categoryGoals: [],
  currentCategoryPage: 1,
  currentCategory: null,
  bundles: [],
  services: []
};

const clientReducer = (state = clientState, action) => {
  switch (action.type) {
    case "SET_CUSTOMER_DATA":
      state = {
        ...state,
        ...action.payload
      };
      break;
    case "SET_CLIENT_NAME":
      state = {
        ...state,
        client: {
          ...state.client,
          name: action.payload
        }
      };
      break;
    case "SET_CLIENT_COMPANY":
      state = {
        ...state,
        client: {
          ...state.client,
          company: action.payload
        }
      };
      break;
    case "SET_CLIENT_EMAIL":
      state = {
        ...state,
        client: {
          ...state.client,
          email: action.payload
        }
      };
      break;
    case "SET_CLIENT_PHONE":
      state = {
        ...state,
        client: {
          ...state.client,
          phone: action.payload
        }
      };
      break;
    case "SET_CLIENT_DISCOUNT":
      state = {
        ...state,
        client: {
          ...state.client,
          discount: action.payload
        }
      };
      break;
    case "SET_CLIENT_BUNDLE":
      state = {
        ...state,
        project: {
          ...state.project,
          bundle: action.payload
        }
      };
      break;
    case "SET_CLIENT_STATS":
      state = {
        ...state,
        client: {
          ...state.client,
          stats: action.payload
        }
      };
      break;
    case "SET_CLIENT_GOALS":
      state = {
        ...state,
        goals: action.payload
      };
      break;
    case "SET_CLIENT_ID":
      state = {
        ...state,
        project: {
          ...state.project,
          clientId: action.payload
        }
      };
      break;
    case "SET_PROJECT_NAME":
      state = {
        ...state,
        project: {
          ...state.project,
          name: action.payload
        }
      };
      break;
    case "SET_PROJECT_PAYMENT_METHOD":
      state = {
        ...state,
        project: {
          ...state.project,
          paymentMethod: action.payload
        }
      };
      break;
    case "SET_PROJECT_TOTAL":
      state = {
        ...state,
        project: {
          ...state.project,
          total: action.payload
        }
      };
      break;
    case "SET_PROJECT_SERVICES":
      state = {
        ...state,
        project: {
          ...state.project,
          services: action.payload
        }
      };
      break;
    case "SET_PROJECT_START_DATE":
      state = {
        ...state,
        project: {
          ...state.project,
          startDate: action.payload
        }
      };
      break;
    case "SET_PROJECT_DUE_DATE":
      state = {
        ...state,
        project: {
          ...state.project,
          dueDate: action.payload
        }
      };
      break;
    case "SET_PROJECT_ID":
      state = {
        ...state,
        project: {
          ...state.project,
          id: action.payload
        }
      };
      break;
    default:
      return state;
  }
  return state;
};

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case "SET_APP_DATA":
      state = {
        ...state,
        ...action.payload
      };
      break;
    case "SET_CURRENT_QUESTION":
      state = {
        ...state,
        lastQuestion: state.currentQuestion,
        currentQuestion: action.payload
      };
      break;
    case "SET_CURRENT_STEP":
      state = {
        ...state,
        currentStep: action.payload
      };
      break;
    case "SET_STEPS":
      state = {
        ...state,
        steps: action.payload
      };
      break;
    case "SET_GOALS":
      state = {
        ...state,
        goals: action.payload
      };
      break;
    case "SET_CATEGORY_GOALS":
      state = {
        ...state,
        categoryGoals: action.payload
      };
      break;
    case "SET_CURRENT_CATEGORY":
      state = {
        ...state,
        currentCategory: action.payload
      };
      break;
    case "SET_CURRENT_CATEGORY_PAGE":
      state = {
        ...state,
        currentCategoryPage: action.payload
      };
      break;
    case "SET_CURRENT_GOAL":
      state = {
        ...state,
        currentGoal: action.payload
      };
      break;
    case "SET_BUNDLES":
      state = {
        ...state,
        bundles: action.payload
      };
      break;
    case "SET_SERVICES":
      state = {
        ...state,
        services: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

const store = createStore(combineReducers({appReducer, clientReducer}), applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
