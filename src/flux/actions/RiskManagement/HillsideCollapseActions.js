import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import {  BASE_URL, HILL_SIDE_COLLAPSE_URL } from "../../types"
import Ons from 'onsenui';


export const createHillsideCollapse = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Recorrido de ladera registrada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      HILL_SIDE_COLLAPSE_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateHillsideCollapse = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Recorrido de ladera actualizada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      HILL_SIDE_COLLAPSE_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}
