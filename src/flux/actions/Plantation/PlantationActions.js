import { Request } from '../../../helpers/request';
import { fetching , notFetching, setPlantationReports } from "../appActions";
import { GET_PLANTATION_REPORTS, GET_PLANTATION_REPORTS_BY_PROJECT, CREATE_PLANTATION_REPORT, UPDATE_PLANTATION_REPORT, BASE_URL } from "../../types";
import Ons from 'onsenui';
import {updateOfflineForestUnitP1, updateServerForestUnitP1} from "../memoryActions";
import {goBack} from "../navigationActions";

export const getPlantationReports = () => {
  return async dispatch => {
    dispatch( fetching() );

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
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

export const getPlantationReportsByProject = (project_id) => {
  return async dispatch => {
    dispatch( fetching() );

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
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

export const createReport = (data, componentSuccess = null) => {
  return async dispatch => {
    console.log(data);

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha creado el reporte de plantacion" });
      // componentSuccess( response.data );
      dispatch(goBack());
    };

    let ErrorCallBack = () => {
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

export const updateReport = (plantation_report_id, data) => {
  return async dispatch => {
    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha actualizado el reporte de plantacion" });
      dispatch(goBack());
    }

    let ErrorCallBack = (error) => {
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
