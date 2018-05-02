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
// const sessionState = {
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


const sessionState = {
  client: {
    name: null,
    company: null,
    email: null,
    phone: null,
    discount: null,
    stats: [
      {
        name: 'Sales',
        value: 90
      },
      {
        name: 'Reach',
        value: 50
      },
      {
        name: 'Accessibility',
        value: 75
      },
      {
        name: 'Modernity',
        value: 25
      }
      ]
  },
  project: {
    clientId: null,
    name: null,
    goals: [],
    status: null,
    paymentMethod: null,
    total: null,
    bundleName: null,
    bundleId: null,
    services: null,
    startDate: null,
    dueDate: null
  },

};

const appState = {
  chosenBundle: -1,
  currentQuestion: 0,
  lastQuestion: 0,
  currentStep: -1,
  steps: ['Calibrate', 'Personalize', 'Decide', 'Review', 'Capitalize']
};

const sessionReducer = (state = sessionState, action) => {
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
    case "SET_CLIENT_STATS":
      state = {
        ...state,
        client: {
          ...state.client,
          stats: action.payload
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
    case "SET_PROJECT_GOALS":
      state = {
        ...state,
        project: {
          ...state.project,
          goals: action.payload
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
    case "SET_PROJECT_BUNDLE_NAME":
      state = {
        ...state,
        project: {
          ...state.project,
          bundleName: action.payload
        }
      };
      break;
    case "SET_PROJECT_BUNDLE_ID":
      state = {
        ...state,
        project: {
          ...state.project,
          bundleId: action.payload
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
    case "SET_CHOSEN_BUNDLE":
      state = {
        ...state,
        chosenBundle: action.payload
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
    default:
      return state;
  }
  return state;
};

const store = createStore(combineReducers({appReducer, sessionReducer}), applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
