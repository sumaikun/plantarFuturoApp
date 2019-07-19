import { FETCH, CANCEL_FETCH, MENU_OPEN, MENU_CLOSE, SETUSER, SET_PROJECTS,
SET_PROJECT_PHASE, SET_FUNCTIONAL_UNITS, RESET_FUNCTIONAL_UNITS, SET_FORESTAL_UNITS,
SET_FORESTAL_UNIT , SET_FUNCTIONAL_UNIT , SELECT_PROJECT, SET_RISK_OVERVIEW, SET_SST } from "../types";

export const openMenu = () => ({
  type: MENU_OPEN
});

export const closeMenu = () => ({
  type: MENU_CLOSE
});

export const fetching = () => ({
  type: FETCH
});

export const notFetching = () => ({
  type: CANCEL_FETCH
});

export const setUser = (data) => ({
  type: SETUSER,
  payload: data
});

export const setProjects = (data) => ({
  type: SET_PROJECTS,
  payload: data
});
export const setRiskOverview = (data) => ({
  type: SET_RISK_OVERVIEW,
  payload: data
})
export const setProjectPhase = (data) => ({
  type: SET_PROJECT_PHASE,
  payload: data
});
export const setFunctionalUnits = (data) => ({
  type: SET_FUNCTIONAL_UNITS,
  payload: data
})

export const resetFunctionalUnits = () => ({
  type: RESET_FUNCTIONAL_UNITS
})

export const setForestalUnits = (data) => ({
  type: SET_FORESTAL_UNITS,
  payload: data
})

export const setSST = (data) => ({
  type: SET_SST,
  payload: data
})

export const setForestalUnit = (data) => ({
  type: SET_FORESTAL_UNIT,
  payload: data
})

export const setFunctionalUnit = (data) => ({
  type: SET_FUNCTIONAL_UNIT,
  payload: data,
})

export const selectProject = (data) => ({
  type: SELECT_PROJECT,
  payload: data,
})
