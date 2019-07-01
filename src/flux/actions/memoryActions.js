import {
    ADD_LOGGED_USER,
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
   REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3
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

//phase 1

export const addOfflineForestUnitP1 = (data) => ({
  type: ADD_FOREST_UNIT_OFFLINE_PHASE1,
  payload: data
});

export const updateServerForestUnitP1 = (data) => ({
  type: UPDATE_SERVER_FOREST_UNIT_PHASE1,
  payload: data
});

export const updateOfflineForestUnitP1 = (data) => ({
  type: UPDATE_OFFLINE_FOREST_UNIT_PHASE1,
  payload: data
});

export const removeFromForestUnitP1ServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1,
  payload: data
});

export const removeFromOfflineForestUnitP1 = (data) => ({
  type: REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1,
  payload: data
});

//phase 2

export const addOfflineForestUnitP2 = (data) => ({
  type: ADD_FOREST_UNIT_OFFLINE_PHASE2,
  payload: data
});

export const updateServerForestUnitP2 = (data) => ({
  type: UPDATE_SERVER_FOREST_UNIT_PHASE2,
  payload: data
});

export const updateOfflineForestUnitP2 = (data) => ({
  type: UPDATE_OFFLINE_FOREST_UNIT_PHASE2,
  payload: data
});

export const removeFromForestUnitP2ServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2,
  payload: data
});

export const removeFromOfflineForestUnitP2 = (data) => ({
  type: REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2,
  payload: data
});


//phase 3

export const addOfflineForestUnitP3 = (data) => ({
  type: ADD_FOREST_UNIT_OFFLINE_PHASE3,
  payload: data
});

export const updateServerForestUnitP3 = (data) => ({
  type: UPDATE_SERVER_FOREST_UNIT_PHASE3,
  payload: data
});

export const updateOfflineForestUnitP3 = (data) => ({
  type: UPDATE_OFFLINE_FOREST_UNIT_PHASE3,
  payload: data
});

export const removeFromForestUnitP3ServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3,
  payload: data
});

export const removeFromOfflineForestUnitP3 = (data) => ({
  type: REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3,
  payload: data
});
