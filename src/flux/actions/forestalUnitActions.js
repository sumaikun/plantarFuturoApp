import { Request } from '../../helpers/request'
import { fetching , notFetching, setForestalUnits } from "./appActions";
import { GET_FORESTAL_UNITS_URL , BASE_URL } from "../types"
import Ons from 'onsenui';
import {
  addOfflineForestUnitP1,
  updateServerForestUnitP1,
  updateOfflineForestUnitP1,
  addOfflineForestUnitP2,
  updateServerForestUnitP2,
  updateOfflineForestUnitP2,
  addOfflineForestUnitP3,
  updateServerForestUnitP3,
  updateOfflineForestUnitP3
} from "./memoryActions";

import { goBack } from "./navigationActions";

export const getForestalUnits = (id) => {
  return async dispatch => {

      ////console.log(id);

      dispatch(fetching());

      if(!navigator.onLine)
      {
        //console.log("Modo offline");
        dispatch(notFetching());
        return;
      }

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setForestalUnits(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      //console.log(String(GET_FORESTAL_UNITS_URL+id));

      Request.getRequest(
        GET_FORESTAL_UNITS_URL+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const createForestUnitPhase1 = (data,successCallBack  ,errorCallBack ) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      //console.log("Modo offline");

      data.created_at = new Date().toISOString().split('T')[0];

      dispatch(addOfflineForestUnitP1(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());



    let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal creada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la unidad forestal"});
    }


    Request.postRequest(
      BASE_URL+"/api/forest-unit/first-phase",
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}


export const updateForestUnitPhase1 = (id,data,successCallBack) => {
  return async dispatch => {

      //console.log(data);

      //Modifier string to int
       data.origin = data.origin === "1" || data.origin === 'Nativa'  ?  "1" :
       data.origin === "2" || data.origin === 'Exotica'  ? "2" : null;

      data.cup_density =  data.cup_density === "1" || data.cup_density === 'Clara'  ?  "1" :
        data.cup_density === "2" || data.cup_density === 'Media'  ? "2" :
        data.cup_density === "3" || data.cup_density === 'Espesa' ? "3":null;

      data.epiphytes = data.epiphytes === "1" || data.epiphytes === 'Si' ? "1" :
      data.epiphytes === "2" || data.epiphytes === 'No' ? "2" : null;

      data.condition = data.condition === "1" || data.condition === 'Malo' ? "1":
      data.condition === "2" || data.condition === 'Regular' ? "2":
      data.condition === "3" || data.condition === 'Bueno' ? "3": null;

      data.health_status = data.health_status === "1" || data.health_status === 'Malo' ? "1":
      data.health_status === "2" || data.health_status === 'Regular' ? "2":
      data.health_status === "3" || data.health_status === 'Bueno' ? "3": null;

      data.origin = !data.origin ? null : data.origin;


      if(!navigator.onLine || data.ToSynchro)
      {
        //console.log("Modo offline");

        if(!data.ToSynchro)
        {
          //console.log("editar del servidor");
          dispatch(updateServerForestUnitP1(data));
          dispatch(goBack());
        }
        else
        {
          //console.log("editar offline");
          dispatch(updateOfflineForestUnitP1(data));
          dispatch(goBack());
        }

        Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal editada en memoria!"});
        return;
      }


      dispatch(fetching());

      let SuccessCallBack = successCallBack ? successCallBack : (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Unidad forestal actualizada"});


      }

      let ErrorCallBack = (error) => {
        //console.log(error);
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar la unidad forestal"});
        dispatch(notFetching());
      }

      Request.putRequest(
        BASE_URL+"/api/forest-unit/first-phase/"+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const createForestUnitPhase2 = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      //console.log("Modo offline");
      data.created_at = new Date().toISOString().split('T')[0];
      dispatch(addOfflineForestUnitP2(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal creada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la unidad forestal"});
    }


    Request.postRequest(
      BASE_URL+"/api/forest-unit",
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

export const updateForestUnitPhase2 = (id,data,successCallBack) => {
  return async dispatch => {

      //console.log(data);

      //Modifier string to int
       data.origin = data.origin === "1" || data.origin === 'Nativa'  ?  "1" :
       data.origin === "2" || data.origin === 'Exotica'  ? "2" : null;

      data.cup_density =  data.cup_density === "1" || data.cup_density === 'Clara'  ?  "1" :
        data.cup_density === "2" || data.cup_density === 'Media'  ? "2" :
        data.cup_density === "3" || data.cup_density === 'Espesa' ? "3":null;

      data.epiphytes = data.epiphytes === "1" || data.epiphytes === 'Si' ? "1" :
      data.epiphytes === "2" || data.epiphytes === 'No' ? "2" : null;

      data.condition = data.condition === "1" || data.condition === 'Malo' ? "1":
      data.condition === "2" || data.condition === 'Regular' ? "2":
      data.condition === "3" || data.condition === 'Bueno' ? "3": null;

      data.health_status = data.health_status === "1" || data.health_status === 'Malo' ? "1":
      data.health_status === "2" || data.health_status === 'Regular' ? "2":
      data.health_status === "3" || data.health_status === 'Bueno' ? "3": null;

      data.origin = !data.origin ? null : data.origin;

      if(!navigator.onLine || data.ToSynchro)
      {
        //console.log("Modo offline");

        if(!data.ToSynchro)
        {
          console.log("editar del servidor");
          dispatch(updateServerForestUnitP2(data));
          dispatch(goBack());
        }
        else
        {
          //console.log("editar offline");
          dispatch(updateOfflineForestUnitP2(data));
          dispatch(goBack());
        }

        Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal editada en memoria!"});
        return;
      }

      dispatch(fetching());

      let SuccessCallBack = successCallBack ? successCallBack : (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Unidad forestal actualizada"});


      }

      let ErrorCallBack = (error) => {
        //console.log(error);
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar la unidad forestal"});
        dispatch(notFetching());
      }

      Request.putRequest(
        BASE_URL+"/api/forest-unit/"+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const createForestUnitPhase3 = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      //console.log("Modo offline");
      data.created_at = new Date().toISOString().split('T')[0];
      dispatch(addOfflineForestUnitP3(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal creada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la unidad forestal"});
    }


    Request.postRequest(
      BASE_URL+"/api/forest-unit/third-phase",
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

export const updateForestUnitPhase3 = (id,data,successCallBack) => {
  return async dispatch => {

      //console.log(data);

      //Modifier string to int
       data.origin = data.origin === "1" || data.origin === 'Nativa'  ?  "1" :
       data.origin === "2" || data.origin === 'Exotica'  ? "2" : null;

      data.cup_density =  data.cup_density === "1" || data.cup_density === 'Clara'  ?  "1" :
        data.cup_density === "2" || data.cup_density === 'Media'  ? "2" :
        data.cup_density === "3" || data.cup_density === 'Espesa' ? "3":null;

      data.epiphytes = data.epiphytes === "1" || data.epiphytes === 'Si' ? "1" :
      data.epiphytes === "2" || data.epiphytes === 'No' ? "2" : null;

      data.condition = data.condition === "1" || data.condition === 'Malo' ? "1":
      data.condition === "2" || data.condition === 'Regular' ? "2":
      data.condition === "3" || data.condition === 'Bueno' ? "3": null;

      data.health_status = data.health_status === "1" || data.health_status === 'Malo' ? "1":
      data.health_status === "2" || data.health_status === 'Regular' ? "2":
      data.health_status === "3" || data.health_status === 'Bueno' ? "3": null;

      data.origin = !data.origin ? null : data.origin;

      if(!navigator.onLine || data.ToSynchro)
      {
        //console.log("Modo offline");

        if(!data.ToSynchro)
        {
          //console.log("editar del servidor");
          dispatch(updateServerForestUnitP3(data));
          dispatch(goBack());
        }
        else
        {
          //console.log("editar offline");
          dispatch(updateOfflineForestUnitP3(data));
          dispatch(goBack());
        }

        Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal editada en memoria!"});
        return;
      }

      dispatch(fetching());

      let SuccessCallBack = successCallBack ? successCallBack : (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Unidad forestal actualizada"});


      }

      let ErrorCallBack = (error) => {
        //console.log(error);
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar la unidad forestal"});
        dispatch(notFetching());
      }

      Request.putRequest(
        BASE_URL+"/api/forest-unit/third-phase/"+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}
