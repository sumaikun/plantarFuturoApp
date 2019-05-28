import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import {  BASE_URL, TUNNEL_DEFORMATION_URL } from "../../types"
import Ons from 'onsenui';


export const createTunnelDeformation = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Deformación de tunel registrada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      TUNNEL_DEFORMATION_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateTunnelDeformation = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Deformación de tunel actualizada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest( 
      TUNNEL_DEFORMATION_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}
