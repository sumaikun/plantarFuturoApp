import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import {  BASE_URL, HALL_SIDE_MOVEMENT_URL } from "../../types"
import Ons from 'onsenui';


export const createHallsideMovement = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Movimiento de ladera registrado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      HALL_SIDE_MOVEMENT_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}


export const updateHallsideMovement = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Movimiento de ladera actualizado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      HALL_SIDE_MOVEMENT_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}
