import React from 'react';
import ReactDOM from 'react-dom';

//assets

import './index.css';
import './css/App.css';
import './css/Login.css';
//import App from './App';

import AppNavigation from './pages/main/AppNavigation';

//errorHandler

import ErrorBoundary from './containers/ErrorBoundary';

//risks



//Inventory



//plantation



import * as serviceWorker from './serviceWorker';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

//REDUX
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./flux/reducers/";

//localStorage
import {loadState, saveState} from './helpers/appStorage';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

store.subscribe( function () {
  //console.log("listener activated");
  //console.log(store.getState());
  saveState(store.getState())
})

const appInit = _ =>
  ReactDOM.render(<Provider store={store}>
    <ErrorBoundary>
      <AppNavigation/>
    </ErrorBoundary>
  </Provider>, document.getElementById('root'));

if (window.cordova) document.addEventListener("deviceready", appInit);
else appInit();




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
