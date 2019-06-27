import {  ADD_LOGGED_USER  }  from "../types";


export const addLoggedUser = (data) => ({
  type: ADD_LOGGED_USER,
  payload: data
});
