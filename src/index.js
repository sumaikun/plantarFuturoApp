import React from 'react';
import ReactDOM from 'react-dom';


import { VERSION  } from  './flux/types';

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

const initialData = loadState();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

////console.log(storage);

const mobileAppMode = true;

var saveNowInStorage = true;

store.subscribe( function () {
  ////console.log("listener activated");
  ////console.log(store.getState());

    if(saveNowInStorage)
    {
      saveNowInStorage = false;
      setTimeout(function(){
        saveNowInStorage = true;
        console.log("now save in storage");
        saveState(store.getState());

        /*window.NativeStorage.getItem("state",(state)=>{
        },(error)=>{
          console.log("soy un error al verificar el estado");
          console.log(error);
        });*/

      }, 22000);

    }else{
      //console.log("save prevented");
    }


});



const appInit = () =>
{

  if(window.cordova)
  {
    window.NativeStorage.getItem("VERSION",(version)=>{

        try{
          console.log("soy la version "+version);
          if(version != VERSION)
          {
            console.log("Vaciando memoría");
            window.NativeStorage.clear(()=>{
              console.log("Data cleared");
            },(error)=>{
              console.log("error clearing data");
              console.log(error);
            });
            window.NativeStorage.setItem("VERSION",VERSION, null, null);
          }
        }
        catch(error){
          console.log(error);
        }

    },(error)=>{

      try{
        console.log("soy un error de version");
        console.log(error);
        window.NativeStorage.clear(()=>{
          console.log("Data cleared");
        },(error)=>{
          console.log("error clearing data");
          console.log(error);
        });
        window.NativeStorage.setItem("VERSION",VERSION, null, null);
      }
      catch(error){
        console.log(error);
      }

    });
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
