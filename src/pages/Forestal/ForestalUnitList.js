import React, { Component } from 'react';
//sources
import checkList from "../../img/checkList.png";
import tree from "../../img/tree.png";
import chart from "../../img/chart.png";
import plant from "../../img/plant.png";
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import { workingRowStyles } from "../../jsStyles/Styles";



//Onsen Ui
import {  List , ListItem, Col, Row, Card, ListHeader } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";
//container
import AppPage from '../../containers/AppPage';

//flux
import { goToInventoryForm,
   setForestalUnit,
  goToProcessForm,
  goToCompensationForm,
  removeFromForestUnitP1ServerUpdate,
  removeFromOfflineForestUnitP1,
  removeFromForestUnitP2ServerUpdate,
  removeFromOfflineForestUnitP2,
  removeFromForestUnitP3ServerUpdate,
  removeFromOfflineForestUnitP3
} from '../../flux/actions';

import { connect } from 'react-redux';

const styles = workingRowStyles;

class ForestalUnitList extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.contentPage = this.contentPage.bind(this);
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

    //console.log("Unidades forestales");
    //console.log(forestalUnits);
    let foundIndex;

    return(
    <div>
      <div style={styles.formContainer}>
        <div className="login-form" >

          <div className="group" style={styles.searchInputContainer}>
            <input className="input fontAwesome" placeholder="Buscar" type="text"
               style={{fontFamily:'Arial', marginTop:"8px", width:"80%"}} />
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

             switch(currentPhase)
             {
               case 1:

                 foundIndex = this.props.memory.serverForestUnitsPhase1.findIndex( memory =>   memory.id == unit.id  );
                 //console.log("foundIndex"+foundIndex);
                 unit = foundIndex != -1 ? this.props.memory.serverForestUnitsPhase1[foundIndex] : unit ;

                 break;
               case 2:

                 foundIndex = this.props.memory.serverForestUnitsPhase2.findIndex( memory =>   memory.id == unit.id  );
                 //console.log("foundIndex"+foundIndex);
                 unit = foundIndex != -1 ? this.props.memory.serverForestUnitsPhase2[foundIndex] : unit ;

                 break;
               case 3:

                foundIndex = this.props.memory.serverForestUnitsPhase3.findIndex( memory =>   memory.id == unit.id  );
                //console.log("foundIndex"+foundIndex);
                unit = foundIndex != -1 ? this.props.memory.serverForestUnitsPhase3[foundIndex] : unit ;

                 break;
               default:
                   break;
             }


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
                    <div onClick={(e)=>{

                      e.stopPropagation();

                      console.log(unit);

                      let self = this;

                      if(unit.ToSynchro || unit.ToSynchroEdit)
                      {
                        Ons
                        .notification.confirm({ title:'',message: '¿Deseas eliminar los datos de memoría?' })
                        .then(function(res) {
                          if(res){
                            console.log("cancelar sincronización");
                            if(unit.ToSynchro)
                            {
                              if(currentPhase === 1)
                              {
                                self.props.removeFromOfflineForestUnitP1(unit);
                              }
                              if(currentPhase === 2)
                              {
                                self.props.removeFromOfflineForestUnitP2(unit);
                              }
                              if(currentPhase === 3)
                              {
                                self.props.removeFromOfflineForestUnitP3(unit);
                              }

                              Ons.notification.alert({ title:'',message: 'Datos eliminados de memoria' })
                            }
                            if(unit.ToSynchroEdit)
                            {
                              if(currentPhase === 1)
                              {
                                self.props.removeFromForestUnitP1ServerUpdate(unit);
                              }
                              if(currentPhase === 2)
                              {
                                self.props.removeFromForestUnitP2ServerUpdate(unit);
                              }
                              if(currentPhase === 3)
                              {
                                self.props.removeFromForestUnitP3ServerUpdate(unit);
                              }

                              Ons.notification.alert({ title:'',message: 'Datos eliminados de memoria' });
                            }
                          }
                        })
                      }
                    }}>
                      <span style={styles.counter}>{i+1}</span>
                      { unit.ToSynchro || unit.ToSynchroEdit ?  <i class="fas fa-wifi" style={{marginLeft:"5px"}} ></i> : null }
                    </div>
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


      let {  isFetching ,currentPhase , forestalUnits } = this.props.appState;


      if(this.props.appState.currentFunctionalUnit.ToSynchro){
        forestalUnits = [];
      }

      switch(currentPhase)
      {
        case 1:
            forestalUnits = forestalUnits.concat(this.props.memory.offLineForestUnitsPhase1.filter(
              memory => memory.functional_unit_id === this.props.appState.currentFunctionalUnit.id
            ));
          break;
        case 2:
            forestalUnits = forestalUnits.concat(this.props.memory.offLineForestUnitsPhase2);
          break;
        case 3:
            forestalUnits = forestalUnits.concat(this.props.memory.offLineForestUnitsPhase3);
          break;
        default:
            break;
      }

      forestalUnits = forestalUnits.reverse();

    return (
      <AppPage  title={["Unidad funcional ", <strong>{this.props.appState.currentFunctionalUnit.code}</strong>]}
       backButton={true} >

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div> :

             this.contentPage(currentPhase,forestalUnits)

          }

      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState,
    memory: state.memory
  };
}

export default  connect(mapStateToProps, { goToInventoryForm,
   setForestalUnit,
   goToProcessForm,
   goToCompensationForm,
   removeFromOfflineForestUnitP1,
   removeFromForestUnitP1ServerUpdate,
   removeFromForestUnitP2ServerUpdate,
   removeFromOfflineForestUnitP2,
   removeFromForestUnitP3ServerUpdate,
   removeFromOfflineForestUnitP3
})(ForestalUnitList);
