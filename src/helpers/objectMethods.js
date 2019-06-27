export const removeFromJsonString = (jsonString,removeKey,returnString = false ) => {
  //console.log(jsonString);
  let jsonObject =  JSON.parse(jsonString);
  delete jsonObject[removeKey];
  return returnString ? JSON.stringify(jsonObject) : jsonObject;

}
