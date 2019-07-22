import { Request } from '../../../helpers/request';
import { fetching , notFetching, setPlantationReports } from "../appActions";
import { GET_PLANTATION_REPORTS, GET_PLANTATION_REPORTS_BY_PROJECT, CREATE_PLANTATION_REPORT, BASE_URL } from "../../types";
import Ons from 'onsenui';

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
    }

    let ErrorCallBack = () => {
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el reporte de plantation"});
      dispatch(notFetching());
    }

    Request.postRequest(
      CREATE_PLANTATION_REPORT,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  }
}