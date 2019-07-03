export const getFileContentAsBase64 = (path,callback) =>{

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
