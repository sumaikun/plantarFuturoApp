import { Request } from '../../helpers/request'
import { fetching , notFetching , setProjects } from "./appActions";
import { getFunctionalUnits } from "./FunctionalUnitActions";
import { GET_PROJECTS_URL , GET_PROJECTS_BY_USER } from "../types"




export const fetchProjects = () => {
  return async dispatch => {

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setProjects(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      Request.getRequest(
        GET_PROJECTS_URL,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}



export const getProjectByUser = (id) => {
  return async dispatch => {

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }

      dispatch(fetching());

      let SuccessCallBack = (response) => {

        dispatch(notFetching());

        dispatch(setProjects(response.data));

        response.data.forEach( project => {
          console.log(project);
          dispatch(getFunctionalUnits(project.id));
        });

      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      Request.getRequest(
        GET_PROJECTS_BY_USER+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}
