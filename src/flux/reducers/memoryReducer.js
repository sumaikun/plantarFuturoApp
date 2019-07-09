import {  ADD_LOGGED_USER,
ADD_FUNCTIONAL_UNIT_OFFLINE,
UPDATE_SERVER_FUNCTIONAL_UNIT,
UPDATE_OFFLINE_FUNCTIONAL_UNIT,
REMOVE_FROM_UPDATE_SERVER_FUNIT,
REMOVE_FROM_OFFLINE_FUNIT,
ADD_FOREST_UNIT_OFFLINE_PHASE1,
UPDATE_SERVER_FOREST_UNIT_PHASE1,
UPDATE_OFFLINE_FOREST_UNIT_PHASE1,
REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1,
REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1,
ADD_FOREST_UNIT_OFFLINE_PHASE2,
UPDATE_SERVER_FOREST_UNIT_PHASE2,
UPDATE_OFFLINE_FOREST_UNIT_PHASE2,
REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2,
REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2,
ADD_FOREST_UNIT_OFFLINE_PHASE3,
UPDATE_SERVER_FOREST_UNIT_PHASE3,
UPDATE_OFFLINE_FOREST_UNIT_PHASE3,
REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3,
REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3  }  from "../types";

import { editOrAddToArray, removeFromArray } from "../../helpers/objectMethods"

let storedData;

//localStorage.clear();

let defaultValues = {
  userLogged:{},
  offLineFunctionalUnits:[],
  serverFunctionalUnits:[],
  hasDataToSychro: false,
  offLineForestUnitsPhase1:[],
  serverForestUnitsPhase1:[],
  offLineForestUnitsPhase2:[],
  serverForestUnitsPhase2:[],
  offLineForestUnitsPhase3:[],
  serverForestUnitsPhase3:[]
}

try
{
 storedData = JSON.parse(localStorage.getItem('state'));
 if(!storedData.memory){
   storedData.memory = defaultValues;
 }
}
catch(err){
  console.log("error getting data");
}



const initialState =  storedData ? storedData.memory  : defaultValues;
;

const generateRandomId = () => {
  let dateobj = new Date();
  return dateobj.toString().hashCode();
}

const removeFromState = ( state, stateParameter, action ) => {

  let workingVariable = state[stateParameter];

  workingVariable = removeFromArray(workingVariable,action.payload);

  state = {
    ...state,
    [stateParameter]:workingVariable
  }

  console.log(state);

  return state;
}

const updateFromState = ( state, stateParameter, action ) => {

  //console.log(stateParameter);

  if(!action.payload.ToSynchro)
  {
    action.payload.ToSynchroEdit = true;
  }

  let workingVariable = state[stateParameter];

  workingVariable = editOrAddToArray(workingVariable,action.payload);

  state = {
    ...state,
    [stateParameter]:workingVariable
  }
  console.log(state);
  return state;
}

const createOnState = ( state, stateParameter, action ) => {

  action.payload.id = generateRandomId();

  action.payload.ToSynchro = true;

  state = {
    ...state,
    [stateParameter]:[
      ...state[stateParameter],
      action.payload
    ]
  }

  console.log(state);

  return state;

}

const memoryReducer = (state = initialState, action) => {

  switch(action.type) {

    case ADD_LOGGED_USER:

      state = {
        ...state,
        userLogged:action.payload
      }
      console.log(state);
      return state;

    case ADD_FUNCTIONAL_UNIT_OFFLINE:

      /*action.payload.id = generateRandomId();

      console.log(action.payload);

      state = {
        ...state,
        offLineFunctionalUnits:[
          ...state.offLineFunctionalUnits,
          action.payload
        ]
      }

      console.log(state);*/
      state = createOnState(state,'offLineFunctionalUnits',action);

      return state;
    case UPDATE_SERVER_FUNCTIONAL_UNIT:

      /*serverFunctionalUnits = state.serverFunctionalUnits;

      serverFunctionalUnits = editOrAddToArray(serverFunctionalUnits,action.payload,"id");

        state = {
          ...state,
          serverFunctionalUnits
        }

        console.log(state);*/

      updateFromState(state,'serverFunctionalUnits',action);

      return state;
    case UPDATE_OFFLINE_FUNCTIONAL_UNIT:

      /*offLineFunctionalUnits = state.offLineFunctionalUnits;

      offLineFunctionalUnits = editOrAddToArray(offLineFunctionalUnits,action.payload,"id");

        state = {
          ...state,
          offLineFunctionalUnits
        }

        console.log(state);*/

      updateFromState(state,'offLineFunctionalUnits',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_FUNIT:

      /*serverFunctionalUnits = state.serverFunctionalUnits;

      serverFunctionalUnits = removeFromArray(serverFunctionalUnits,action.payload);

      state = {
        ...state,
        serverFunctionalUnits
      }

      console.log(state);*/

      state = removeFromState(state,'serverFunctionalUnits',action);

      return state;
    case REMOVE_FROM_OFFLINE_FUNIT:

      /*offLineFunctionalUnits = state.offLineFunctionalUnits;

      offLineFunctionalUnits = removeFromArray(offLineFunctionalUnits,action.payload);

      state = {
        ...state,
        offLineFunctionalUnits
      }

      console.log(state);
      */

      state = removeFromState(state,'offLineFunctionalUnits',action);

      return state;

    case ADD_FOREST_UNIT_OFFLINE_PHASE1:

      state = createOnState(state,'offLineForestUnitsPhase1',action);

      return state;

    case UPDATE_OFFLINE_FOREST_UNIT_PHASE1:

      state = updateFromState(state,'offLineForestUnitsPhase1',action);

      return state;

    case UPDATE_SERVER_FOREST_UNIT_PHASE1:

      state = updateFromState(state,'serverForestUnitsPhase1',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1:

      state = removeFromState(state,'serverForestUnitsPhase1',action);

      return state;

    case REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1:

      state = removeFromState(state,'offLineForestUnitsPhase1',action);

      return state;

    case ADD_FOREST_UNIT_OFFLINE_PHASE2:

      state = createOnState(state,'offLineForestUnitsPhase2',action);

      return state;

    case UPDATE_SERVER_FOREST_UNIT_PHASE2:

      state = updateFromState(state,'serverForestUnitsPhase2',action);

      return state;

    case UPDATE_SERVER_FOREST_UNIT_PHASE2:

      state = updateFromState(state,'offLineForestUnitsPhase2',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2:

      state = removeFromState(state,'serverForestUnitsPhase2',action);

      return state;

    case REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2:

      state = removeFromState(state,'offLineForestUnitsPhase2',action);

      return state;

    case ADD_FOREST_UNIT_OFFLINE_PHASE3:

      state = createOnState(state,'offLineForestUnitsPhase3',action);

      return state;

    case UPDATE_SERVER_FOREST_UNIT_PHASE3:

      state = updateFromState(state,'serverForestUnitsPhase3',action);

      return state;

    case UPDATE_SERVER_FOREST_UNIT_PHASE3:

      state = updateFromState(state,'offLineForestUnitsPhase3',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3:

      state = removeFromState(state,'serverForestUnitsPhase3',action);

      return state;

    case REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3:

      state = removeFromState(state,'offLineForestUnitsPhase3',action);

      return state;

    default:
      return state;
  }
}

export default memoryReducer;
