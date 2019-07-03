import { Request } from '../../helpers/request'
import { fetching , notFetching, setUser } from "./appActions";
import { addLoggedUser } from "./memoryActions";
import {  goToMain } from "./navigationActions";

import {  getProjectByUser } from "./projectsActions";



import { LOGIN_URL } from "../types";
import Ons from 'onsenui';

import { getFromJsonString } from "../../helpers/objectMethods";

const fetchLoginOnline = (dispatch ,data) => {
  console.log(data);

  dispatch(fetching());

  dispatch(addLoggedUser(data));

  let SuccessCallBack = (response) => {
    dispatch(notFetching());
    dispatch(setUser(response.data));
    dispatch(getProjectByUser(response.data.id));
    dispatch(goToMain());
  }

  let ErrorCallBack = () => {
    dispatch(notFetching());
  }

  Request.postRequest(
    LOGIN_URL,
    data,
    SuccessCallBack,
    ErrorCallBack
  );
}

const fetchLoginOffline = (dispatch ,data) => {

    let memory =  getFromJsonString(localStorage.getItem('state'), "memory");
    console.log(memory);

    try{
      if(memory.userLogged.email ==  data.email &&  memory.userLogged.password == data.password)
      {
        dispatch(goToMain());
      }
    }
    catch(error)
    {
      Ons.notification.alert({title:"",message:"No puedes ingresar al sistema, no hay datos de usuarios guardados"});
    }

    console.log("Soy una operacion offline");

}

export const fetchLogin = (data) => {
  return async dispatch => {
    navigator.onLine ?
      fetchLoginOnline(dispatch,data):
      fetchLoginOffline(dispatch,data)
  }
}
