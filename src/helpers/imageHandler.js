export const getFileContentAsBase64 = (path,callback) =>{

  console.log(path);
  window.resolveLocalFileSystemURL(path, gotFile, fail);

  function fail(e) {
        alert('Cannot found requested file');
  }

  function gotFile(fileEntry) {
     fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
             var content = this.result;
             callback(content);
        };
        // The most important point, use the readAsDatURL Method from the file plugin
        reader.readAsDataURL(file);
     });
  }
}

export const getInputFileBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export const forestUnitsImgConvert = (unit) => {

  let promiseArray = [];

  if(unit.id_image)
  {
    if(!unit.id_image.indexOf("base64"))
    {
      let a = getFileContentAsBase64(unit.id_image,function(base64Image){
        unit.id_image = base64Image;
        promiseArray.push(a);
      });
    }
  }

  if(unit.general_image)
  {
    if(!unit.general_image.indexOf("base64"))
    {
      let b = getFileContentAsBase64(unit.general_image,function(base64Image){
        unit.general_image = base64Image;
        promiseArray.push(b);
      });
    }
  }

  if(unit.after_image)
  {
    if(!unit.after_image.indexOf("base64"))
    {
      let c = getFileContentAsBase64(unit.after_image,function(base64Image){
        unit.after_image = base64Image;
        promiseArray.push(c);
      });
    }
  }

  if(unit.reference_image)
  {
    if(!unit.reference_image.indexOf("base64"))
    {
       let d = getFileContentAsBase64(unit.reference_image,function(base64Image){
        unit.reference_image = base64Image;
        promiseArray.push(d);
      });
    }
  }

  return {promiseArray,unit};
}
