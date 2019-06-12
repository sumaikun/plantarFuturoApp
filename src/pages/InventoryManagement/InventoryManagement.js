import React, { Component } from 'react';
//sources
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";


//Onsen Ui
import {  Col, Row, Card, Button, List, ListItem} from 'react-onsenui';
import Ons from 'onsenui';
//import Ons from 'onsenui';

//Libraries

//components
import ListAccordion from "../../components/ListAccordion";
import CardOptionButton from "../../components/CardOptionButton";

//container
import AppPage from '../../containers/AppPage';

//flux
import { goToMachineryForm } from '../../flux/actions';
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

class InventoryManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode:false,
      idToModify:null,
      functionalList:{

      }
    }

    this.collapseOptions = this.collapseOptions.bind(this);

  }

  collapseOptions(newRegisterFunction){

    console.log(newRegisterFunction);


    return(

        <Row>
          <Col width="6%">
          </Col>
          <Col width="47%">
            <div onClick={()=>{ newRegisterFunction ? newRegisterFunction() : false }}>

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
            <div style={styles.centerAll} onClick={()=>{
            }}>

            <CardOptionButton accordionIconsStyles={styles.accordionIcons}
              iconStyles={{fontSize:"10px", color:"white"}}
              iconReference="fas fa-eye fontAwesome"
              textStyles={{fontSize:"11px", marginLeft:"8px", marginRight:"5px"}}
              imgStyles={{height:"5vmin", marginTop:"3.5px"}}
              image={yellowArrow}
              title="Inventario actual"
              />

            </div>

          </Col>
      </Row>

    )
  }


  componenDidMount(){

  }






  render() {

    return (
      <AppPage  title={[<strong>{"Gestión de Inventarios"}</strong>]} backButton={true} backButtonCallBack={()=>{  }}>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={1} projectName={"Maquinaría"} projectInfo={""} >
                      {
                        this.collapseOptions(()=>{
                          this.props.goToMachineryForm();
                        })
                      }
                  </ListAccordion>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={2} projectName={"Equipo"} projectInfo={""} >
                      { this.collapseOptions() }
                    </ListAccordion>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={3}  projectName={["Herramienta",<span>{"   "}</span>]} projectInfo={""} >
                    { this.collapseOptions() }
                  </ListAccordion>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <ListAccordion counter={4} projectName={"Vehículo"} projectInfo={""} >
                    { this.collapseOptions() }
                  </ListAccordion>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} onClick={()=>{  }} >
                  <ListAccordion counter={6} projectName={"Tecnología"} projectInfo={""} >
                    { this.collapseOptions() }
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

export default  connect(mapStateToProps,{ goToMachineryForm })(InventoryManagement);
