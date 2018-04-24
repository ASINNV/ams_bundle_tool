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
  currentQuestion: 0
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

const store = createStore(combineReducers({clientReducer, projectReducer, questionReducer}), applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
