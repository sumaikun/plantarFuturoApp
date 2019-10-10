import { Request } from '../../helpers/request'
import { fetching , notFetching , setProjects , setFunctionalUnits } from "./appActions";
import { getFunctionalUnits  } from "./FunctionalUnitActions";
import { getForestalUnits } from "./forestalUnitActions";
import { getPlantationReports, getPlantationReportsByProject } from "./Plantation/PlantationActions";
import { getDefaultActivitiesByType  } from "./Activity/ActivityActions"; 
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



export const getProjectByUser = (user) => {
  return async dispatch => {

      let id = user.id;

      dispatch(fetching());
      
      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }

      //dispatch( getPlantationReports(true) );

      dispatch( getDefaultActivitiesByType(1) );
      dispatch( getDefaultActivitiesByType(2) );

      let SuccessCallBack = (response) => {

        //dispatch(notFetching());

        if(response.status == "204")
        {
          Ons.notification.alert({title:"",message:"El usuario actual no tiene proyectos asociados"});
          return;
        }

        dispatch(setProjects(response.data));

        response.data.forEach( project => {
          //console.log(project);


          let SuccessCallBack = (response) => {

            if(response.data.length > 0){
              response.data.forEach( (functionalUnit, index) => {
                  if ( index == response.data.length - 1 ){

                    setTimeout(function(){

                      let callback = () => {
                        window.saveAppState = true;
                        console.log("last data downloaded");
                        console.log(window.storageReference);
                      }

                      dispatch(getForestalUnits(functionalUnit.id,null,null,false
                        ,callback));

                    }, 6000);

                  }
                  else{
                      dispatch(getForestalUnits(functionalUnit.id,null,null,true))
                  }
              });
            }
            dispatch(setFunctionalUnits(response.data));
            //dispatch(notFetching());
          }


          if(project.phase != 4 && project.phase != 5)
          {
              dispatch(getFunctionalUnits(project.id,SuccessCallBack,true));
          }
          else{
              if(user.risk)
              {
                dispatch(getTunnelsDeformation(project.id, null, null, true));
                dispatch(getHillsidesMovement(project.id, null, null, true));
                dispatch(getRainfalls(project.id, null, null, true));
                dispatch(getHillsidesCollapse(project.id, null, null, true));
                dispatch(getRiversCollapse(project.id, null, null, true));
              } 
              
              if(project.phase == 5)
              {
                console.log("obtener proyecto de plantación");
                dispatch(getPlantationReportsByProject(project.id,true));
              }
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
