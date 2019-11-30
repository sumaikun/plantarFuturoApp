import { getFileContentAsBase64 , getInputFileBase64 } from './imageHandler';
import Ons from 'onsenui';

export const saveImage = (key,self) => {

    console.log(self);

    ////console.log("react ambit prev cordova");

    ////console.log(self);

    if (window.cordova) {

      console.log("device version");

      console.log(window.device.version);

      if (window.device.platform.toLowerCase() == 'android' && parseInt( window.device.version, 10 ) < 8){
        
        window.cordova.plugins.backgroundMode.enable();
      }

      navigator.camera.getPicture(image => {

        window.cordova.plugins.backgroundMode.disable();

          if(!navigator.onLine)
          {
            console.log("No hay internet");
            console.log(image);

            self.setState({
              formData:
              {
                ...self.state.formData,
                [key]:image
              }
            },()=>{
                ////console.log(self.state);
            });

            return;
          }

          getFileContentAsBase64(image,function(base64Image){

            ////console.log("react ambit post cordova");

            ////console.log(self);

            //window.open(base64Image);
            ////console.log(base64Image);
            // Then you'll be able to handle the myimage.png file as base64

            self.setState({
              formData:
              {
                ...self.state.formData,
                [key]:base64Image
              }
            },()=>{
                ////console.log(self.state);
            });


          });


        }, null,{
          quality : 30,
          correctOrientation : true,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          mediaType: navigator.camera.MediaType.PICTURE,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true
      });

    } else{
      ////console.log("please run the cordova project");
    }


}

export const fileUpload = (key,e,self) => {
    //////console.log(e.target.files);
   
     const file = e.target.files[0];
     const  fileType = file['type'];
     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
     if (validImageTypes.includes(fileType)) {
        ////console.log(key);
       
        getInputFileBase64(e.target.files[0]).then(
          base64Image => {
          //////console.log(base64Image);

                  self.setState({
                    formData:
                    {
                      ...self.state.formData,
                      [key]:base64Image
                    }
                  },()=>{
                      ////console.log(self.state);
                  });
        });
    }
    else{
      e.preventDefault();
      Ons.notification.alert({title:"",message:"No se pueden subir otros archivos que no sean imagenes"});
    }
  } 