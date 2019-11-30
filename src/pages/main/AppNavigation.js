import React, { Component } from 'react';


import { VERSION  } from  '../../flux/types';

//Onsen ui

import {  Navigator, Splitter, SplitterSide, SplitterContent } from 'react-onsenui';

import Ons from 'onsenui';

// Pages

//components
import CollapseMenu from "../../components/CollapseMenu";
import Establishment from '../Plantation/PlantationReport';


import ProjectManagement from "./ProjectManagement";

// REDUX
import { connect } from 'react-redux';
import { insertNavigator , closeMenu , runfromStorage,
   setMemoryStatefromNS, setAppStatefromNS, fetching, notFetching } from '../../flux/actions';

import { readFile } from '../../helpers/writeFiles';


import { deleteFile } from "../../helpers/writeFiles";

class AppNavigation extends Component {

  constructor() {
    super();
    this.renderPage = this.renderPage.bind(this);

  }

  componentDidMount(){

    //reload if new VERSION

    let version = localStorage.getItem('version');

    if( version === null ||  version != VERSION )
    {
      localStorage.clear();
      localStorage.setItem('version',VERSION);

      deleteFile("appStorage.json");

      deleteFile("memoryStorage.json");


    }

    this.props.insertNavigator(this.navigator);


    //console.log(storedData);

    if(window.cordova)
    {
      let self = this;

      this.props.fetching();

      let a = (data) => {
        console.log("data in memory file ");
        console.log(JSON.parse(data));
        this.props.setMemoryStatefromNS(JSON.parse(data));

      }

      console.log("Trying to read memory file");

      readFile("memoryStorage.json",a);

      let b = (data) => {
        console.log("data in app state file ");
        console.log(data);
        console.log(JSON.parse(data));
        this.props.setAppStatefromNS(JSON.parse(data));
        setTimeout(function(){
          this.props.notFetching();
        }, 3000);

      }

      let error = (e) => {
        console.log("error call back");
        console.log(self);
        self.props.notFetching(false);
      }

      console.log("Trying to read app file");

      readFile("appStorage.json",b,error);

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

    let initialRoute = this.props.navigation.initialRoute;

    let storedData = JSON.parse(localStorage.getItem('state'));

    if(storedData)
    {
      console.log("data en local");
      console.log(storedData);
      if(storedData.navigationIndex && storedData.navigationIndex != "GO_TO_LOGIN" )
      {

        initialRoute = { component: ProjectManagement , key: "GO_TO_MANAGEMENT"  }
      }
    }



    this.props.appState.isOpen ? this.props.closeMenu() : null ;

    return (
      <Splitter>
        <SplitterSide side='left' width={220} collapse={true} swipeable={false} isOpen={this.props.appState.isOpen} >
          <CollapseMenu/>
        </SplitterSide>
          <SplitterContent>
            <Navigator
              renderPage={this.renderPage}
              initialRoute={initialRoute}
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
   setMemoryStatefromNS, setAppStatefromNS , fetching, notFetching })(AppNavigation);
