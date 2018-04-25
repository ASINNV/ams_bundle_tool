import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import registerServiceWorker from './registerServiceWorker';

const clientState= {
  contact_name: null,
  company_name: null,
  email: null,
  phone: null,
  discount: null
};
const projectState = {
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
};
const questionState = {
  currentQuestion: 0,
  questions: [
    {
      question: "What is your name?",
      coupletId: "0-qa-couplet",
      htmlFor: "name",
      inputId: "contact_name",
      inputType: "text",
      inputName: "name",
      inputPlaceholder: "Your Full Name"
    },
    {
      question: "What is your company's name?",
      coupletId: "1-qa-couplet",
      htmlFor: "company-name",
      inputId: "company_name",
      inputType: "text",
      inputName: "company-name",
      inputPlaceholder: "Your Company Name"
    },
    {
      question: "What is your email?",
      coupletId: "2-qa-couplet",
      htmlFor: "email",
      inputId: "email",
      inputType: "text",
      inputName: "email",
      inputPlaceholder: "Your Email"
    },
    {
      question: "What is your phone number?",
      coupletId: "3-qa-couplet",
      htmlFor: "name",
      inputId: "contact_name",
      inputType: "text",
      inputName: "name",
      inputPlaceholder: "Your Phone Number"
    }
  ]
};
const progressState = {
  currentStep: 0,
  steps: [
    {
      name: 'Calibrate',
      bgColor: '#F79256',
      color: '#416BA2',
      completed: true,
      data: null
    },
    {
      name: 'Personalize',
      bgColor: '#FBD1A2',
      color: '#74B48E',
      completed: false,
      data: null
    },
    {
      name: 'Decide',
      bgColor: '#7DCFB6',
      color: '#FFD79A',
      completed: false,
      data: null
    },
    {
      name: 'Review',
      bgColor: '#00B2CA',
      color: '#FFAE00',
      completed: false,
      data: null
    },
    {
      name: 'Capitalize',
      bgColor: '#1D4E89',
      color: '#D15F1E',
      completed: false,
      data: null
    }]

};

const clientReducer = (state = clientState, action) => {
  switch (action.type) {
    case "SET_CLIENT_OBJ":
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

const projectReducer = (state = projectState, action) => {
  switch (action.type) {
    case "SET_BUNDLE":
      state = {
        ...state,
        bundle: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

const questionReducer = (state = questionState, action) => {
  switch (action.type) {
    case "SET_CURRENT_QUESTION":
      state = {
        ...state,
        currentQuestion: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

const progressReducer = (state = progressState, action) => {
  switch (action.type) {
    case "SET_DATA":
      state = {
        ...state,
        steps: [
          ...state.steps,
          action.payload
        ]
      };
      break;
    default:
      return state;
  }
  return state;
};

const store = createStore(combineReducers({clientReducer, projectReducer, questionReducer, progressReducer}), applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
