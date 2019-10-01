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

var store = createStoreWithMiddleware(reducers);

//console.log(storage);



const mobileAppMode = false;

//var nowSave = true;

window.storageReference = store.getState();
window.saveAppState = false;
window.saveMemoryState = false;

store.subscribe( function () {
  console.log("listener activated");
  //console.log(store.getState());
  //console.log(window.nowSave);
  /*if(nowSave || window.nowSave)
  {
    console.log("Im going to save");
    console.log(window.storageReference);
    window.nowSave = false;
    nowSave = false;
    setTimeout(function(){
      nowSave = true;
      saveState(store.getState());
      window.storageReference = store.getState();
      console.log(store.getState());
    }, 3500);
  }*/

  if(window.saveMemoryState)
  {
    setTimeout(function(){

      let currentState = store.getState();

      if(window.storageReference)
      {
        if(currentState.memory==  window.storageReference.memory)
        {
          console.log("Storage igual, no guardo");
          return;
        }
      }

      saveState(store.getState(),false,true);

      window.saveMemoryState = false;
      window.storageReference = currentState;

    }, 1500);
  }

  if(!navigator.onLine && window.saveMemoryState == false)
  {
    console.log("intento guardar memoria offline");
    setTimeout(function(){
      let currentState = store.getState();
      if(window.storageReference)
      {
        if(currentState.memory ==  window.storageReference.memory)
        {
          console.log("Storage de memoria igual, no guardo");
          return;
        }
        else{
          saveState(store.getState(),false,true);
          window.storageReference = currentState;
        }
      }

    }, 1500);

  }

  if(window.saveAppState)
  {
    setTimeout(function(){

      let currentState = store.getState();

      if(window.storageReference)
      {
        if(currentState.appState ==  window.storageReference.appState)
        {
          console.log("Storage igual, no guardo");
          return;
        }
      }

      saveState(store.getState(),true,false);

      window.saveAppState = false;
      window.storageReference = currentState;

    }, 1500);
  }

});

const appInit = () => {

  if(window.cordova)
  {

    //var myWorker = new Worker("background.js");

    /*myWorker.onmessage = function (oEvent) {
      console.log(oEvent.data);
    };*/

    /*createFile("memoryStorage.txt","this is a test");
    setTimeout(function(){
      let a = (data) => {
        console.log("data in file "+data);
      }
      readFile("memoryStorage.txt",a);
    }, 10000);*/
    document.addEventListener("pause", ()=>{
      console.log("I am on pause");

    }, false);

    document.addEventListener("resume", ()=>{
      console.log("I am on resume");

    },false);


    document.addEventListener("menubutton", ()=>{
      console.log("I am on menubutton");

    },false);

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
