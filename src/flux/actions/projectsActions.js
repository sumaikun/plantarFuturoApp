import { Request } from '../../helpers/request'
import { fetching , notFetching , setProjects } from "./appActions";
import { GET_PROJECTS_URL } from "../types"




export const fetchProjects = (id) => {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setProjects(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      Request.getRequest(
        GET_PROJECTS_URL/* + '/'+ id*/,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}
