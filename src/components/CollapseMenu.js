import React, { Component } from 'react';

//Onsen ui

import {   List, ListItem, Icon, BottomToolbar, Page } from 'react-onsenui';

import Ons from 'onsenui';


// Pages

//flux
import { goToProjects  , LogOut , setProjectPhase } from '../flux/actions';
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
            <ListItem   tappable onClick={this.props.LogOut}>
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

export default  connect(mapStateToProps, { goToProjects , LogOut , setProjectPhase })(CollapseMenu);
