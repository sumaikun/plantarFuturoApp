import React, { Component } from 'react';

//Onsen ui

import {   List, ListItem, Icon, BottomToolbar, Page } from 'react-onsenui';

import Ons from 'onsenui';

//helpers

import { removeFromJsonString } from '../helpers/objectMethods';

// Pages

//flux
import { goToProjects, LogOut, setProjectPhase, goToMain,
  updateFunctionalUnit,
  createFunctionalUnit,
  removeFromFunctionalUnitServerUpdate,
  removeFromOfflineFunctionalUnit,
  createForestUnitPhase1,
  createForestUnitPhase2,
  createForestUnitPhase3,
  updateForestUnitPhase1,
  updateForestUnitPhase2,
  updateForestUnitPhase3,
  removeFromForestUnitP1ServerUpdate,
  removeFromOfflineForestUnitP1,
  removeFromForestUnitP2ServerUpdate,
  removeFromOfflineForestUnitP2,
  removeFromForestUnitP3ServerUpdate,
  removeFromOfflineForestUnitP3,
  updateOfflineForestUnitP1,
  updateOfflineForestUnitP2,
  updateOfflineForestUnitP3,
  notFetching,

  createTunnelDeformation,
  updateTunnelDeformation,
  removeFromTunnelDeformationServerUpdate,
  removeFromOfflineTunnelDeformation,

  createHallsideMovement,
  updateHallsideMovement,
  removeFromHillSideMovServerUpdate,
  removeFromOfflineHillSideMov,


  createRainfall,
  updateRainfall,
  removeFromRainFallServerUpdate,
  removeFromOfflineRainFall,


  createHillsideCollapse,
  updateHillsideCollapse,
  removeFromHillSideCollServerUpdate,
  removeFromOfflineHillSideColl,

  createRiverCollapse,
  updateRiverCollapse,
  removeFromRiverServerUpdate,
  removeFromRiverColl



 } from '../flux/actions';
import { connect } from 'react-redux';

// CSS
import './../css/style.css';

class CollapseMenu extends Component {

  constructor() {
    super();

  }

  componentDidMount(){

  }

