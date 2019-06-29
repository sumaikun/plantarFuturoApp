import React, { Component } from 'react';
//sources
import yellowArrow from "../img/yellowArrow.png";
import "../css/accordion.css";
import "../css/Modal.css";

//Onsen Ui
import {  Col, Row, Card, Button, List, ListItem} from 'react-onsenui';
import Ons from 'onsenui';
//import Ons from 'onsenui';

//Libraries

//components
import ListAccordion from "../components/ListAccordion";
import CardOptionButton from "../components/CardOptionButton";
import Modal from "../components/Modal";
import NotFound from "../components/NotFound";

//container
import AppPage from '../containers/AppPage';

//flux
import { goToForestalUnits , createFunctionalUnit , getFunctionalUnits, updateFunctionalUnit, getForestalUnits, setFunctionalUnit, fetchProjects,
resetFunctionalUnits, selectProject , goToRiskManagement } from '../flux/actions';
import { connect } from 'react-redux';

//helpers
import { formValidation } from '../helpers/formValidation';


const styles = {
  accordionIcons:{
    "background-color": "#006828",
    "width": "25px",
    "height": "15px",
    "border-radius": "50%",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  },
  modalStyles:
  {
    view:{display:"none"},
    content:{width:"80%"},
    header:{backgroundColor:"#006828"},
    closeButton:{marginLeft:"15px",fontSize:"10px"},
    title:{fontSize:"18px"},
    body:{backgroundColor:"#008931"},
    footer:{fontSize:"8px",display:"none"}
  }
}

class ProjectList extends Component {

  constructor(props) {
    super(props);
    this.registerUnit = this.registerUnit.bind(this);
    this.editFunctionalUnit = this.editFunctionalUnit.bind(this);
    this.renderFunctionalList = this.renderFunctionalList.bind(this);
    this.state = {
      editMode:false,
      idToModify:null,
      functionalList:{

      }
    }
    this.props.resetFunctionalUnits();
  }

  componenDidMount(){

  }

  registerUnit(e){

    e.preventDefault();

    if(!this.props.appState.isFetching)
    {
        let validation = formValidation([
          {
            ref:this.Code,
            name:"codigo"
          }
        ]);

        let componentSuccess = (reloadProjectId) => {
          this.Code.value = "";
          let modal = document.querySelector('#my-modal');
          modal.style.display = 'none';
          this.props.getFunctionalUnits(reloadProjectId);
        }

        if(this.state.editMode)
        {
          validation ?  this.props.updateFunctionalUnit(this.state.idToModify,{
            code: this.Code.value,
            type: 1,
            project_id: this.state.projectIdToModify
          },componentSuccess) : false;

          this.Code.value = "";
          this.setState({
            editMode:false
          });

          return;
        }

        validation ?  this.props.createFunctionalUnit({
          code: this.Code.value,
          type: 1,
          project_id: this.project_id
        },componentSuccess) : false;
    }else{
      Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
    }

  }

  editFunctionalUnit(unit){

    let self = this;

    Ons
    .notification.confirm({ title:'',message: '¿Estas seguro de editar?' })
    .then(function(res) {
        if(res){

          self.Code.value = unit.code;

          let modal = document.querySelector('#my-modal');
          modal.style.display = 'block';
          let button = document.querySelector("#functionalSubmitButton");
          button.textContent = "Editar";

          self.setState({
            editMode:true,
            idToModify: unit.id,
            projectIdToModify: unit.project_id
          });

        }

    });

  }

