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
  removeFromRiverCollServerUpdate,
  removeFromOfflineRiverColl,


  //Plantarion Report
  createReport,
  updateReport,

  removeFromPlantationReportUpdate,
  removeFromOfflinePlantationReport,

  //Civil Report

  createCivilReport,
  updateCivilReport,


 } from '../flux/actions';
import { connect } from 'react-redux';

import { VERSION  } from  '../flux/types';

//synchro script

import { synchroDataToServer  } from  '../helpers/synchroScript';

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
              synchroDataToServer(self);
            }}>
              <div style={{ width: '14px' }}><i className="fas fa-upload"></i></div>
              <span style={{marginLeft:"15px"}}>Sincronizar al servidor</span>
            </ListItem>
            <ListItem   tappable onClick={()=>{
              let self = this;
              Ons.notification.confirm({title:"",message:'!Estas seguro, esto borrar los datos de memoria!'}).then(function(res) {
                res ? (()=>{
                  localStorage.removeItem('state'); 
                  //localStorage.clear();
                  //localStorage.setItem("state",removeFromJsonString(localStorage.getItem("state"),'navigationIndex',true));
                  //localStorage.setItem("state",removeFromJsonString(localStorage.getItem("state"),'appState',true));
                  ////console.log(localStorage);

                  //deleteFile("appStorage.json");

                  //deleteFile("memoryStorage.json");

                  self.props.LogOut();
                })() : false;
                //ons.notification.alert('Hello ' + name);
              });

            }}>
              <div style={{ width: '14px' }}>
                <Icon icon="fa-key" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon>
              </div>
              <span style={{marginLeft:"15px"}}>Finalizar sesión</span>
            </ListItem>
            <ListItem   tappable onClick={()=>{

              let self = this;
              Ons.notification.confirm({title:"",message:'!Estas seguro, esto borrar los datos de memoria!'}).then(function(res) {
                res ? (()=>{

                  const {offLineFunctionalUnits, serverFunctionalUnits, offLineForestUnitsPhase1,
                      serverForestUnitsPhase1, offLineForestUnitsPhase2, serverForestUnitsPhase2,
                      offLineForestUnitsPhase3, serverForestUnitsPhase3, offLinePlantationReport,
                      serverPlantationReport, offLineTunnelDeformations, serverTunnelDeformations,
                      offLineHillSideMovements, serverHillSideMovements,
                      offLineRainFall, serverRainFall,
                      offLineHillSideCollapse, serverHillSideCollapse,
                      offLineRiverCollapse, serverRiverCollapse,
                  } = self.props.memory;

                  offLineForestUnitsPhase1.forEach( unit => {
                    self.props.removeFromOfflineForestUnitP1(unit);
                  });

                  offLineForestUnitsPhase2.forEach( unit => {
                    self.props.removeFromOfflineForestUnitP2(unit);
                  });

                  offLineForestUnitsPhase3.forEach( unit => {
                    self.props.removeFromOfflineForestUnitP3(unit);
                  });

                  serverForestUnitsPhase1.forEach( unit => {
                    self.props.removeFromForestUnitP1ServerUpdate(unit);
                  });

                  serverForestUnitsPhase2.forEach( unit => {
                      self.props.removeFromForestUnitP2ServerUpdate(unit);
                  });

                  serverForestUnitsPhase3.forEach( unit => {
                    self.props.removeFromForestUnitP3ServerUpdate(unit);
                  });

                  offLineFunctionalUnits.forEach( unit => {
                    self.props.removeFromOfflineFunctionalUnit(unit);
                  });

                  serverFunctionalUnits.forEach( unit => {
                    self.props.removeFromFunctionalUnitServerUpdate(unit);
                  });

                  offLineTunnelDeformations.forEach( unit => {
                    self.props.removeFromOfflineTunnelDeformation(unit);
                  }); 
                  
                  serverTunnelDeformations.forEach( unit => {
                    self.props.removeFromTunnelDeformationServerUpdate(unit);
                  });

                  serverPlantationReport.forEach( unit => {
                    self.props.removeFromPlantationReportUpdate(unit);
                  });

                  offLinePlantationReport.forEach( unit => {
                    self.props.removeFromOfflinePlantationReport(unit);
                  });

                  offLineHillSideMovements.forEach( unit => {
                    self.props.removeFromOfflineHillSideMov(unit);
                  });
                  
                  serverHillSideMovements.forEach( unit => {
                    self.props.removeFromHillSideMovServerUpdate(unit);
                  });

                  offLineRainFall.forEach( unit => {
                    self.props.removeFromOfflineRainFall(unit);
                  });
                  
                  serverRainFall.forEach( unit => {
                    self.props.removeFromRainFallServerUpdate(unit);
                  });

                  offLineHillSideCollapse.forEach( unit => {
                    self.props.removeFromOfflineRainFall(unit);
                  });
                  
                  serverHillSideCollapse.forEach( unit => {
                    self.props.removeFromHillSideCollServerUpdate(unit);
                  });

                  offLineRiverCollapse.forEach( unit => {
                    self.props.removeFromOfflineRiverColl(unit);
                  });
                  
                  serverRiverCollapse.forEach( unit => {
                    self.props.removeFromRiverCollServerUpdate(unit);
                  });

                  window.saveMemoryState = true;

                })():false
              });
              }}>
              <div style={{ width: '14px' }}>
              </div>
               <span style={{marginLeft:"5px"}}>Borrar información <br/> offline</span>
            </ListItem>
          </List>
        </div>
        <BottomToolbar modifier="material" style={{backgroundColor:"#2a6317"}}>
          <span className={'collapse-menu-footer'} style={{fontWeight:"bold",fontStyle:"italic"}}> ver. { VERSION } </span>

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
   removeFromRiverCollServerUpdate,
   removeFromOfflineRiverColl,

   createReport,
   updateReport,

   removeFromPlantationReportUpdate,
   removeFromOfflinePlantationReport,

   createCivilReport,
   updateCivilReport

 })(CollapseMenu);
