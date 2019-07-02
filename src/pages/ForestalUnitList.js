import React, { Component } from 'react';
//sources
import checkList from "../img/checkList.png";
import tree from "../img/tree.png";
import chart from "../img/chart.png";
import plant from "../img/plant.png";
import yellowArrow from "../img/yellowArrow.png";
import "../css/accordion.css";
import { workingRowStyles , offlineStyles ,modalStyles, blankModal } from "../jsStyles/Styles";


//Onsen Ui
import {  List , ListItem, Col, Row, Card, ListHeader, BottomToolbar, Button, Checkbox } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

//container
import AppPage from '../containers/AppPage';


//flux
import { goToInventoryForm,
   setForestalUnit,
   goToProcessForm,
   goToCompensationForm,
   removeFromBatchData,
   createForestUnitPhase2,
   getForestalUnits } from '../flux/actions';

import { connect } from 'react-redux';



const styles =
 {
   ...workingRowStyles,
   ...offlineStyles,
   ...modalStyles,
   ...blankModal
 }

class ForestalUnitList extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.state = { offLineData: []  };
  }

  componentDidMount(){

    let internetConnection = true;

    if(window.cordova)
    {
      console.log("Me encuentro en el app");
      console.log(window.navigator.connection.type);
    }
    else{
      internetConnection = window.navigator.onLine;
    }


    switch(this.props.appState.currentPhase)
    {
      case 1:

        break;
      case 2:

        if(internetConnection)
        {
          console.log("Hay internet");

          let filteredData = [];

          if(this.props.appState.batchData)
          {
            filteredData = this.props.appState.batchData.filter(data => data.metaDesc == "ProccessFormBatchData" );
          }

          console.log(filteredData);

          this.setState({offLineData:filteredData},()=>{
              console.log(this.state);
          })

        }

        break;
      case 3:

        break;
      default:
          break;
    }

  }

  renderHeader(){
    return(
      <ListHeader style={{fontSize: 15, padding:"0px"}} className="testClass">
        <Row>
          <Col width="50%" style={{
            backgroundColor: "rgba(99, 177, 48, 0.88)",
            textAlign: "center",
            color: "white",
            fontWeight: "bold"}}>
            {/*<Card style={styles.CardHeaders}>*/}
              <span>Individuo Forestal</span>
            {/*</Card>*/}
          </Col>
          <Col width="50%" style={{
            backgroundColor: "rgb(97, 175, 46)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            color: "white",
            fontWeight: "bold"}}>
            {/*<Card style={styles.CardHeaders}>*/}
              <span>Estado</span>
            {/*</Card>*/}
          </Col>
        </Row>
      </ListHeader>
    );
  }

  contentPage(currentPhase,forestalUnits){
    return(
    <div>
      <div style={styles.formContainer}>
        <div className="login-form" >

          <div className="group" style={styles.searchInputContainer}>
            <input className="input fontAwesome" placeholder="Buscar" type="text"   style={{fontFamily:'Arial', marginTop:"8px", width:"80%"}} />
            <div style={styles.searchButton} onClick={()=>{
                console.log(currentPhase);
                this.props.setForestalUnit(null);
                switch(currentPhase)
                {
                  case 1:
                    this.props.goToInventoryForm();
                    break;
                  case 2:
                    this.props.goToProcessForm();
                    break;
                  case 3:
                    this.props.goToCompensationForm();
                    break;
                  default:
                      break;
                }

              }}>
              <span className="fas fa-plus fontAwesome" ></span>
            </div>
          </div>

        </div>
      </div>


        { forestalUnits.length > 0  ?

          <List
            renderHeader={this.renderHeader}>

           {forestalUnits.map((unit, i) => {

              return (
              <div>
                <ListItem tappable onClick={()=>{
                    this.props.setForestalUnit(unit);
                    switch(currentPhase)
                    {
                      case 1:
                        this.props.goToInventoryForm();
                        break;
                      case 2:
                        this.props.goToProcessForm();
                        break;
                      case 3:
                        this.props.goToCompensationForm();
                        break;
                      default:
                          break;
                    }

                  }}>
                  <div className="center" style={styles.mainListItem}>
                    <span style={styles.counter}>{i+1}</span>
                    <span style={styles.projectName}>{unit.code}</span>
                    <div>
                      <span style={styles.projectInfo}>{unit.state}</span>
                      <br/>
                      <span style={styles.projectInfo}>{unit.created_at}</span>
                    </div>
                    <div style={styles.buttonContainer}>
                      <div style={styles.ProjectButton}>
                        <i className="fas fa-arrow-right fontAwesome"></i>
                      </div>
                    </div>
                  </div>
                </ListItem>
                <div style={{
                    height: "10px",
                    backgroundColor: "#e6e7e8",
                }}>
                </div>
              </div>
            );
          })}

          </List>:<NotFound/>

        }
      </div>
    );
  }

  render() {

    styles.modalStyles.title = {
      ...styles.modalStyles.title,
      color:"black",
      fontWeight:"bold",
      textAlign:"center"
    }


      const {  isFetching ,currentPhase , forestalUnits } = this.props.appState

    return (
      <AppPage  title={["Unidad funcional ", <strong>{this.props.appState.currentFunctionalUnit.code}</strong>]} backButton={true} >

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div> :

             this.contentPage(currentPhase,forestalUnits)

          }

          {
            this.state.offLineData.length > 0 ?
            <BottomToolbar modifier="material">
              <div style={styles.offLineLabel} onClick={()=>{
                document.getElementById("offLineModal").style.display = "block";
              }} >
                <span>Sincronizar datos offline <br/> a esta unidad funcional </span>
                <i style={ { marginLeft: "5%" } } class="fas fa-wifi"></i>
              </div>
             </BottomToolbar>: null
           }


           <Modal title="Registros disponibles" ModalId="offLineModal"  ModalStyles={{...styles.modalStyles,
             ...styles.modalOverride
           }}>

              { this.state.offLineData.map((data, i) => {
                return(
                   <Row style={ styles.modalColumn }>
                      <Col width="50%" style={{textAlign:"center"}} >
                        {data.code}
                      </Col>
                      <Col width="50%" style={{textAlign:"center"}}>
                        <Checkbox
                          onChange={event => {

                            //console.log(data);

                            let formatedArray = this.state.offLineData;

                            if(event.target.checked)
                            {
                              formatedArray[i].markToExport = true;
                              this.setState({offLineData:formatedArray},()=>{
                                console.log(this.state);
                              });

                            }else{
                              formatedArray[i].markToExport = false;
                              this.setState({offLineData:formatedArray},()=>{
                                console.log(this.state);
                              });

                            }
                        }}
                        ></Checkbox>
                      </Col>
                   </Row>
                  );
                }) }


               <Button style={{width:"100%",marginTop:"20px",textAlign:"center"}}

                  onClick={()=>{

                    let indexes = [];

                    this.state.offLineData.forEach( data => {

                      if(data.markToExport)
                      {
                        data.functional_unit_id = this.props.appState.currentFunctionalUnit.id;
                        console.log(data);
                        this.props.createForestUnitPhase2(data);
                        this.props.removeFromBatchData(data);
                        indexes.push(this.state.offLineData.indexOf(data));
                      }

                    });

                    let formatedArray = this.state.offLineData;

                    indexes.forEach( index => {
                      if(this.state.offLineData.length > 1)
                      {
                        formatedArray.splice(index,1);
                      }
                      else{
                        formatedArray = [];
                      }
                      this.setState({offLineData:formatedArray});
                      this.props.getForestalUnits(this.props.appState.currentFunctionalUnit.id);
                    });

                  }}

                >Sincronizar</Button>

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

export default  connect(mapStateToProps, { goToInventoryForm,
   setForestalUnit,
   goToProcessForm,
   goToCompensationForm,
   removeFromBatchData,
   createForestUnitPhase2,
   getForestalUnits
 })(ForestalUnitList);
