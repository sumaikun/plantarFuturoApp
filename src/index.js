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

/*
import AsistantList from './pages/SST/AsistantList';
import GeoReferencingForm from './pages/InventoryManagement/GeoReferencingForm';
import InventoryUnitList from './pages/InventoryManagement/InventoryUnitList';
import MachineryForm from './pages/InventoryManagement/MachineryForm';

 */

//  Plantation
//import Establishment from './pages/Plantation/Plantation';

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

//writeFle

//import { createFile, readFile } from './helpers/writeFiles';

const initialData = loadState();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

//console.log(storage);

const mobileAppMode = true;

var nowSave = true;

store.subscribe( function () {
  //console.log("listener activated");
  //console.log(store.getState());
  if(nowSave)
  {
    nowSave = false;
    setTimeout(function(){
      nowSave = true;
      saveState(store.getState());
    }, 4000);
  }


});

const appInit = () => {

  if(window.cordova)
  {

    /*createFile("memoryStorage.txt","this is a test");
    setTimeout(function(){
      let a = (data) => {
        console.log("data in file "+data);
      }
      readFile("memoryStorage.txt",a);
    }, 10000);*/
  }

  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary>
        <AppNavigation/>
      </ErrorBoundary>
    </Provider>
    , document.getElementById('root'));
}


if(mobileAppMode)
{
  console.log("cordova app initialized");
  document.addEventListener("deviceready", appInit);
}
else
{
  //console.log("app initialized as normal react project");
  appInit();
}

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
