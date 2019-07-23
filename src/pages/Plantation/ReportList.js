import React, { Component } from 'react';
//sources
import checkList from "../../img/checkList.png";
import tree from "../../img/tree.png";
import chart from "../../img/chart.png";
import plant from "../../img/plant.png";
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import "../../css/style.css";
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
import {
  //  Navigation
  goToPlantationReport,
  goToSelectPlantationReportType,

  //  AppActions
  setPlantationReport,
  setPlantationReportType,

  //  API
  getDefaultActivitiesByType,
  getPlantationReportById,
  getPlantationReportsByProject,
} from '../../flux/actions';

import { connect } from 'react-redux';
import { exampleReports } from "./data";

const styles = workingRowStyles;

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.state = {
      searchName: '',
      searchDate: ''
    };
  }

  renderHeader(){
    return(
      <ListHeader className="list-header" style={{position: "absolute", width:"95%", fontSize: 15, padding:"0px", marginTop:"-40px"}} >
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
            <span># DE REPORTES</span>
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
          <div className={'filter-container'} style={{backgroundColor:"orange", position:"fixed", width:"100%"}}>
            <div className="login-form" >
              <div className="group" style={styles.searchInputContainer}>
                <div>
                  <input id="search" value={searchName} name="buscador" onChange={e => this.setState({ searchName: e.target.value })} className="input fontAwesome" placeholder="Buscar" type="text" style={{fontFamily:'Arial', marginTop:"8px", width:"90%", height:"10px"}} />
                  <input type="date" value={searchDate} onChange={e => this.setState({ searchDate: e.target.value })} className="input fontAwesome" style={{fontFamily:'Arial', marginTop:"8px", width:"90%", height:"2px"}} />
                </div>
                <div className={'plus-icon-container'}
                     style={styles.searchButton}
                     onClick={ ( ) => {
                       this.props.goToSelectPlantationReportType();
                     } }
                >
                  <span className="fas fa-plus fontAwesome plus-icon" ></span>
                </div>
              </div>
            </div>
          </div>

        {
          plantationReports.length > 0  ?
          <div className={'list-container-and-header'} style={{display:"flex", justifyContent:"center"}} >
            <div style={{width: '95%'}}>
              <List
                renderHeader={this.renderHeader}
              >
                {
                  plantationReports
                    .filter( r => r.report_date.split(' ')[0].includes(searchDate) )
                    .map( (report, i) => {
                      return (
                        <div
                          className={'select-report'}
                          onClick={()=>{
                            this.props.getDefaultActivitiesByType( parseInt( report.type ) );
                            this.props.setPlantationReportType( parseInt( report.type ) );
                            this.props.getPlantationReportsByProject( report.project.id );
                            this.props.setPlantationReport( report );
                            this.props.goToPlantationReport();
                          }}
                        >
                          <ListItem tappable onClick={()=>{
                            /*
                            this.props.setPlantationReport( report );
                            this.props.getDefaultActivitiesByType( parseInt( this.props.appState.plantationReportToEdit.type ) );
                            this.props.setPlantationReportType( parseInt( this.props.appState.plantationReportToEdit.type ) );
                            this.props.goToPlantationReport();
                            */
                          }}>
                            <div className={'left'}>
                              <span className={'list-counter'}>{ i+1 }</span>
                            </div>
                            <div className={'center'}>
                              <span className={'project-list-title-font project-list-project-name margin-between-right'}>{ report.report_date }</span>
                              <span className={'project-list-project-info margin-between-left'}>{ parseInt( report.type ) === 1 ? 'ESTABLECIMIENTO' : 'MANTENIMIENTO' }</span>
                            </div>
                            <div className={'right'}>
                              <div className={'arrow-button-container'}>
                                <div className={'tree-dots-button'}>
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
                    })
                }
              </List>
            </div>
          </div>
          :
          <div className={'not-found'}>
            <NotFound/>
          </div>
        }
      </div>
    );
  }

  render() {
    let {  isFetching, plantationProject, plantationReports } = this.props.appState;

    //console.log( plantationProject );
    //console.log( plantationReports );

    let filteredPlantationReportsByProject = [];

    if ( plantationReports ) {
      filteredPlantationReportsByProject = plantationReports.filter( (pReport) => {
        //console.log( plantationProject.id === parseInt( pReport.project_id ) );
        return ( plantationProject.id === parseInt( pReport.project_id ) );
      } );
    }

    //console.log(exampleReports);

    return (
      <AppPage title={["REPORTES"]} backButton={true} >
        {
          isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div>
            :
            this.contentPage( filteredPlantationReportsByProject )
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

export default  connect(mapStateToProps, {
//  Navigation
  goToPlantationReport,
  goToSelectPlantationReportType,

  //  AppActions
  setPlantationReport,
  setPlantationReportType,

  //  API
  getDefaultActivitiesByType,
  getPlantationReportById,
  getPlantationReportsByProject,
})(ReportList);
