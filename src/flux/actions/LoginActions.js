import { Request } from '../../helpers/request'
import { fetching , notFetching, setUser } from "./appActions";
import { addLoggedUser } from "./memoryActions";
import {  goToMain } from "./navigationActions";

import {  getProjectByUser } from "./projectsActions";
import { getPlantationReports } from "./Plantation/PlantationActions";


import { LOGIN_URL } from "../types";
import Ons from 'onsenui';

import { getFromJsonString } from "../../helpers/objectMethods";

import { deleteFile } from "../../helpers/writeFiles";

const fetchLoginOnline = (dispatch ,data) => {
  //console.log(data);

  dispatch(fetching());

  //dispatch(addLoggedUser(data));

  let SuccessCallBack = (response) => {
    let userData = JSON.stringify(data);

    let userLogged =  JSON.parse(localStorage.getItem('userLogged'));
    if(userLogged)
    {
      if(userLogged.email !=  data.email)
      {
        deleteFile("appStorage.json");

        deleteFile("memoryStorage.json");
      }
      else{
        console.log("mismo usuario");
      }
      
    }
      

    console.log(userData);
    localStorage.setItem('userLogged', userData);
       
    dispatch(notFetching());
    dispatch(setUser(response.data));
    dispatch(getProjectByUser(response.data));
    //dispatch( getPlantationReports() );             //  Esta funcion trae los reportes de plantacion de todos los pryectos de plantacion
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

    //let userLogged =  getFromJsonString(localStorage.getItem('userLogged'), "memory");

    let userLogged =  JSON.parse(localStorage.getItem('userLogged'));
    console.log(userLogged);

    try{
      if(userLogged.email ==  data.email &&  userLogged.password == data.password)
      {
        dispatch(goToMain());
      }
    }
    catch(error)
    {
      Ons.notification.alert({title:"",message:"No puedes ingresar al sistema, no hay datos de usuarios guardados"});
    }

    console.log("Soy una operacion offline");

};

export const fetchLogin = (data) => {
  return async dispatch => {
    navigator.onLine ?
      fetchLoginOnline(dispatch,data)
      :
      fetchLoginOffline(dispatch,data)
  };
};
