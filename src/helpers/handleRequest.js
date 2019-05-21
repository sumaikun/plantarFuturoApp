import { Validation_400, Validation_401, Validation_405, DefaultError } from "./formValidation";


export const handleCodeError = (error, message = null) => {

  if(!error.response)
  {
    console.log(error);
    DefaultError(" Parece que tenemos un problema con el internet o la conexión al servidor ");
    return;
  }


  switch(error.response.status)
  {
    case 400:
      console.log("400 error");
      Validation_400(error.response.data);
      break;
    case 401:
      console.log("401 error");
      Validation_401();
      break;
    case 405:
      console.log("405 error");
      Validation_405();
      break;
    default:
      DefaultError(message);
      break;
  }


}
