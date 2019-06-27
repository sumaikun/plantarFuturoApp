import {  ADD_LOGGED_USER  }  from "../types";

const initialState = {
  userLogged:{},
};

const memoryReducer = (state = initialState, action) => {

  switch(action.type) {

    case ADD_LOGGED_USER:

      state = {
        ...state,
        userLogged:action.payload
      }
      console.log(state);
      return state;

    default:
      return state;
  }
}

export default memoryReducer;
