import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import App from './App';
import Login from './pages/Login';
import ProjectManagement from './pages/ProjectManagement';
import ProjectList from './pages/ProjectList';
import ForestalUnitList from './pages/ForestalUnitList';
import FormInventory from './pages/FormInventory';
import AppNavigation from './pages/AppNavigation';
import FormProcess from './pages/FormProcess';
import FormCompensation from './pages/FormCompensation';



//risks

import RiskManagement from './pages/RiskManagement/RiskManagement';
import TunnelDeformation from './pages/RiskManagement/TunnelDeformation';
import Rainfall from './pages/RiskManagement/Rainfall';
import HillsideCollapse from './pages/RiskManagement/HillsideCollapse';
import RiverCollapse from './pages/RiskManagement/RiverCollapse';
import RiskIndicators from './pages/RiskManagement/RiskIndicators';
import HillsideMovement from './pages/RiskManagement/HillsideMovement';



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
<<<<<<< HEAD
  ReactDOM.render(<Provider store={store}>
=======
  ReactDOM.render(<Provider store={store}>  
>>>>>>> 27168855fbf6650c8b5585db5996ff601328c649
    <AppNavigation/>
  </Provider>, document.getElementById('root'));

if (window.cordova) document.addEventListener("deviceready", appInit);
else appInit();




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
