import React, { Component } from 'react';
//sources
import checkList from "../../img/checkList.png";
import tree from "../../img/tree.png";
import chart from "../../img/chart.png";
import plant from "../../img/plant.png";
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import { workingRowStyles } from "../../jsStyles/Styles";

import "./data";

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
  removeFromOfflineForestUnitP3,
  goToPlantationReport,
  setPlantationReport,
} from '../../flux/actions';

import { connect } from 'react-redux';
import {exampleActivities} from "./data";

const styles = workingRowStyles;

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.state = {
      searchName: '',
      searchDate: ''
    }
  }

  renderHeader(){
    return(
      <ListHeader style={{position: "fixed", zIndex:1,width:"95%", fontSize: 15, padding:"0px",marginTop:"-40px"}} className="testClass">
        <Row>
          <Col width="100%" style={{
            backgroundColor: "rgba(0, 104, 40, 0.8)",
            textAlign: "center",
            color: "white",
            fontWeight: "300",
            display: "fixed",
            whiteSpace: 'normal',
            fontFamily: 'Raleway',
          }}>
            {/*<Card style={styles.CardHeaders}>*/}
            <span># DE REPORTES</span>
            {/*</Card>*/}
          </Col>
        </Row>
      </ListHeader>
    );
  }

  contentPage(plantationReports){

    plantationReports.sort((a,b) => {
      if (a.date > b.date) return -1
      if (a.date < b.date) return 1
      return 0
    });

    const { searchName, searchDate } = this.state;

    return(
      <div>
        <div style={{backgroundColor:"orange", position:"fixed", width:"100%", zIndex:"1"}}>
          <div className="login-form" >

            <div className="group" style={styles.searchInputContainer}>
              <div>
                <input id="search" value={searchName} name="buscador" onChange={e => this.setState({ searchName: e.target.value })} className="input fontAwesome" placeholder="Buscar" type="text" style={{fontFamily:'Arial', marginTop:"8px", width:"90%", height:"10px"}} />
                <input type="date" value={searchDate} onChange={e => this.setState({ searchDate: e.target.value })} className="input fontAwesome" style={{fontFamily:'Arial', marginTop:"8px", width:"90%", height:"2px"}} />
              </div>
              <div className={'plus-icon-container'} style={styles.searchButton} onClick={ ( ) => {
                this.props.setPlantationReport(null);
                this.props.goToPlantationReport();
              }}>
                <span className="fas fa-plus fontAwesome plus-icon" ></span>
              </div>
            </div>
          </div>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>

        {
          plantationReports.length > 0  ?
          <div  style={{display:"flex",justifyContent:"center"}} >
            <div style={{width: '95%'}}>
              <List renderHeader={this.renderHeader}>
                {
                  plantationReports.filter( f => f.date.split(' ')[0].includes(searchDate) ).map( (report, i) => {

                  return (
                    <div>
                      <ListItem tappable onClick={()=>{
                        this.props.setPlantationReport(report);
                        this.props.goToPlantationReport();
                      }}>
                        <div className={'left'}>
                          <span className={'list-counter'}>{ i+1 }</span>
                        </div>
                        <div className={'center'}>
                          <span className={'project-list-title-font project-list-project-name margin-between-right'}>{ report.date }</span>
                          <span className={'project-list-project-info margin-between-left'}>{this.props.projectInfo}</span>
                        </div>
                        <div className={'right'}>
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
              </List>
            </div>
          </div>
          :
          <NotFound/>

        }
      </div>
    );
  }

  render() {


    let {  isFetching ,currentPhase , forestalUnits, plantationProject } = this.props.appState;

    console.log(plantationProject);

    let exampleReports = [
      {
        "id": "1",
        "responsible": "Camilo",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "1",
        "project_id": "777"
      },
      {
        "id": "2",
        "responsible": "Marlon",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "2",
        "project_id": "777"
      },
      {
        "id": "3",
        "responsible": "Camilo",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "1",
        "project_id": "777"
      },
      {
        "id": "4",
        "responsible": "Marlon",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "2",
        "project_id": "778"
      },
      {
        "id": "5",
        "responsible": "Marlon",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "2",
        "project_id": "778"
      },
      {
        "id": "6",
        "responsible": "Marlon",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "2",
        "project_id": "778"
      },
      {
        "id": "7",
        "responsible": "Marlon",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "2",
        "project_id": "779"
      },
      {
        "id": "8",
        "responsible": "Marlon",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "2",
        "project_id": "779"
      },
      {
        "id": "9",
        "responsible": "Marlon",
        "assistant": "Pedro",
        "place": "Guayabetal",
        "date": "16-07-2019 09:33",
        "people": "5",
        "activities_report": [
          {
            "activity": "Riego",
            "activity_id": "1",
            "hours": "4",
            "quantityMeditionUnit": "4",
          },
          {
            "activity": "Rocerio",
            "activity_id": "2",
            "hours": "3",
            "quantityMeditionUnit": "3",
          },
          {
            "activity": "Rocerio",
            "activity_id": "3",
            "hours": "2",
            "quantityMeditionUnit": "6",
          },
          {
            "activity": "Ahoyado",
            "activity_id": "4",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Plantacion",
            "activity_id": "5",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Tutorado",
            "activity_id": "6",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Fertilizacion",
            "activity_id": "7",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Podas",
            "activity_id": "8",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Resiembra",
            "activity_id": "9",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
          {
            "activity": "Riego",
            "activity_id": "10",
            "hours": "2",
            "quantityMeditionUnit": "2",
          },
        ],
        "type": "2",
        "project_id": "779"
      },
    ]

    let filtered = exampleReports.filter( (pReport) => {
      console.log( plantationProject.id === parseInt( pReport.project_id ) );
      return ( plantationProject.id === parseInt( pReport.project_id ) );
    } );

    console.log(exampleReports);

    return (
      <AppPage  title={["REPORTES"]}
                backButton={true} >

        {  isFetching ?
          <div style={{backgroundColor:"white",height:"100%"}}>
            <Loading/>
          </div> :

          this.contentPage(filtered)

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
  removeFromOfflineForestUnitP3,
  goToPlantationReport,
  setPlantationReport
})(ReportList);
