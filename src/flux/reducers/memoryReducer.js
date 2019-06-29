import {  ADD_LOGGED_USER  }  from "../types";

let storedData;

try
{
 storedData = JSON.parse(localStorage.getItem('state'));
}
catch(err){
  console.log("error getting data");
}

const initialState =  storedData ? storedData.memory :
{
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
