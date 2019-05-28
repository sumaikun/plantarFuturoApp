import React, { Component } from 'react';
//sources
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import "../../css/Modal.css";


//Onsen Ui
import {  Col, Row, Card, Button, List, ListItem} from 'react-onsenui';
import Ons from 'onsenui';
//import Ons from 'onsenui';

//Libraries

//components
import SemaphoreList from "../../components/SemaphoreList";
import CardOptionButton from "../../components/CardOptionButton";
import NotFound from "../../components/NotFound";

//container
import AppPage from '../../containers/AppPage';

//flux
import { goToForestalUnits , createFunctionalUnit , getFunctionalUnits, updateFunctionalUnit, getForestalUnits, setFunctionalUnit, fetchProjects,
resetFunctionalUnits, selectProject } from '../../flux/actions';
import { connect } from 'react-redux';

//helpers
import { formValidation } from '../../helpers/formValidation';


const styles = {
  accordionIcons:{
    "background-color": "#006828",
    "width": "25px",
    "height": "25px",
    "border-radius": "50%",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  },
  centerAll:{
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  circleDiv:{
    "background-color": "#009642",
    width: "20px",
    height: "20px",
    "border-radius": "50%",
  }

}

class RiskManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode:false,
      idToModify:null,
      functionalList:{

      }
    }

  }

  componenDidMount(){

  }






  render() {

    return (
      <AppPage  title={[<strong>{"Gestión de riesgos"}</strong>]} backButton={true} backButtonCallBack={()=>{  }}>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div onClick={()=>{  }} style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <SemaphoreList counter={1} RiskName={"Deformación de tunel"}  >
                  </SemaphoreList>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div onClick={()=>{  }} style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <SemaphoreList counter={2} RiskName={"Desplazamiento de ladera"} >
                  </SemaphoreList>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div onClick={()=>{  }} style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <SemaphoreList counter={3}  RiskName={["Precipitación",<span>{"   "}</span>]}  >
                  </SemaphoreList>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div onClick={()=>{  }} style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <SemaphoreList counter={4} RiskName={"Recorrido de ladera"}>
                  </SemaphoreList>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div onClick={()=>{  }} style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <SemaphoreList counter={5} RiskName={"Inspección de quebrada"}>
                  </SemaphoreList>
                </div>
              </div>


              <Card>

                <Row >
                  <Col width="40%"></Col>
                  <Col>
                    <div style={{...styles.circleDiv}}></div>
                  </Col>
                  <Col>
                    <span style={{fontSize:"10px"}}>Menor Riesgo</span>
                  </Col>
                </Row>

                <div style={{height:"10px"}}></div>

                <Row>
                  <Col width="40%"></Col>
                  <Col>
                    <div style={{...styles.circleDiv, backgroundColor:"#f4db0a"}}></div>
                  </Col>
                  <Col>
                    <span></span>
                  </Col>
                </Row>

                <div style={{height:"10px"}}></div>

                <Row>
                  <Col width="40%"></Col>
                  <Col>
                    <div style={{...styles.circleDiv, backgroundColor:"#f4af0a" }}></div>
                  </Col>
                  <Col>
                    <span></span>
                  </Col>
                </Row>

                <div style={{height:"10px"}}></div>

                <Row>
                  <Col width="40%"></Col>
                  <Col>
                    <div style={{...styles.circleDiv, backgroundColor:"#e74404" }}></div>
                  </Col>
                  <Col>
                    <span></span>
                  </Col>
                </Row>

                <div style={{height:"10px"}}></div>

                <Row>
                  <Col width="40%"></Col>
                  <Col>
                    <div style={{...styles.circleDiv, backgroundColor:"#b20811"}}></div>
                  </Col>
                  <Col>
                    <span style={{fontSize:"10px"}}>Mayor Riesgo</span>
                  </Col>
                </Row>

              </Card>

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

export default  connect(mapStateToProps,{})(RiskManagement);
