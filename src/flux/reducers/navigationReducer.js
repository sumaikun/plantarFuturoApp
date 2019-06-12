import Login from "../../pages/Login"
import ProjectManagement from '../../pages/ProjectManagement'
import ProjectList from '../../pages/ProjectList'
import ForestalUnitList from '../../pages/ForestalUnitList'
import FormInventory from '../../pages/FormInventory'
import FormProcess from '../../pages/FormProcess'
import FormCompensation from '../../pages/FormCompensation'

//Risk Management

import HillsideCollapse from '../../pages/RiskManagement/HillsideCollapse'
import Rainfall from '../../pages/RiskManagement/Rainfall'
import RiskIndicators from '../../pages/RiskManagement/RiskIndicators'
import RiskManagement from '../../pages/RiskManagement/RiskManagement'
import RiverCollapse from '../../pages/RiskManagement/RiverCollapse'
import TunnelDeformation from '../../pages/RiskManagement/TunnelDeformation'
import HillsideMovement from '../../pages/RiskManagement/HillsideMovement'
import RiskOverview from '../../pages/RiskManagement/RiskOverview'

import RiskReport from '../../pages/RiskManagement/RiskReport'


//Inventory Management


import InventoryManagement from '../../pages/InventoryManagement/InventoryManagement'
import MachineryForm from '../../pages/InventoryManagement/MachineryForm'

import { GO_TO_LOGIN, GO_TO_MANAGEMENT, GO_TO_PROJECTS, GO_TO_FORESTAL_UNITS, GO_BACK, INSERT_NAVIGATOR,
GO_TO_FORM_INVENTORY, GO_TO_FORM_PROCESS, GO_TO_FORM_COMPENSATION , GO_TO_RISK_MANAGEMENT, GO_TO_HILLSIDE_COLLAPSE,
GO_TO_RAIN_FALL, GO_TO_RIVER_COLLAPSE, GO_TO_TUNNEL_DEFORMATION, GO_TO_RISK_INDICATORS, GO_TO_HILLSIDE_MOVEMENT,
GO_TO_RISK_REPORT, GO_TO_INVENTORY_MANAGEMENT , GO_TO_MACHINERY_FORM, APP_ERROR, GO_TO_RISK_OVERVIEW } from "../types";

var Pagenavigator = null;

const initialState = {
  currentPagekey:null,
  navigator: {},
  initialRoute:{ component: Login , key: "LOGIN_PAGE"  },
};

