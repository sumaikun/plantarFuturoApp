import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import {  BASE_URL, RIVER_COLLAPSE_URL } from "../../types"
import Ons from 'onsenui';


export const createRiverCollapse = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Recorrido de quebrada registrado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      RIVER_COLLAPSE_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateRiverCollapse = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Recorrido de quebrada actualizado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      RIVER_COLLAPSE_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}
