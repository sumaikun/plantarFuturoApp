import { Request } from '../../../helpers/request';
import { fetching , notFetching, setPlantationReports } from "../appActions";
import { GET_FORESTAL_UNITS_URL , BASE_URL } from "../../types";
import Ons from 'onsenui';

/*
import {
  addOfflinePlantationReport,
  updateServerPlantationReport,
  updateOfflinePlantationReport,
} from "../memoryActions";

*/

import { goBack } from "../navigationActions";

/*
export const getPlantationReports = (project_id) => {
  return async dispatch => {
    dispatch( fetching() );

    if(!navigator.onLine) {
      console.log("Modo offline");
      dispatch(notFetching());
      return;
    }

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      dispatch(setPlantationReports(response.data));
    };

    let ErrorCallBack = () => {
      dispatch(notFetching());
    };

    console.log(String(GET_FORESTAL_UNITS_URL + project_id));

    Request.getRequest(
      GET_FORESTAL_UNITS_URL + project_id,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};
*/