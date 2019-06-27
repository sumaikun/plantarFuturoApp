import React, { Component } from 'react';

//Onsen ui

import {   List, ListItem, Icon, BottomToolbar, Page } from 'react-onsenui';

import Ons from 'onsenui';

//helpers

import { removeFromJsonString } from '../helpers/objectMethods';

// Pages

//flux
import { goToProjects  , LogOut , setProjectPhase , goToMain } from '../flux/actions';
import { connect } from 'react-redux';

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
            <ListItem   tappable onClick={()=>{this.props.setProjectPhase(1); this.props.goToMain()}}>
              <span style={{marginRight:"15px"}}>Inicio</span> <Icon icon="fa-home" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon>
            </ListItem>
            <ListItem   tappable onClick={()=>{this.props.setProjectPhase(1); this.props.goToProjects()}}>
              <span style={{marginRight:"15px"}}>Inventario</span> <Icon icon="fa-check" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon>
            </ListItem>
            <ListItem   tappable onClick={()=>{this.props.setProjectPhase(2); this.props.goToProjects()}}>
              <span style={{marginRight:"15px"}}>Aprovechamiento</span> <Icon icon="fa-tree" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon>
            </ListItem>
            <ListItem   tappable onClick={()=>{this.props.setProjectPhase(3); this.props.goToProjects()}}>
              <span style={{marginRight:"15px"}}>Compensación</span> <Icon icon="fa-chart-line" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon>
            </ListItem>
            <ListItem   tappable onClick={this.props.goToProjects}>
              <span style={{marginRight:"15px"}}>Vivero</span> <Icon icon="fa-leaf" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon>
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
              <span style={{marginRight:"15px"}}>Finalizar sesión</span> <Icon icon="fa-key" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon>
            </ListItem>
          </List>
        </div>
        <BottomToolbar modifier="material" style={{backgroundColor:"#2a6317"}}>
          <br/>
          <span style={{fontWeight:"bold",fontStyle:"italic",marginLeft:"25px"}}>Plantar Futuro</span>
        </BottomToolbar>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation
  };
}

export default  connect(mapStateToProps, { goToProjects , LogOut , setProjectPhase, goToMain })(CollapseMenu);
