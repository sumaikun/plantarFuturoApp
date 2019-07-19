import { Request } from '../../helpers/request'
import { fetching , notFetching , setProjects , setFunctionalUnits } from "./appActions";
import { getFunctionalUnits  } from "./FunctionalUnitActions";
import { getForestalUnits } from "./forestalUnitActions";
import { getTunnelsDeformation, getHillsidesMovement, getRainfalls,
   getHillsidesCollapse,
   getRiversCollapse } from "./RiskManagement/RiskManagementActions";
import { GET_PROJECTS_URL , GET_PROJECTS_BY_USER } from "../types"
import Ons from 'onsenui';



export const fetchProjects = (id) => {
  return async dispatch => {

      dispatch(fetching());

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }

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



export const getProjectByUser = (id) => {
  return async dispatch => {


      dispatch(fetching());

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }


      let SuccessCallBack = (response) => {

        dispatch(notFetching());

        if(response.status == "204")
        {
          Ons.notification.alert({title:"",message:"El usuario actual no tiene proyectos asociados"});
          return;
        }

        dispatch(setProjects(response.data));

        response.data.forEach( project => {
          console.log(project);

          let SuccessCallBack = (response) => {

            dispatch(notFetching());
            if(response.data.length > 0){
              response.data.forEach( functionalUnit => {
                dispatch(getForestalUnits(functionalUnit.id))
              });
            }

            dispatch(setFunctionalUnits(response.data));
          }
          if(project.phase != 4)
          {
              dispatch(getFunctionalUnits(project.id,SuccessCallBack));
          }
          else{
              dispatch(getTunnelsDeformation(project.id));
              dispatch(getHillsidesMovement(project.id));
              dispatch(getRainfalls(project.id));
              dispatch(getHillsidesCollapse(project.id));
              dispatch(getRiversCollapse(project.id));
          }

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
