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
import ListAccordion from "../../components/ListAccordion";
import CardOptionButton from "../../components/CardOptionButton";
import NotFound from "../../components/NotFound";

//container
import AppPage from '../../containers/AppPage';

//flux
import { goToHillsideCollapse, goToRainFall, goToRiverCollapse, goToTunnelDeformation, goToRiskIndicator, goToHillsideMovement } from '../../flux/actions';
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

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={1} projectName={"Deformación de tunel"} projectInfo={""} >
                    <Row>
                      <Col width="6%">
                      </Col>
                      <Col width="47%">
                        <div onClick={()=>{ this.props.goToTunnelDeformation() }}>

                        <CardOptionButton
                          className="modal-btn"
                          accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"8px", color:"white"}}
                          iconReference="fas fa-plus fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3px"}}
                          image={yellowArrow}
                          title="Nuevo registro"
                          />

                        </div>
                      </Col>
                      <Col width="47%">
                        <div style={styles.centerAll}>

                        <CardOptionButton accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"10px", color:"white"}}
                          iconReference="fas fa-eye fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3.5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>

                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">
                      </Col>
                    </Row>
                  </ListAccordion>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={2} projectName={"Desplazamiento de ladera"} projectInfo={""} >
                    <Row>
                      <Col width="6%">
                      </Col>
                      <Col width="47%">
                        <div onClick={()=>{this.props.goToHillsideMovement()}}>
                        <CardOptionButton
                          className="modal-btn"
                          accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"8px", color:"white"}}
                          iconReference="fas fa-plus fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3px"}}
                          image={yellowArrow}
                          title="Nuevo registro"
                          />
                        </div>
                      </Col>
                      <Col width="47%">
                        <div style={styles.centerAll}>

                        <CardOptionButton accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"10px", color:"white"}}
                          iconReference="fas fa-eye fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3.5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">
                      </Col>
                    </Row>
                  </ListAccordion>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={3}  projectName={["Precipitación",<span>{"   "}</span>]} projectInfo={""} >
                    <Row>
                      <Col width="6%">
                      </Col>
                      <Col width="47%">
                        <div onClick={()=>{this.props.goToRainFall()}}>

                        <CardOptionButton
                          className="modal-btn"
                          accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"8px", color:"white"}}
                          iconReference="fas fa-plus fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3px"}}
                          image={yellowArrow}
                          title="Nuevo registro"
                          />

                        </div>
                      </Col>
                      <Col width="47%">
                        <div style={styles.centerAll}>

                        <CardOptionButton accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"10px", color:"white"}}
                          iconReference="fas fa-eye fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3.5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">
                      </Col>
                    </Row>
                  </ListAccordion>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={4} projectName={"Recorrido de ladera"} projectInfo={""} >
                    <Row>
                      <Col width="6%">
                      </Col>
                      <Col width="47%">
                        <div onClick={()=>{this.props.goToHillsideCollapse()}}>

                        <CardOptionButton
                          className="modal-btn"
                          accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"8px", color:"white"}}
                          iconReference="fas fa-plus fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3px"}}
                          image={yellowArrow}
                          title="Nuevo registro"
                          />

                        </div>
                      </Col>
                      <Col width="47%">
                        <div style={styles.centerAll}>

                        <CardOptionButton accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"10px", color:"white"}}
                          iconReference="fas fa-eye fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3.5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">
                      </Col>
                    </Row>
                  </ListAccordion>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={5} projectName={"Inspección de quebrada"} projectInfo={""} >
                    <Row>
                      <Col width="6%">
                      </Col>
                      <Col width="47%">
                        <div onClick={()=>{ this.props.goToRiverCollapse() }}>

                        <CardOptionButton
                          className="modal-btn"
                          accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"8px", color:"white"}}
                          iconReference="fas fa-plus fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3px"}}
                          image={yellowArrow}
                          title="Nuevo registro"
                          />

                        </div>
                      </Col>
                      <Col width="47%">
                        <div style={styles.centerAll}>

                        <CardOptionButton accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"10px", color:"white"}}
                          iconReference="fas fa-eye fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
                          imgStyles={{height:"5vmin", marginTop:"3.5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">
                      </Col>
                    </Row>
                  </ListAccordion>
                </div>
              </div>

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

export default  connect(mapStateToProps,{goToHillsideCollapse, goToRainFall, goToRiverCollapse, goToTunnelDeformation, goToRiskIndicator, goToHillsideMovement})(RiskManagement);
