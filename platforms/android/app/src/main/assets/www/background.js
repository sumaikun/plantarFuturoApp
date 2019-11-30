console.log(self);
postMessage("Working before post message");

onmessage = function (oEvent) {
  console.log(oEvent);

  self.localstorage.root.getFile(oEvent.fileFolder, {}, function(DatFile) {
    console.log(DatFile);
  });
  postMessage("Hi thread finished");

};
