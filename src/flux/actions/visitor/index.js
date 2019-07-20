import { Request } from '../../../helpers/request'
import { fetching , notFetching} from "../appActions";
import { GET_VISITOR_URL } from "../../types";
import Ons from 'onsenui';
import moment from 'moment';

//crear
export function createVisitor(data, successCallBack  ,errorCallBack )  {
    return async dispatch => {
  
      let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!",message:"¡Visitante creado exitosamente!"});
      }
  
      let ErrorCallBack = () => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el nuevo visitante"});
      }
      Request.postRequest(
        GET_VISITOR_URL,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
    }
  }
  
  // Actualizar reporte SST
  export function updateVisitor (id, data, successCallBack  ,errorCallBack ) {
    return async dispatch => {
   
      let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!",message:"¡¡Visitante actualizado exitosamente!"});
      }
  
      let ErrorCallBack = () => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido actualizar el visitante"});
      }
      Request.postRequest(
        GET_VISITOR_URL+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
    }
  }