import { Request } from '../../helpers/request'
import { fetching , notFetching, setUser } from "./appActions";
import {  goToMain } from "./navigationActions";
import { LOGIN_URL } from "../types"


const fetchLoginOnline = (dispatch ,data) => {
  console.log(data);

  dispatch(fetching());

  let SuccessCallBack = (response) => {
    dispatch(notFetching());
    dispatch(setUser(response.data));
    dispatch(goToMain());
  }

  let ErrorCallBack = () => {
    dispatch(notFetching());
  }

  Request.postRequest(
    LOGIN_URL,
    data,
    SuccessCallBack,
    ErrorCallBack
  );
}

const fetchLoginOffline = (dispatch ,data) => {
  console.log("Soy una operacion offline");
}

export const fetchLogin = (data) => {
  return async dispatch => {
    navigator.onLine ?
      fetchLoginOnline(dispatch,data):
      fetchLoginOffline(dispatch,data)
  }
}
