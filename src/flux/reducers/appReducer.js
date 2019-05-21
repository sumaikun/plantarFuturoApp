import { FETCH, CANCEL_FETCH, MENU_OPEN, MENU_CLOSE, SETUSER, SET_PROJECTS, SET_PROJECT_PHASE,
SET_FUNCTIONAL_UNITS, RESET_FUNCTIONAL_UNITS, SET_FORESTAL_UNITS, SET_FORESTAL_UNIT, SET_FUNCTIONAL_UNIT,
SELECT_PROJECT  } from "../types";

let initialProjects = []

let initialForestalUnits = [];

let initialFunctionalUnits = [];

let initialForestalUnitE = null;

let initialSelectedProject = null;

let initialCurrentFE = null;

const initialState = {
  isFetching:false,
  isOpen:false,
  user:{},
  projects:initialProjects,
  functionalUnits:initialFunctionalUnits,
  forestalUnits:initialForestalUnits,
  currentPhase:1,
  forestalUnitE:initialForestalUnitE,
  currentFunctionalUnit:initialCurrentFE,
  selectedProject:initialSelectedProject,
};

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case SETUSER:
      state={
        ...state,
        user:action.payload
      }
      return state;
    case SET_PROJECTS:
      state={
        ...state,
        projects:action.payload
      }
      return state;
    case SET_PROJECT_PHASE:
      state={
        ...state,
        currentPhase:action.payload
      }
      console.log(state);
      return state;
    case SET_FUNCTIONAL_UNITS:

      let functionalArray = state.functionalUnits;

      console.log(functionalArray);
      let result ;

      action.payload.forEach(load => {
        result = true;
        functionalArray.forEach(data => {
            if(load.id == data.id)
            {
              result = false;
            }
        });
        if(result)
        {
          functionalArray.push(load);
        }
      });

      state={
        ...state,
        functionalUnits:functionalArray
      }
      console.log(state);
      return state;
    case RESET_FUNCTIONAL_UNITS:
      state={
        ...state,
        functionalUnits:[]
      }
    return state;
    case SET_FORESTAL_UNITS:
      state={
        ...state,
        forestalUnits:action.payload
      }
      console.log(state);
    return state;
    case SET_FORESTAL_UNIT:
      state={
        ...state,
        forestalUnitE:action.payload
      }
      console.log(state);
    return state;
    case FETCH:
      state={
        ...state,
        isFetching:true
      }
      return state;
    case CANCEL_FETCH:
      state={
        ...state,
        isFetching:false
      }
      return state;
    case MENU_OPEN:
      state={
        ...state,
        isOpen:true
      }
      return state;
    case MENU_CLOSE:
      console.log("exec here");
      state={
        ...state,
        isOpen:false
      }
      return state;
    case SET_FUNCTIONAL_UNIT:
      state={
        ...state,
        currentFunctionalUnit:action.payload
      }
      console.log(state);
      return state;
    case SELECT_PROJECT:
      state={
        ...state,
        selectedProject:action.payload
      }
      console.log(state);
      return state;
    default:
      return state;
  }
}




export default appReducer;
