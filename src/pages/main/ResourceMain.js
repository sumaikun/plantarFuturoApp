import React, { Component } from 'react';
//sources
import checkList from "../../img/checkList.png";
import tree from "../../img/tree.png";
import chart from "../../img/chart.png";
import plant from "../../img/plant.png";
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import "../../css/Modal.css";

//Onsen Ui
import {  Col, Row, Card, Button} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import CardButton from "../../components/CardButton";
import Loading from "../../components/Loading";

//container
import AppPage from '../../containers/AppPage';

//flux
import {
  setProjectPhase,
  goToProjects,
  fetchProjects,
  goToRiskManagement,
  goToInventoryManagement,
  } from '../../flux/actions';
import { connect } from 'react-redux';

//css
import "../../css/style.css";

class ProjectManagement extends Component {
  constructor(props) {
    super(props);
    this.contentPage = this.contentPage.bind(this);
  }

  componentDidMount(){
    //this.props.fetchProjects();
  }

  contentPage(){

    return (
      <div style={{height:"100%",backgroundColor:"white"}}>
        <br/>

        <div onClick={()=>{this.props.goToInventoryManagement()
            }}>
            <CardButton
              title="Inventario"
              />
            </div>
        <div style={{height:"10px"}} ></div>

        <div onClick={()=>{this.props.goToInventoryManagement()
            }}>
            <CardButton
              title="Combustible"
              />
            </div>
        <div style={{height:"10px"}} ></div>

      </div>
    );
  }

  render() {


    const { isFetching } = this.props.appState;

    return (
      <AppPage  title={["GESTION DE ", <strong>Recursos</strong>]}>

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div> :

             this.contentPage()

          }

      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState
  };
}

export default  connect(mapStateToProps, { fetchProjects, goToInventoryManagement , goToProjects , setProjectPhase,
   goToRiskManagement, goToInventoryManagement
 })(ProjectManagement);
