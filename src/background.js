postMessage("Working before post message");

onmessage = function (oEvent) {
  console.log(oEvent);

  localstorage.root.getFile(oEvent.fileFolder, {}, function(DatFile) {
    console.log(DatFile);
  });
  postMessage("Hi thread finished");

};
