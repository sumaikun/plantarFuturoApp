//PROPERTIES
export const VERSION = "1.0";
const LOCAL_MODE = false;

//ajax
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const BASE_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test' : 'http://plantarfuturo.com/ws';
//USER
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

//NAVIGATION
export const INSERT_NAVIGATOR = "INSERT_NAVIGATOR";
export const GO_TO_LOGIN = "GO_TO_LOGIN";
export const GO_TO_MANAGEMENT = "GO_TO_MANAGEMENT";
export const GO_TO_PROJECTS = "GO_TO_PROJECTS";
export const GO_TO_FORESTAL_UNITS = "GO_TO_FORESTAL_UNITS";
export const GO_TO_FORM_INVENTORY = "GO_TO_FORM_INVENTORY";
export const GO_TO_FORM_PROCESS = "GO_TO_FORM_PROCESS";
export const GO_BACK = "GO_BACK";
export const GO_TO_FORM_COMPENSATION = "GO_TO_FORM_COMPENSATION";

//general app states
export const FETCH = "FETCH";
export const CANCEL_FETCH = "CANCEL_FETCH";
export const MENU_OPEN = "MENU_OPEN";
export const MENU_CLOSE = "MENU_CLOSE";
export const SETUSER = "SETUSER";
export const SET_PROJECTS = "SET_PROJECTS";
export const SET_PROJECT_PHASE = "SET_PROJECT_PHASE";
export const SET_FUNCTIONAL_UNITS = "SET_FUNCTIONAL_UNITS";
export const RESET_FUNCTIONAL_UNITS = "RESET_FUNCTIONAL_UNITS";
export const SET_FORESTAL_UNITS = "SET_FORESTAL_UNITS";
export const SET_FORESTAL_UNIT = "SET_FORESTAL_UNIT";
export const SET_FUNCTIONAL_UNIT = "SET_FUNCTIONAL_UNIT";
export const SELECT_PROJECT = "SELECT_PROJECT";


//aJAX URLS
export const LOGIN_URL = BASE_URL+"/api/login";
//export const GET_PROJECTS_URL = BASE_URL+"/api/users/projects";
export const GET_PROJECTS_URL = BASE_URL+"/api/project";
export const FUNCTIONAL_UNIT_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000/api/functional-unit' : 'http://plantarfuturo.com/ws/api/functional-unit';
export const GET_FUNCTIONAL_UNITS = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000/api/project/functional-units/' : 'http://plantarfuturo.com/ws/api/project/functional-units/';
export const GET_FORESTAL_UNITS_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000/api/functional-unit/forest-units/' : 'http://plantarfuturo.com/ws/api/functional-unit/forest-units/';
export const GET_RISK_OVERVIEW_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000/api/project/risks/' : 'http://plantarfuturo.com/ws/api/project/risks/';
export const GET_PROJECTS_BY_USER = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000/api/users/projects/' : 'http://plantarfuturo.com/ws/api/users/projects/';


//RiskManagement navigation
export const GO_TO_RISK_MANAGEMENT = "GO_TO_RISK_MANAGEMENT";
export const GO_TO_HILLSIDE_MOVEMENT = "GO_TO_HILLSIDE_MOVEMENT";
export const GO_TO_HILLSIDE_COLLAPSE = "GO_TO_HILLSIDE_COLLAPSE";
export const GO_TO_RAIN_FALL = "GO_TO_RAIN_FALL";
export const GO_TO_RISK_OVERVIEW = "GO_TO_RISK_OVERVIEW";
export const GO_TO_RIVER_COLLAPSE = "GO_TO_RIVER_COLLAPSE";
export const GO_TO_TUNNEL_DEFORMATION = "GO_TO_TUNNEL_DEFORMATION";
export const GO_TO_RISK_INDICATORS = "GO_TO_RISK_INDICATORS";
export const GO_TO_RISK_REPORT = "GO_TO_RISK_REPORT";