  render() {
      return (
      <Page>
        <div style = {{ backgroundColor:" white", height: '100%' }}>
          <List>
            <ListItem className={'collapse-menu-list'} tappable onClick={()=>{this.props.setProjectPhase(1); this.props.goToMain()}}>
              <div style={{ width: '14px' }}><Icon icon="fa-home" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Inicio</span>
            </ListItem>
            <ListItem tappable onClick={()=>{this.props.setProjectPhase(1); this.props.goToProjects()}}>
              <div style={{ width: '14px' }}><Icon icon="fa-check" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Inventario</span>
            </ListItem>
            <ListItem   tappable onClick={()=>{this.props.setProjectPhase(2); this.props.goToProjects()}}>
              <div style={{ width: '14px' }}><Icon icon="fa-tree" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div><span style={{marginLeft:"15px"}}>Aprovechamiento</span>
            </ListItem>
            <ListItem   tappable onClick={()=>{this.props.setProjectPhase(3); this.props.goToProjects()}}>
              <div style={{ width: '14px' }}><Icon icon="fa-chart-line" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Compensación</span>
            </ListItem>
            <ListItem   tappable onClick={this.props.goToProjects}>
              <div style={{ width: '14px' }}><Icon icon="fa-leaf" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Vivero</span>
            </ListItem>
            <ListItem   tappable onClick={()=>{
              let self = this;
              Ons.notification.confirm({title:"",message:'!Estas seguro!'}).then(function(res) {
                res ? (()=>{

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
                    offLineRiverCollapse, serverRiverCollapse
                  } = self.props.memory;

                  console.log("Empezando a sincronizar actualizaciones del servidor");

                  serverFunctionalUnits.forEach(data => {
                    console.log("server functional unit");
                    console.log(data);

                    successMethod = (res) => {
                      Ons.notification.alert({title:"",message:"Unidad funcional sincronizada"});
                      self.props.removeFromFunctionalUnitServerUpdate(data);
                    }

                    self.props.updateFunctionalUnit(data.id,data,successMethod);

                  });

                  //functional units.

                  let synchroForestalUnits = () => {

                    console.log("Empezando a sincronizar unidades forestales");

                    serverForestUnitsPhase1.forEach( unit => {
                      method = (res) => {
                        self.props.notFetching();
                        self.props.removeFromOfflineForestUnitP1(unit);
                      }
                      self.props.updateForestUnitPhase1(unit.id,unit,method);
                    });

                    serverForestUnitsPhase2.forEach( unit => {
                      method = (res) => {
                        self.props.notFetching();
                        self.props.removeFromOfflineForestUnitP1(unit);
                      }
                      self.props.updateForestUnitPhase2(unit.id,unit,method);
                    });

                    serverForestUnitsPhase3.forEach( unit => {
                      method = (res) => {
                        self.props.notFetching();
                        self.props.removeFromOfflineForestUnitP1(unit);
                      }
                      self.props.updateForestUnitPhase3(unit.id,unit,method);
                    });

                    offLineForestUnitsPhase1.forEach( unit => {
                      method = (res) => {
                        self.props.notFetching();
                        self.props.removeFromOfflineForestUnitP1(unit);
                      }
                      self.props.createForestUnitPhase1(unit,method);
                    });

                    offLineForestUnitsPhase2.forEach( unit => {
                      method = (res) => {
                        self.props.notFetching();
                        self.props.removeFromOfflineForestUnitP2(unit);
                      }
                      self.props.createForestUnitPhase2(unit,method);
                    });

                    offLineForestUnitsPhase3.forEach( unit => {
                      method = (res) => {
                        self.props.notFetching();
                        self.props.removeFromOfflineForestUnitP3(unit);
                      }
                      self.props.createForestUnitPhase3(unit,method);
                    });

                  }

                  if(offLineFunctionalUnits.length == 0)
                  {
                    synchroForestalUnits();
                  }
                  else
                  {
                    console.log("Empezando a sincronizar unidades funcionales");

                    offLineFunctionalUnits.forEach(data => {

                      console.log("off line functional unit");
                      console.log(data);

                      let p1 = offLineForestUnitsPhase1.filter( memory => memory.functional_unit_id == data.id );
                      let p2 = offLineForestUnitsPhase2.filter( memory => memory.functional_unit_id == data.id );
                      let p3 = offLineForestUnitsPhase2.filter( memory => memory.functional_unit_id == data.id );

                      successMethod = (response) => {

                        //console.log(response);

                        let fid = response.id;
                        let method;
                        Ons.notification.alert({title:"",message:"Unidad funcional sincronizada"});

                        if(p1.length>0)
                        {
                          p1.forEach( unit => {
                            unit.functional_unit_id = fid;
                            console.log(unit);
                            self.props.updateOfflineForestUnitP1(unit);
                          })
                        }

                        if(p2.length>0)
                        {
                          p2.forEach( unit => {
                            console.log("unidad a sincronizar");
                            unit.functional_unit_id = fid;
                            console.log(unit);
                            self.props.updateOfflineForestUnitP2(unit);
                          })
                        }

                        if(p3.length>0)
                        {
                          p3.forEach( unit => {
                            unit.functional_unit_id = fid;
                            console.log(unit);
                            self.props.updateOfflineForestUnitP3(unit);
                          })
                        }
                        self.props.removeFromOfflineFunctionalUnit(data);
                        synchroForestalUnits();
                      }

                      self.props.createFunctionalUnit(data,successMethod);

                    });
                  }

                })() : false;

              });

            }}>
              <span style={{marginRight:"15px"}}>Sincronizar al servidor</span> <i class="fas fa-upload"></i>
            </ListItem>
            <ListItem   tappable onClick={()=>{
              let self = this;
              Ons.notification.confirm({title:"",message:'!Estas seguro!'}).then(function(res) {
                res ? (()=>{
                  //localStorage.clear();
                  localStorage.setItem("state",removeFromJsonString(localStorage.getItem("state"),'navigationIndex',true));
                  console.log(localStorage);
                  self.props.LogOut();
                })() : false;
                //ons.notification.alert('Hello ' + name);
              });

            }}>
              <div style={{ width: '14px' }}><Icon icon="fa-key" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Finalizar sesión</span>
            </ListItem>
          </List>
        </div>
        <BottomToolbar modifier="material" style={{backgroundColor:"#2a6317"}}>
          <br/>
          <span className={'collapse-menu-footer'} style={{fontWeight:"bold",fontStyle:"italic"}}>Plantar <span className={'collapse-menu-footer-futuro'} style={{fontWeight:"bold",fontStyle:"italic"}}>Futuro</span></span>
        </BottomToolbar>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    memory: state.memory
  };
}

export default  connect(mapStateToProps, { goToProjects, LogOut, setProjectPhase,
   goToMain,
   updateFunctionalUnit,
   createFunctionalUnit,
   removeFromFunctionalUnitServerUpdate,
   removeFromOfflineFunctionalUnit,
   createForestUnitPhase1,
   createForestUnitPhase2,
   createForestUnitPhase3,
   updateForestUnitPhase1,
   updateForestUnitPhase2,
   updateForestUnitPhase3,
   removeFromForestUnitP1ServerUpdate,
   removeFromOfflineForestUnitP1,
   removeFromForestUnitP2ServerUpdate,
   removeFromOfflineForestUnitP2,
   removeFromForestUnitP3ServerUpdate,
   removeFromOfflineForestUnitP3,
   updateOfflineForestUnitP1,
   updateOfflineForestUnitP2,
   updateOfflineForestUnitP3,
   notFetching
 })(CollapseMenu);
