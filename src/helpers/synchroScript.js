import Ons from 'onsenui';

import { getFileContentAsBase64 , getInputFileBase64 , forestUnitsImgConvert } from './imageHandler';

export const synchroDataToServer = (self) =>
{
    Ons.notification.confirm({title:"",message:'!Estas seguro!'}).then(function(res) {
        res ? (()=>{

          
            
          var time = 0;

          let successMethod;

          let method;

          if(!navigator.onLine)
          {
            return Ons.notification.alert({title:"",message:"No se puede sincronizar sin internet"});
          }

          const {
            offLineFunctionalUnits, serverFunctionalUnits, offLineForestUnitsPhase1,
            serverForestUnitsPhase1, offLineForestUnitsPhase2, serverForestUnitsPhase2,
            offLineForestUnitsPhase3, serverForestUnitsPhase3,
            offLineTunnelDeformations, serverTunnelDeformations,
            offLineHillSideMovements, serverHillSideMovements,
            offLineRainFall, serverRainFall,
            offLineHillSideCollapse, serverHillSideCollapse,
            offLineRiverCollapse, serverRiverCollapse,

            //plantationReport

            offLinePlantationReport,
            serverPlantationReport

          } = self.props.memory;

          //functional units.


          let synchroForestalUnits = () => {



            serverForestUnitsPhase1.forEach( unit => {

              let result = forestUnitsImgConvert(unit);

              let promiseArray = result.promiseArray;

              let proccess = () => {
                  unit = result.unit;

                  method = (res) => {
                    self.props.notFetching();
                    //self.props.removeFromForestUnitP1ServerUpdate(unit);
                  }
                  setTimeout(function(){
                    self.props.updateForestUnitPhase1(unit.id,unit,method);
                    time = time + 500;
                  }, time + 500);
               }

               promiseArray.length > 0 ? Promise.all(promiseArray).then(values => {
                 proccess();
               }):proccess();

            });


            serverForestUnitsPhase2.forEach( unit => {

              //console.log("server edit");
              //console.log(unit);


              let result = forestUnitsImgConvert(unit);

              console.log(result);

              let promiseArray = result.promiseArray;

              let proccess = () => {

                unit = result.unit;

                method = (res) => {

                    console.log("execute delete in memory");
                    self.props.notFetching();
                    //self.props.removeFromForestUnitP2ServerUpdate(unit);

                }

                setTimeout(function(){
                  self.props.updateForestUnitPhase2(unit.id,unit,method);
                  time = time+500;
                }, 500+time);

              }

              promiseArray.length > 0 ? Promise.all(promiseArray).then(values => {
                proccess();
              }):proccess();

            });

            serverForestUnitsPhase3.forEach( unit => {

              let result = forestUnitsImgConvert(unit);

              let promiseArray = result.promiseArray;

              let proccess = () => {
                  unit = result.unit;
                  method = (res) => {
                    self.props.notFetching();
                    //self.props.removeFromForestUnitP3ServerUpdate(unit);
                  }

                  setTimeout(function(){
                    self.props.updateForestUnitPhase3(unit.id,unit,method);
                    time = time+500;
                  }, 500+time);

               }

               promiseArray.length > 0 ? Promise.all(promiseArray).then(values => {
                 proccess();
               }):proccess();

            });

            offLineForestUnitsPhase1.forEach( unit => {

              let result = forestUnitsImgConvert(unit);

              let promiseArray = result.promiseArray;

              let proccess = () => {

                  unit = result.unit;

                  method = (res) => {
                    self.props.notFetching();
                    //self.props.removeFromOfflineForestUnitP1(unit);
                  }
                  setTimeout(function(){
                    self.props.createForestUnitPhase1(unit,method);
                    time = time+500;
                  },time+500);

               }

               promiseArray.length > 0 ? Promise.all(promiseArray).then(values => {
                 proccess();
               }):proccess();

            });

            offLineForestUnitsPhase2.forEach( unit => {

              //console.log("server create");
              //console.log(unit);
              //console.log("server create");

              let result = forestUnitsImgConvert(unit);

              //console.log(result);

              let promiseArray = result.promiseArray;

              let proccess = () => {
                  unit = result.unit;
                  method = (res) => {
                    self.props.notFetching();
                    //console.log("i try to remove forest unit p2");
                    //self.props.removeFromOfflineForestUnitP2(unit);
                  }
                  setTimeout(function(){
                    self.props.createForestUnitPhase2(unit,method);
                    time = time+500;
                  },time+500);
               }

               promiseArray.length > 0 ? Promise.all(promiseArray).then(values => {
                 proccess();
               }):proccess();

            });

            offLineForestUnitsPhase3.forEach( unit => {

              let result = forestUnitsImgConvert(unit);

              unit = result.unit;

              let promiseArray = result.promiseArray;

              let proccess = () => {
                  unit = result.unit;
                  method = (res) => {
                    self.props.notFetching();
                    //self.props.removeFromOfflineForestUnitP3(unit);
                  }

                  setTimeout(function(){
                    self.props.createForestUnitPhase3(unit,method);
                    time = time+500;
                  }, 500+time);

               }

               promiseArray.length > 0 ? Promise.all(promiseArray).then(values => {
                 proccess();
               }):proccess();

            });

          }

          console.log("Empezando a sincronizar actualizaciones del servidor");

          serverFunctionalUnits.forEach(data => {
            //console.log("server functional unit");
            //console.log(data);

            successMethod = (res) => {
              Ons.notification.alert({title:"",message:"Unidad funcional sincronizada"});
              //self.props.removeFromFunctionalUnitServerUpdate(data);
            }

            self.props.updateFunctionalUnit(data.id,data,successMethod);

          });



          if(offLineFunctionalUnits.length == 0)
          {
            synchroForestalUnits();
          }
          else
          {
            console.log("Empezando a sincronizar unidades funcionales");

            offLineFunctionalUnits.forEach(data => {

              //console.log("off line functional unit");
              //console.log(data);

              let p1 = offLineForestUnitsPhase1.filter( memory => memory.functional_unit_id == data.id );
              let p2 = offLineForestUnitsPhase2.filter( memory => memory.functional_unit_id == data.id );
              let p3 = offLineForestUnitsPhase3.filter( memory => memory.functional_unit_id == data.id );

              console.log(p1);

              console.log(p2);

              console.log(p3);

              successMethod = (response) => {

                ////console.log(response);

                let fid = response.id;
                let method;
                Ons.notification.alert({title:"",message:"Unidad funcional sincronizada"});

                if(p1.length>0)
                {
                  p1.forEach( unit => {
                    unit.functional_unit_id = fid;
                    //console.log(unit);
                    self.props.updateOfflineForestUnitP1(unit);
                  })
                }

                if(p2.length>0)
                {
                  p2.forEach( unit => {
                    //console.log("unidad a sincronizar");
                    unit.functional_unit_id = fid;
                    //console.log(unit);
                    self.props.updateOfflineForestUnitP2(unit);
                  })
                }

                if(p3.length>0)
                {
                  p3.forEach( unit => {
                    unit.functional_unit_id = fid;
                    //console.log(unit);
                    self.props.updateOfflineForestUnitP3(unit);
                  })
                }
                //self.props.removeFromOfflineFunctionalUnit(data);
                console.log("sincronizar unidades forestal despues de crear unidad funcional");
                synchroForestalUnits();
              }

              self.props.createFunctionalUnit(data,successMethod);

            });
          }


          //console.log("Sincronizar deformación de tunel");

          serverTunnelDeformations.forEach( unit => {
            //console.log(unit);
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromTunnelDeformationServerUpdate(unit);
            }
            self.props.updateTunnelDeformation(unit.id,unit,method);
          });

          offLineTunnelDeformations.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromOfflineTunnelDeformation(unit);
            }
            self.props.createTunnelDeformation(unit,method);
          });

          //console.log("Sincronizar deslizamientos de ladera");


          serverHillSideMovements.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromHillSideMovServerUpdate(unit);
            }
            self.props.updateTunnelDeformation(unit.id,unit,method);
          });

          offLineHillSideMovements.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromOfflineHillSideMov(unit);
            }
            self.props.createHallsideMovement(unit,method);
          });


          //console.log("Sincronizar precipitaciones");


          serverRainFall.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromRainFallServerUpdate(unit);
            }
            self.props.updateRainfall(unit.id,unit,method);
          });

          offLineRainFall.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromOfflineRainFall(unit);
            }
            self.props.createRainfall(unit,method);
          });

          //console.log("Sincronizar recorrido  de ladera");

          serverHillSideCollapse.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromHillSideCollServerUpdate(unit);
            }
            self.props.updateHillsideCollapse(unit.id,unit,method);
          });

          offLineHillSideCollapse.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromOfflineHillSideColl(unit);
            }
            self.props.createHillsideCollapse(unit,method);
          });

          //console.log("Sincronizar recorrido  de quebrada");

          serverRiverCollapse.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromRiverCollServerUpdate(unit);
            }
            self.props.updateRiverCollapse(unit.id,unit,method);
          });

          offLineRiverCollapse.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromOfflineRiverColl(unit);
            }
            self.props.createRiverCollapse(unit,method);
          });

          
          console.log("sincronizar reportes de plantación");

          serverPlantationReport.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromRiverCollServerUpdate(unit);
            }
            self.props.updateReport(unit.id,unit,method);
          });

          offLinePlantationReport.forEach( unit => {
            method = (res) => {
              self.props.notFetching();
              //self.props.removeFromOfflineRiverColl(unit);
            }
            self.props.createReport(unit,method);
          });

        })() : false;

      });



}