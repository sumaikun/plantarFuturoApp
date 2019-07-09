import React, { Component } from 'react';


import { VERSION  } from  '../../flux/types';

//Onsen ui

import {  Navigator, Splitter, SplitterSide, SplitterContent } from 'react-onsenui';

import Ons from 'onsenui';

// Pages

//components
import CollapseMenu from "../../components/CollapseMenu";


// REDUX
import { connect } from 'react-redux';
import { insertNavigator , closeMenu , runfromStorage } from '../../flux/actions';


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
    }

    this.props.insertNavigator(this.navigator);

    let storedData = JSON.parse(localStorage.getItem('state'));
    console.log(storedData);
    if(storedData)
    {
      if(storedData.navigationIndex && storedData.navigationIndex != "GO_TO_LOGIN" )
      {
        //console.log(storedData.navigationIndex);
        //this.props.runfromStorage(storedData.navigationIndex);
        this.props.runfromStorage("GO_TO_MANAGEMENT");
      }
    }

  }

  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    route.props.key = route.key;

    //console.log(React.createElement(route.component, route.props));
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

export default  connect(mapStateToProps, { insertNavigator , closeMenu, runfromStorage })(AppNavigation);