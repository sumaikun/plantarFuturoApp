import {
    ADD_LOGGED_USER,
   ADD_FUNCTIONAL_UNIT_OFFLINE,
   UPDATE_SERVER_FUNCTIONAL_UNIT,
   UPDATE_OFFLINE_FUNCTIONAL_UNIT,
   REMOVE_FROM_UPDATE_SERVER_FUNIT,
   REMOVE_FROM_OFFLINE_FUNIT
}  from "../types";


export const addLoggedUser = (data) => ({
  type: ADD_LOGGED_USER,
  payload: data
});

export const addOfflineFunctionalUnit = (data) => ({
  type: ADD_FUNCTIONAL_UNIT_OFFLINE,
  payload: data
});

export const updateServerFunctionalUnit = (data) => ({
  type: UPDATE_SERVER_FUNCTIONAL_UNIT,
  payload: data
});

export const updateOfflineFunctionalUnit = (data) => ({
  type: UPDATE_OFFLINE_FUNCTIONAL_UNIT,
  payload: data
});

export const removeFromFunctionalUnitServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_FUNIT,
  payload: data
});

export const removeFromOfflineFunctionalUnit = (data) => ({
  type: REMOVE_FROM_OFFLINE_FUNIT,
  payload: data
});
