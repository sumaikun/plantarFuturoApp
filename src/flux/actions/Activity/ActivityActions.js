import { Request } from '../../../helpers/request';
import {
  fetching,
  notFetching,
  setMaintenanceDefaultActivities,
  setEstablishmentDefaultActivities,
} from "../appActions";
import { GET_DEFAULT_ACTIVITIES_BY_TYPE, BASE_URL } from "../../types";
import Ons from 'onsenui';

/*
type_id (1: Establecimiento, 2: Mantenimiento, 3: Civil, 4: Plantación)
 */
export const getDefaultActivitiesByType = (type_id) => {
  return async dispatch => {
    dispatch( fetching() );

    if(!navigator.onLine) {
      //console.log("Modo offline");
      dispatch(notFetching());
      return;
    }

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      if (type_id === 1)
        dispatch(setEstablishmentDefaultActivities(response.data));
      else if (type_id === 2)
        dispatch(setMaintenanceDefaultActivities(response.data));
    };

    let ErrorCallBack = () => {
      dispatch(notFetching());
    };

    ////console.log(String(GET_FORESTAL_UNITS_URL + project_id));

    Request.getRequest(
      GET_DEFAULT_ACTIVITIES_BY_TYPE + type_id,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};