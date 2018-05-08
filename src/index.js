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
    phone: null,
    discount: null,
    bundleName: null,
    bundleId: null,
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
  },
  project: {
    clientId: null,
    name: null,
    status: null,
    paymentMethod: null,
    total: null,
    services: null,
    startDate: null,
    dueDate: null
  },

};

const appState = {
  chosenBundle: -1,
  currentQuestion: 0,
  lastQuestion: -1,
  currentStep: -1,
  currentGoal: null,
  steps: ['Calibrate', 'Personalize', 'Decide', 'Review', 'Capitalize'],
  goals: []
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
      let name = null;
      switch(action.payload) {
        case 0:
          name = 'Starter';
          break;
        case 1:
          name = 'Accelerator';
          break;
        case 2:
          name = 'Turbo';
          break;
        case 3:
          name = 'Custom';
          break;
        default:
          console.log('fell to the default');
      }
      state = {
        ...state,
        client: {
          ...state.client,
          bundleName: name,
          bundleId: action.payload
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
        client: {
          ...state.client,
          goals: action.payload
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
    case "SET_PROJECT_STATUS":
      state = {
        ...state,
        project: {
          ...state.project,
          status: action.payload
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
    case "SET_CURRENT_GOAL":
      state = {
        ...state,
        currentGoal: action.payload
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
