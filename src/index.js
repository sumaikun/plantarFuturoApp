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

import AsistantList from './pages/InventoryManagement/AsistantList';
import GeoReferencingForm from './pages/InventoryManagement/GeoReferencingForm';
import InventoryUnitList from './pages/InventoryManagement/InventoryUnitList';
import MachineryForm from './pages/InventoryManagement/MachineryForm';

//plantation
import Establishment from './pages/Plantation/Establishment';

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

const initialData = loadState();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

//console.log(storage);

store.subscribe( function () {
  //console.log("listener activated");
  //console.log(store.getState());
  saveState(store.getState())
});

const appInit = _ =>
  ReactDOM.render(
      <Provider store={store}>
        <ErrorBoundary>
          <Establishment/>
        </ErrorBoundary>
      </Provider>
      , document.getElementById('root'));

if (window.cordova) document.addEventListener("deviceready", appInit);
else appInit();

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
