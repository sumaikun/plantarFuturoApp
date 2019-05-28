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
import { goToHillsideCollapse, goToRainFall, goToRiverCollapse, goToTunnelDeformation, goToRiskIndicator, goToHillsideMovement , getTunnelsDeformation
, getHillsidesMovement, getRainfalls, getHillsidesCollapse, getRiversCollapse , setTunnelDeformation, setHillsideMovement, setRainfall,
setHillSideCollapse,  setRiverCollapse } from '../../flux/actions';
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

    this.renderRisk = this.renderRisk.bind(this);

  }

  componenDidMount(){

  }

  renderRisk(data,callback){
    console.log("en función");
    return(

    data.map((el, i) => {
      console.log(el);
      return(
            <List>
                    <ListItem  onClick={()=>{ callback(el); }}  tappable style={{
                      color: "rgb(53, 40, 101)",
                      fontSize: "12px",
                      fontWeight: "bold"}}
                    >
                      <div className="center" style={{display: "flex",  justifyContent: "space-around"   }}>

                        <span style={{color:"gray"}} >{i+1}</span>

                      </div>
                      <div>
                        {el.code}

                      </div>
                    </ListItem>
              </List>
          );
      })
   )
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
                          textStyles={{fontSize:"11px", marginLeft:"8px"}}
                          imgStyles={{height:"5vmin"}}
                          image={yellowArrow}
                          title="Nuevo registro"
                          />

                        </div>
                      </Col>
                      <Col width="47%">
                        <div style={styles.centerAll} onClick={()=>{  this.props.getTunnelsDeformation(this.props.appState.selectedProject.id)  }}>

                        <CardOptionButton accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"10px", color:"white"}}
                          iconReference="fas fa-eye fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"8px"}}
                          imgStyles={{height:"5vmin", marginLeft:"5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>

                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">

                        { this.props.appState.TunnelDeformationList  ?  this.renderRisk(this.props.appState.TunnelDeformationList,(el) => {
                          this.props.setTunnelDeformation(el);
                          this.props.goToTunnelDeformation();
                        }) : null  }

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
                          textStyles={{fontSize:"11px", marginLeft:"10px"}}
                          imgStyles={{height:"5vmin"}}
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
                          textStyles={{fontSize:"11px", marginLeft:"8px"}}
                          imgStyles={{height:"5vmin", marginLeft:"5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">

                      { this.props.appState.HillsideMovementList  ?  this.renderRisk(this.props.appState.HillsideMovementList,(el) => {
                        this.props.setHillsideMovement(el);
                        this.props.goToHillsideMovement();
                      }) : null  }

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
                          textStyles={{fontSize:"11px", marginLeft:"10px"}}
                          imgStyles={{height:"5vmin"}}
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
                          textStyles={{fontSize:"11px", marginLeft:"8px"}}
                          imgStyles={{height:"5vmin", marginLeft:"5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">

                      { this.props.appState.RainfallList  ?  this.renderRisk(this.props.appState.RainfallList,(el) => {
                        this.props.setRainfall(el);
                        this.props.goToRainFall();
                      }) : null  }

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
                          textStyles={{fontSize:"11px", marginLeft:"10px"}}
                          imgStyles={{height:"5vmin"}}
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
                          textStyles={{fontSize:"11px", marginLeft:"8px"}}
                          imgStyles={{height:"5vmin", marginLeft:"5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">

                      { this.props.appState.HallsideCollapseList  ?  this.renderRisk(this.props.appState.HallsideCollapseList,(el) => {
                        this.props.setHillSideCollapse(el);
                        this.props.goToHillsideCollapse();
                      }) : null  }

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
                          textStyles={{fontSize:"11px", marginLeft:"10px"}}
                          imgStyles={{height:"5vmin"}}
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
                          textStyles={{fontSize:"11px", marginLeft:"8px"}}
                          imgStyles={{height:"5vmin", marginLeft:"5px"}}
                          image={yellowArrow}
                          title="Reporte"
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col width="20%"></Col>
                      <Col width="80%">

                      { this.props.appState.RiverCollapseList  ?  this.renderRisk(this.props.appState.RiverCollapseList,(el) => {
                        this.props.setRiverCollapse(el);
                        this.props.goToRiverCollapse();
                      }) : null  }

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

export default  connect(mapStateToProps,{goToHillsideCollapse, goToRainFall, goToRiverCollapse, goToTunnelDeformation, goToRiskIndicator, goToHillsideMovement, getTunnelsDeformation, setHillsideMovement, setRainfall,
setHillSideCollapse,  setRiverCollapse, setTunnelDeformation})(RiskManagement);
