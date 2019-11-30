import { Request } from '../../../helpers/request';
import { fetching , notFetching, setPlantationReports, setPlantationReport } from "../appActions";
import { GET_PLANTATION_REPORTS, GET_PLANTATION_REPORTS_BY_PROJECT, GET_PLANTATION_REPORT_BY_ID, CREATE_PLANTATION_REPORT, UPDATE_PLANTATION_REPORT, BASE_URL } from "../../types";
import Ons from 'onsenui';
import {
  addOfflinePlantationReport,
  updateServerPlantationReport,
  updateOfflinePlantationReport
} from "../memoryActions";
import {goBack} from "../navigationActions";

export const getPlantationReports = (keepFetching = false ) => {  

  return async dispatch => {

    if(!navigator.onLine)
    {
      return;
    }

    dispatch( fetching() );

    let SuccessCallBack = (response) => {
      if(!keepFetching)
      {
          dispatch(notFetching());
      }

      dispatch(setPlantationReports(response.data));
    };

    let ErrorCallBack = () => {
      
        dispatch(notFetching());

    };

    //console.log(String( "HERE GOES THE TYPE" + project_id));

    Request.getRequest(
      GET_PLANTATION_REPORTS,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const getPlantationReportsByProject = (project_id, keepFetching = false) => {    

  return async dispatch => {

    if(!navigator.onLine)
    {
      return;
    }
    
    if(!keepFetching)
    {
      dispatch( fetching() );
    }

    let SuccessCallBack = (response) => {
      
      if(!keepFetching)
      {
        dispatch(notFetching());
      }
      
      
      dispatch(setPlantationReports(response.data));
    };

    let ErrorCallBack = () => {
      dispatch(notFetching());
    };

    //console.log(String( "HERE GOES THE TYPE" + project_id));

    Request.getRequest(
      GET_PLANTATION_REPORTS_BY_PROJECT + project_id,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const getPlantationReportById = (report_id) => {
 
  return async dispatch => {

    if(!navigator.onLine)
    {
      return;
    }
  
    dispatch( fetching() );

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      dispatch(setPlantationReport(response.data));
    };

    let ErrorCallBack = () => {
      dispatch(notFetching());
    };

    //console.log(String( "HERE GOES THE TYPE" + project_id));

    Request.getRequest(
      GET_PLANTATION_REPORT_BY_ID + report_id,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const createReport = (data, successCallBack = null, errorCallBack = null) => {
  return async dispatch => {
    console.log(data);

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      dispatch(addOfflinePlantationReport(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Reporte de plantación creado offline!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :(response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha creado el reporte de plantacion" });
      // componentSuccess( response.data );
      dispatch(goBack());
    };

    let ErrorCallBack = errorCallBack ? errorCallBack : () => {
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el reporte de plantation"});
      dispatch(notFetching());
    };

    Request.postRequest(
      CREATE_PLANTATION_REPORT,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const updateReport = (plantation_report_id, data, successCallBack = null, errorCallBack = null) => {
  return async dispatch => {

    if(!navigator.onLine || data.ToSynchro)
      {
        console.log("Modo offline");
        
        data.id = plantation_report_id;
        
        console.log(data.ToSynchro);

        if(data.ToSynchro)
        {
          console.log("editar offline");
          dispatch(updateOfflinePlantationReport(data));
          dispatch(goBack());          
        }
        else
        {
          console.log("editar del servidor");
          dispatch(updateServerPlantationReport(data));
          dispatch(goBack());
        }

        Ons.notification.alert({title:"¡Que bien!",message:"¡Reporte de plantación editado en memoria!"});
        return;
      }



    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha actualizado el reporte de plantacion" });
      dispatch(goBack());
    }

    let ErrorCallBack = errorCallBack ? errorCallBack : (error) => {
      console.log(error);
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido actualizar el reporte de plantation"});
      dispatch(notFetching());
    }

    Request.putRequest(
      UPDATE_PLANTATION_REPORT + plantation_report_id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  }
}
