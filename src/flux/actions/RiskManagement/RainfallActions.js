import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import {  BASE_URL, RAIN_FALL_URL } from "../../types"
import Ons from 'onsenui';


export const createRainfall = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Informe de precipitación registrado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      RAIN_FALL_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateRainfall = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Informe de precipitación actualizada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      RAIN_FALL_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}
