import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import registerServiceWorker from './registerServiceWorker';

const initialClientState = {
  company_name: null,
  contact_name: null,
  email: null,
  phone: null,
  discount: null
};
const initialProjectState = {
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

const clientReducer = (state = initialClientState, action) => {
  switch (action.type) {
    case "SET_CLIENT_NAME":
      state = {
        ...state,
        contact_name: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

const projectReducer = (state = initialProjectState, action) => {
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

const store = createStore(combineReducers({clientReducer, projectReducer}), applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