//RiskManagement navigation
export const HALL_SIDE_MOVEMENT_URL = BASE_URL+"/api/risks/hillside-displacement";
export const TUNNEL_DEFORMATION_URL = BASE_URL+"/api/risks/tunnel-deformation";
export const HILL_SIDE_COLLAPSE_URL = BASE_URL+"/api/risks/hillside-round";
export const RAIN_FALL_URL = BASE_URL+"/api/risks/precipitation";
export const RIVER_COLLAPSE_URL = BASE_URL+"/api/risks/dryravine-round";
export const RISK_INDICATORS_URL = BASE_URL+"/api/project/risks";
//
export const SET_TUNNEL_DEFORMATION_LIST = "SET_TUNNEL_DEFORMATION_LIST";
export const HILL_SIDE_MOVEMENT_LIST = "HILL_SIDE_MOVEMENT_LIST";
export const RAIN_FALL_LIST = "RAIN_FALL_LIST";
export const HILL_SIDE_COLLAPSE_LIST = "HILL_SIDE_COLLAPSE_LIST";
export const RIVER_COLLAPSE_LIST = "RIVER_COLLAPSE_LIST";


export const SET_TUNNEL_DEFORMATION = "SET_TUNNEL_DEFORMATION";
export const SET_HILL_SIDE_MOVEMENT = "SET_HILL_SIDE_MOVEMENT";
export const SET_RAIN_FALL = "SET_RAIN_FALL";
export const SET_HILL_SIDE_COLLAPSE = "SET_HILL_SIDE_COLLAPSE";
export const SET_RIVER_COLLAPSE = "SET_RIVER_COLLAPSE";
export const SET_CURRENT_RISK_PHASE = "SET_CURRENT_RISK_PHASE";

//Risk indicators
export const SET_RISK_INDICATORS = "SET_RISK_INDICATORS";

//Inventory Management
export const GO_TO_INVENTORY_MANAGEMENT = "GO_TO_INVENTORY_MANAGEMENT";
export const GO_TO_MACHINERY_FORM = "GO_TO_MACHINERY_FORM";

//Errors
export const APP_ERROR = "APP_ERROR";

export const SET_RISK_OVERVIEW = "SET_RISK_OVERVIEW";


//MemoryActions
export const ADD_LOGGED_USER = "ADD_LOGGED_USER";
export const ADD_FUNCTIONAL_UNIT_OFFLINE = "ADD_FUNCTIONAL_UNIT_OFFLINE";

export const UPDATE_SERVER_FUNCTIONAL_UNIT = "UPDATE_SERVER_FUNCTIONAL_UNIT";
export const UPDATE_OFFLINE_FUNCTIONAL_UNIT = "UPDATE_OFFLINE_FUNCTIONAL_UNIT";
export const REMOVE_FROM_UPDATE_SERVER_FUNIT = "REMOVE_FROM_UPDATE_SERVER_FUNIT";
export const REMOVE_FROM_OFFLINE_FUNIT = "REMOVE_FROM_OFFLINE_FUNIT";

export const ADD_FOREST_UNIT_OFFLINE_PHASE1 = "ADD_FOREST_UNIT_OFFLINE_PHASE1";
export const UPDATE_SERVER_FOREST_UNIT_PHASE1 = "UPDATE_SERVER_FOREST_UNIT_PHASE1";
export const UPDATE_OFFLINE_FOREST_UNIT_PHASE1 = "UPDATE_OFFLINE_FOREST_UNIT_PHASE1";
export const REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1 = "REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1";
export const REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1 = "REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1";

export const ADD_FOREST_UNIT_OFFLINE_PHASE2 = "ADD_FOREST_UNIT_OFFLINE_PHASE2";
export const UPDATE_SERVER_FOREST_UNIT_PHASE2 = "UPDATE_SERVER_FOREST_UNIT_PHASE2";
export const UPDATE_OFFLINE_FOREST_UNIT_PHASE2 = "UPDATE_OFFLINE_FOREST_UNIT_PHASE2";
export const REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2 = "REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2";
export const REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2 = "REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2";

export const ADD_FOREST_UNIT_OFFLINE_PHASE3 = "ADD_FOREST_UNIT_OFFLINE_PHASE3";
export const UPDATE_SERVER_FOREST_UNIT_PHASE3 = "UPDATE_SERVER_FOREST_UNIT_PHASE3";
export const UPDATE_OFFLINE_FOREST_UNIT_PHASE3 = "UPDATE_OFFLINE_FOREST_UNIT_PHASE3";
export const REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3 = "REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3";
export const REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3 = "REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3";
