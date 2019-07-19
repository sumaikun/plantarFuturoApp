import { Request } from '../../helpers/request'
import { fetching , notFetching, setSST } from "./appActions";
import { GET_SST_URL  } from "../types";


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
        GET_SST_URL,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}
