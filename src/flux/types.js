//PROPERTIES

const LOCAL_MODE = true;

//ajax
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const BASE_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000' : 'http://plantarfuturo.com/ws';
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
export const GET_PROJECTS_URL = BASE_URL+"/api/project";
export const FUNCTIONAL_UNIT_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000/api/functional-unit' : 'http://plantarfuturo.com/ws/api/functional-unit';
export const GET_FUNCTIONAL_UNITS = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000/api/project/functional-units/' : 'http://plantarfuturo.com/ws/api/project/functional-units/';
export const GET_FORESTAL_UNITS_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://localhost:8000/api/functional-unit/forest-units/' : 'http://plantarfuturo.com/ws/api/functional-unit/forest-units/';
