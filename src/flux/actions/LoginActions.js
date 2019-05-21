import { Request } from '../../helpers/request'
import { fetching , notFetching, setUser } from "./appActions";
import {  goToMain } from "./navigationActions";
import { LOGIN_URL } from "../types"




export const fetchLogin = (data) => {
  return async dispatch => {

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
}
