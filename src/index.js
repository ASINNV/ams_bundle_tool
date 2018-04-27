import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import registerServiceWorker from './registerServiceWorker';

// const clientState= {
//   contact_name: null,
//   company_name: null,
//   email: null,
//   phone: null,
//   discount: null
// };
// const projectState = {
//   client_id: null,
//   name: null,
//   status: null,
//   payment_method: null,
//   total: null,
//   bundle_name: null,
//   bundle_id: null,
//   services: null,
//   start_date: null,
//   due_date: null
// };
// const questionState = {
//   currentQuestion: 0,
// };
// const progressState = {
//   currentStep: -1,
//   steps: [
//     {
//       name: 'Calibrate',
//       complete: false,
//       active: false,
//       data: null
//     },
//     {
//       name: 'Personalize',
//       bgColor: '#FBD1A2',
//       color: '#74B48E',
//       complete: false,
//       active: false,
//       data: null
//     },
//     {
//       name: 'Decide',
//       bgColor: '#7DCFB6',
//       color: '#FFD79A',
//       complete: false,
//       active: false,
//       data: null
//     },
//     {
//       name: 'Review',
//       bgColor: '#00B2CA',
//       color: '#FFAE00',
//       complete: false,
//       active: false,
//       data: null
//     },
//     {
//       name: 'Capitalize',
//       bgColor: '#1D4E89',
//       color: '#D15F1E',
//       complete: false,
//       active: false,
//       data: null
//     }]
//
// };

// const questionReducer = (state = questionState, action) => {
//   switch (action.type) {
//     case "SET_CURRENT_QUESTION":
//       state = {
//         ...state,
//         currentQuestion: action.payload
//       };
//       break;
//     default:
//       return state;
//   }
//   return state;
// };

// const clientReducer = (state = clientState, action) => {
//   switch (action.type) {
//     case "SET_CLIENT_OBJ":
//       state = {
//         ...state,
//         ...action.payload
//       };
//       break;
//     default:
//       return state;
//   }
//   return state;
// };


const projectState = {
  client: {
    contact_name: null,
    company_name: null,
    email: null,
    phone: null,
    discount: null
  },
  project: {
    client_id: null,
    name: null,
    status: null,
    payment_method: null,
    total: null,
    bundle_name: null,
    bundle_id: null,
    services: null,
    start_date: null,
    due_date: null
  },

};

const appState = {
  currentQuestion: 0,
  currentStep: -1,
  steps: [
    {
      name: 'Calibrate',
      complete: false,
      active: false,
      data: null
    },
    {
      name: 'Personalize',
      complete: false,
      active: false,
      data: null
    },
    {
      name: 'Decide',
      complete: false,
      active: false,
      data: null
    },
    {
      name: 'Review',
      complete: false,
      active: false,
      data: null
    },
    {
      name: 'Capitalize',
      complete: false,
      active: false,
      data: null
    }]
};

const projectReducer = (state = projectState, action) => {
  switch (action.type) {
    case "SET_PROJECT_DATA":
      state = {
        ...state,
        ...action.payload
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
    default:
      return state;
  }
  return state;
};

const store = createStore(combineReducers({appReducer, projectReducer}), applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