  renderFunctionalList(functionalUnits,project){
    return(
      functionalUnits.filter(unit => {
            return unit.project_id === project.id
          }).map((funit, i) => {
          return(
            <List>
              <ListItem  tappable style={{
                color: "rgb(53, 40, 101)",
                fontSize: "12px",
                fontWeight: "bold"}}
              >
                <div className="center" style={{display: "flex",
                  justifyContent: "space-around"
                }}>

                  <span style={{color:"gray"}} >{i+1}</span>

                  <span onClick={()=>{
                    console.log("nav");
                    //this.props.goToForestalUnits();
                    this.props.getForestalUnits(funit.id);
                    this.props.setFunctionalUnit(funit);
                    this.props.goToForestalUnits();
                  }} >{funit.code}</span>

                  <div>
                    <button onClick={()=>{this.editFunctionalUnit(funit)}} style={{backgroundColor:"green",width:"20px",height:"20px",borderRadius:"50%",color:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <i className="fas fa-edit fontAwesome"></i>
                    </button>
                  </div>

                </div>

              </ListItem>
            </List>
        );
      })
    );
  }

  render() {

    //console.log(this.props.appState);

    const { projects , currentPhase, functionalUnits  } = this.props.appState

    const currentPhaseProjects = projects.filter( project => {
      return parseInt(project.phase) === currentPhase
    });

    let titlePage = null;

    switch(currentPhase)
    {
      case 1:
        titlePage = "INVENTARIOS"
        break;
      case 2:
        titlePage = "APROVECHAMIENTO"
        break;
      case 3:
        titlePage = "GEOREFERENCIACIÓN"
        break;
      case 4:
        titlePage = "RIESGO"
        break;
    }
    return (
      <AppPage  title={[<strong>{titlePage}</strong>]} backButton={true} backButtonCallBack={()=>{ this.props.fetchProjects(/*this.props.appState.user.id*/) }}>
        { currentPhaseProjects.length > 0  ?
          currentPhaseProjects.map((project, i) => {
              return(
              <div onClick={()=>{ this.props.appState.currentPhase == "4" ? (()=>{
                    console.log("fase de riesgos");
                    console.log(project); this.props.selectProject(project);
                    this.props.goToRiskManagement();
                  })(): (()=>{
                      console.log(project); this.props.selectProject(project)
                    })()
                  }}>
                <ListAccordion counter={i+1} projectName={project.name}  phase={this.props.appState.currentPhase}  projectInfo={project.customer.name} >
                  <Row>
                    <Col width="6%">
                    </Col>
                    <Col width="47%">
                      <div onClick={ ()=>{
                        this.props.getFunctionalUnits(project.id);
                        this.setState({
                          functionalList:{
                            ...this.state.functionalList,
                            [project.id] : this.state.functionalList[project.id] ? !this.state.functionalList[project.id] : true
                          }
                        },()=>{
                          console.log(this.state);
                        });
                      }}>
                        <CardOptionButton accordionIconsStyles={styles.accordionIcons}
                          iconStyles={{fontSize:"10px", color:"white"}}
                          iconReference="fas fa-eye fontAwesome"
                          textStyles={{fontSize:"11px", marginLeft:"10px"}}
                          imgStyles={{height:"5vmin"}}
                          image={yellowArrow}
                          title="Ver unidades funcionales"
                          />
                        </div>
                    </Col>
                    <Col width="47%">
                      <div onClick={()=>{ let button = document.querySelector("#functionalSubmitButton");
                          button.textContent = "Registrar";
                          this.project_id = project.id; }}>
                      <CardOptionButton
                        className="modal-btn"
                        accordionIconsStyles={styles.accordionIcons}
                        iconStyles={{fontSize:"10px", color:"white"}}
                        iconReference="fas fa-plus fontAwesome"
                        textStyles={{fontSize:"11px", marginLeft:"10px"}}
                        imgStyles={{height:"5vmin"}}
                        image={yellowArrow}
                        title="Nueva unidad funcional"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col width="20%"></Col>
                    <Col width="80%">
                      { this.state.functionalList[project.id] ? this.renderFunctionalList(functionalUnits , project) : null }
                    </Col>
                  </Row>
                </ListAccordion>
              </div>
              );
            })
          :<NotFound/>
        }
        <Modal title="Registro de información" ModalStyles={styles.modalStyles}>
          <form onSubmit={this.registerUnit}>
            <div className="input-icon-wrap">
              <span className="input-icon"><span className="fa fa-user fontAwesome"></span></span>
              <input type="text" ref={(input) => this.Code = input} style={{width:"50%"}} className="input-with-icon" placeholder="Codigo" id="form-name"   maxLength="10"  required/>
            </div>
            <br/>
            <button  type="submit" id="functionalSubmitButton"   modifier="large"
              style={{fontSize:"18px",padding:'5px',backgroundColor:"#61af2e",boxShadow:" 10px 10px 5px -2px rgba(0,0,0,0.75)",width:"100%"}}
              ><b>Registrar</b></button>
          </form>
        </Modal>
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

export default  connect(mapStateToProps, { goToForestalUnits , createFunctionalUnit, getFunctionalUnits, updateFunctionalUnit, getForestalUnits, setFunctionalUnit, fetchProjects, resetFunctionalUnits, selectProject , goToRiskManagement })(ProjectList);