const navigationReducer = (state = initialState, action) => {


  let currentPage = null;

  if(state.navigator.pages)
  {
    currentPage = state.navigator.pages.slice(-1)[0];
  }


  switch(action.type) {

    case INSERT_NAVIGATOR:
      state = {
        ...state,
        navigator:action.payload
      }

      Pagenavigator = action.payload;

      return state;
    case GO_TO_LOGIN:
      state = {
        ...state,
        currentPagekey: GO_TO_LOGIN
      }
      console.log(state);
      if(currentPage.key != GO_TO_LOGIN){
        state.navigator.resetPage({ component: Login , key: GO_TO_LOGIN  }, { animation: 'fade' });
      }
      return state;
    case GO_TO_MANAGEMENT:
      state = {
        ...state,
        currentPagekey: GO_TO_MANAGEMENT
      }
      if(currentPage.key != GO_TO_MANAGEMENT){
        setTimeout(()=>{
          state.navigator.resetPage({ component: ProjectManagement , key: GO_TO_MANAGEMENT  }, { animation: 'fade' });
        },1)
      }
      return state;
    case GO_TO_RISK_OVERVIEW:
      state = {
        ...state,
        currentPagekey: GO_TO_RISK_OVERVIEW
      }
      if(currentPage.key != GO_TO_RISK_OVERVIEW){
        state.navigator.pushPage({ component: RiskOverview , key: GO_TO_RISK_OVERVIEW  });
      }
      return state;
    case GO_TO_PROJECTS:
      state = {
        ...state,
        currentPagekey: GO_TO_PROJECTS
      }
      if(currentPage.key != GO_TO_PROJECTS){
        state.navigator.pushPage({ component: ProjectList , key: GO_TO_PROJECTS  });
      }
      return state;
    case GO_TO_FORESTAL_UNITS:
      state = {
        ...state,
        currentPagekey: GO_TO_FORESTAL_UNITS
      }
      if(currentPage.key != GO_TO_FORESTAL_UNITS){
        state.navigator.pushPage({ component: ForestalUnitList , key: GO_TO_FORESTAL_UNITS  });
      }
      return state;
    case GO_TO_FORM_INVENTORY:
      state = {
        ...state,
        currentPagekey: GO_TO_FORM_INVENTORY
      }
      if(currentPage.key != GO_TO_FORM_INVENTORY){
        state.navigator.pushPage({ component: FormInventory , key: GO_TO_FORM_INVENTORY  });
      }
      return state;
    case GO_TO_FORM_PROCESS:
      state = {
        ...state,
        currentPagekey: GO_TO_FORM_PROCESS
      }
      if(currentPage.key != GO_TO_FORM_PROCESS){
        state.navigator.pushPage({ component: FormProcess , key: GO_TO_FORM_PROCESS  });
      }
      return state;
    case GO_TO_FORM_COMPENSATION:
      state = {
        ...state,
        currentPagekey: GO_TO_FORM_COMPENSATION
      }
      if(currentPage.key != GO_TO_FORM_COMPENSATION){
        state.navigator.pushPage({ component: FormCompensation , key: GO_TO_FORM_COMPENSATION  });
      }
      return state;
    case GO_TO_RISK_MANAGEMENT:
      state = {
        ...state,
        currentPagekey: GO_TO_RISK_MANAGEMENT
      }
      if(currentPage.key != GO_TO_RISK_MANAGEMENT){
        state.navigator.pushPage({ component: RiskManagement , key: GO_TO_RISK_MANAGEMENT  });
      }
      return state;
    case GO_TO_HILLSIDE_COLLAPSE:
      state = {
        ...state,
        currentPagekey: GO_TO_HILLSIDE_COLLAPSE
      }
      if(currentPage.key != GO_TO_HILLSIDE_COLLAPSE){
        state.navigator.pushPage({ component: HillsideCollapse , key: GO_TO_HILLSIDE_COLLAPSE  });
      }
      return state;
    case GO_TO_RAIN_FALL:
      state = {
        ...state,
        currentPagekey: GO_TO_RAIN_FALL
      }
      if(currentPage.key != GO_TO_RAIN_FALL){
        state.navigator.pushPage({ component: Rainfall , key: GO_TO_RAIN_FALL  });
      }
      return state;
    case GO_TO_RIVER_COLLAPSE:
      state = {
        ...state,
        currentPagekey: GO_TO_RIVER_COLLAPSE
      }
      if(currentPage.key != GO_TO_RIVER_COLLAPSE){
        state.navigator.pushPage({ component: RiverCollapse , key: GO_TO_RIVER_COLLAPSE  });
      }
      return state;
    case GO_TO_TUNNEL_DEFORMATION:
      state = {
        ...state,
        currentPagekey: GO_TO_TUNNEL_DEFORMATION
      }
      if(currentPage.key != GO_TO_TUNNEL_DEFORMATION){
        state.navigator.pushPage({ component: TunnelDeformation , key: GO_TO_TUNNEL_DEFORMATION  });
      }
      return state;
    case GO_TO_RISK_INDICATORS:
      state = {
        ...state,
        currentPagekey: GO_TO_RISK_INDICATORS
      }
      if(currentPage.key != GO_TO_RISK_INDICATORS){
        state.navigator.pushPage({ component: RiskIndicators , key: GO_TO_RISK_INDICATORS  });
      }
      return state;
    case GO_TO_HILLSIDE_MOVEMENT:
      state = {
        ...state,
        currentPagekey: GO_TO_HILLSIDE_MOVEMENT
      }
      if(currentPage.key != GO_TO_HILLSIDE_MOVEMENT){
        state.navigator.pushPage({ component: HillsideMovement , key: GO_TO_HILLSIDE_MOVEMENT  });
      }
      return state;
    case GO_TO_RISK_REPORT:
      state = {
        ...state,
        currentPagekey: GO_TO_RISK_REPORT
      }
      if(currentPage.key != GO_TO_RISK_REPORT){
        state.navigator.pushPage({ component: RiskReport , key: GO_TO_RISK_REPORT  });
      }
      return state;

    case GO_TO_INVENTORY_MANAGEMENT:

      state = {
        ...state,
        currentPagekey: GO_TO_INVENTORY_MANAGEMENT
      }
      if(currentPage.key != GO_TO_RISK_REPORT){
        state.navigator.pushPage({ component: InventoryManagement , key: GO_TO_INVENTORY_MANAGEMENT  });
      }
      return state;

    case GO_TO_MACHINERY_FORM:

      state = {
        ...state,
        currentPagekey: GO_TO_MACHINERY_FORM
      }
      if(currentPage.key != GO_TO_MACHINERY_FORM){
        state.navigator.pushPage({ component: MachineryForm , key: GO_TO_MACHINERY_FORM  });
      }
      return state;

    case APP_ERROR:

      state = {
        ...state,
        currentPagekey: GO_TO_LOGIN
      }

      return state;

    case GO_BACK:
      state = {
        ...state,
        currentPagekey: state.navigator.pages.slice(-1)[0].key
      }
      state.navigator.popPage();
      return state;
    default:
      return state;
  }
}

export default navigationReducer;
