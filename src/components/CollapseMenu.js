import React, { Component } from 'react';

//Onsen ui

import {   List, ListItem, Icon, BottomToolbar, Page } from 'react-onsenui';

import Ons from 'onsenui';


// Pages

//flux
import { goToProjects  , LogOut , setProjectPhase , goToMain } from '../flux/actions';
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
              Ons.notification.confirm('!Estas seguro!').then(function(res) {
                res ? (()=>{
                  localStorage.clear();
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
    navigation: state.navigation
  };
}

export default  connect(mapStateToProps, { goToProjects , LogOut , setProjectPhase, goToMain })(CollapseMenu);
