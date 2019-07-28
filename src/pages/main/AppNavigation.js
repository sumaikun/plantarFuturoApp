import React, { Component } from 'react';


import { VERSION  } from  '../../flux/types';

//Onsen ui

import {  Navigator, Splitter, SplitterSide, SplitterContent } from 'react-onsenui';

import Ons from 'onsenui';

// Pagesñ

//components
import CollapseMenu from "../../components/CollapseMenu";
import Establishment from '../Plantation/PlantationReport';

// REDUX
import { connect } from 'react-redux';
import { insertNavigator , closeMenu , runfromStorage, setAppStatefromNS,
setMemoryStatefromNS } from '../../flux/actions';


class AppNavigation extends Component {

  constructor() {
    super();
    this.renderPage = this.renderPage.bind(this);

  }

  componentDidMount(){

    //console.log("Check if didmount can be found");

    this.props.insertNavigator(this.navigator);


    if(window.cordova)
    {
      //console.log("cordova version");
      let self = this;

      /*window.NativeStorage.getItem("version",(version)=>{

        if( version === null ||  version != VERSION )
        {
          window.NativeStorage.clear(()=>{
            console.log("ns clear");
            window.NativeStorage.setItem('version',VERSION,()=>{},error=>{
              console.log("error setting version");
            });
          },error=>{
            console.log("ns error on clear");
          });


        }
        else{

        }
      });*/

      window.NativeStorage.getItem("state",(state)=>{

      console.log("ns Storage app orgin");

        state = JSON.parse(state);

        if(state.appState)
        {
          self.props.setAppStatefromNS(state.appState);
        }

        if(state.memory)
        {
          self.props.setMemoryStatefromNS(state.memory);
        }

        if(state.navigationIndex)
        {
          if(state.navigationIndex && state.navigationIndex != "GO_TO_LOGIN" )
          {
            ////console.log(storedData.navigationIndex);
            //this.props.runfromStorage(storedData.navigationIndex);
            self.props.runfromStorage("GO_TO_MANAGEMENT");
          }
        }


      },(error)=>{
        console.log("error ns"+error);
      });



    }


    if(!window.cordova){

      console.log("not cordova version");
      //reload if new VERSION
      let version = localStorage.getItem('version');

      if( version === null ||  version != VERSION )
      {
        localStorage.clear();
        localStorage.setItem('version',VERSION);
      }

      let storedData = JSON.parse(localStorage.getItem('state'));
      //console.log(storedData);
      if(storedData)
      {
        if(storedData.navigationIndex && storedData.navigationIndex != "GO_TO_LOGIN" )
        {
          ////console.log(storedData.navigationIndex);
          //this.props.runfromStorage(storedData.navigationIndex);
          this.props.runfromStorage("GO_TO_MANAGEMENT");
        }
      }
    }


  }

  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    route.props.key = route.key;

    ////console.log(React.createElement(route.component, route.props));
    return React.createElement(route.component, route.props);
  }





  render() {

    this.props.appState.isOpen ? this.props.closeMenu() : null ;

    return (
      <Splitter>
        <SplitterSide side='left' width={220} collapse={true} swipeable={false} isOpen={this.props.appState.isOpen} >
          <CollapseMenu/>
        </SplitterSide>
          <SplitterContent>
            <Navigator
              renderPage={this.renderPage}
              initialRoute={this.props.navigation.initialRoute}
              ref={(navigator) => { this.navigator = navigator; }}
            />
        </SplitterContent>
      </Splitter>
    );
  }

}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState
  };
}

export default  connect(mapStateToProps, { insertNavigator , closeMenu, runfromStorage,
  setAppStatefromNS,
  setMemoryStatefromNS })(AppNavigation);
