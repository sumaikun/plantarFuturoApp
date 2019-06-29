
//remove paramter from a json parsed in string

export const removeFromJsonString = (jsonString,removeKey,returnString = false ) => {
  //console.log(jsonString);
  let jsonObject =  JSON.parse(jsonString);
  delete jsonObject[removeKey];
  return returnString ? JSON.stringify(jsonObject) : jsonObject;

}

//get parameter from a json parsed in string

export const getFromJsonString = (jsonString,getKey,returnString = false ) => {
  //console.log(jsonString);
  let jsonObject =  JSON.parse(jsonString);
  return returnString ? JSON.stringify(jsonObject[getKey]) : jsonObject[getKey];

}
