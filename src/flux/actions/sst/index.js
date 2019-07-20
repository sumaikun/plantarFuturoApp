import { Request } from '../../../helpers/request'
import { fetching , notFetching, setSST, setSSTAssistants, setSSTVisitors, setDataSST} from "../appActions";
import { GET_SST_URL } from "../../types";
import Ons from 'onsenui';
//Cargar repotes SST por proyecto
export const getSST = (id) => {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setSST(response.data));
        console.log("hi")
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_SST_URL+1,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

// Crear reporte SST
export const createReportSST = (data, successCallBack  ,errorCallBack ) => {
  return async dispatch => {

    /*if(!navigator.onLine)
    {
      console.log("Modo offline");

      data.created_at = new Date().toISOString().split('T')[0];

      dispatch(addOfflineForestUnitP1(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }
*/

    let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Informe SST creado exitosamente!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el informe SST"});
    }
    Request.postRequest(
      GET_SST_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  }
}

// Actualizar reporte SST
export const updateReportSST = (id, data, successCallBack  ,errorCallBack ) => {
  return async dispatch => {

    /*if(!navigator.onLine)
    {
      console.log("Modo offline");

      data.created_at = new Date().toISOString().split('T')[0];

      dispatch(addOfflineForestUnitP1(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }
*/

    let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Informe SST creado exitosamente!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el informe SST"});
    }
    Request.postRequest(
      GET_SST_URL+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  }
}


// Cargar los Asistentes de SST
export const getSSTAssistants = (id, successCallBack  ,errorCallBack) => {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setSSTAssistants(response.data));
        console.log("hi sst assistants")
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_SST_URL + `/assistants/${id}`,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

/// Cargar los visitantes de SST
export const getSSTVisitors = (id, successCallBack  ,errorCallBack) => {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setSSTAssistants(response.data));
        console.log("hi sst visitor")
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_SST_URL + `/assistants/${id}`,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const getSSTForm = (data) => {
  return async dispatch => {
    dispatch(setDataSST(data));
  }
}
