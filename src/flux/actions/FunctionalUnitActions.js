import { Request } from '../../helpers/request'
import { fetching , notFetching, setFunctionalUnits, resetFunctionalUnits } from "./appActions"
import { getForestalUnits } from "./forestalUnitActions"
import { addOfflineFunctionalUnit , updateServerFunctionalUnit  } from "./memoryActions"
import { FUNCTIONAL_UNIT_URL, GET_FUNCTIONAL_UNITS  } from "../types"
import Ons from 'onsenui';

export const createFunctionalUnit = (data,componentSuccess) => {
  return async dispatch => {


      if(!navigator.onLine)
      {
        console.log("Modo offline");
        data.ToSynchro = true;
        componentSuccess(data.project_id);
        dispatch(addOfflineFunctionalUnit(data));
        Ons.notification.alert({title:"¡Que bien!", message:"Se ha registrado la unidad funcional en memoria"});
        return;
      }

      console.log(data);

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Se ha creado la unidad funcional"});
        componentSuccess(response.data);
      }

      let ErrorCallBack = () => {
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la unidad funcional"});
        dispatch(notFetching());
      }

      console.log(String(FUNCTIONAL_UNIT_URL));

      Request.postRequest(
        FUNCTIONAL_UNIT_URL,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

export const getFunctionalUnits = (id, SuccessCallBack) => {
  return async dispatch => {

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }


      console.log(id);

      dispatch(fetching());

      if(!SuccessCallBack)
      {
        SuccessCallBack = (response) => {
          dispatch(notFetching());

          if(response.data.length == 0)
          {
            Ons.notification.alert({title:"Espera",message:"Aun no hay unidades funcionales asociadas al proyecto"});
          }

          dispatch(setFunctionalUnits(response.data));
        }
      }


      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      //console.log(String(FUNCTIONAL_UNIT_URL+id));

      Request.getRequest(
        GET_FUNCTIONAL_UNITS+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const updateFunctionalUnit = (id,data,componentSuccess) => {
  return async dispatch => {

      console.log(data);

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        data.id = id;

        data.ToSynchroEdit = true;
        dispatch(updateServerFunctionalUnit(data));

        componentSuccess();
        return;
      }


      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Se ha modificado la unidad funcional"});
        dispatch(resetFunctionalUnits());
        componentSuccess(response.data);
      }

      let ErrorCallBack = () => {
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar la unidad funcional"});
        dispatch(notFetching());
      }



      Request.putRequest(
        FUNCTIONAL_UNIT_URL+"/"+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}
