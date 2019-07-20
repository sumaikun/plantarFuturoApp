import React, { Component } from 'react';

//  Sources
import "../../css/style.css";
import './data';

//  Onsen UI
import {  Col, Row, Card, Button, List, ListItem} from 'react-onsenui';
import Ons from 'onsenui';

//  Components
import ListAccordion from "../../components/ListAccordion";
import CardOptionButton from "../../components/CardOptionButton";
import NotFound from "../../components/NotFound";

//container
import AppPage from '../../containers/AppPage';

//  Flux
import { goToSelectPlantationReportType, getProjectByUser, goToReportList, selectPlantationProject } from '../../flux/actions';
import { connect } from 'react-redux';
import yellowArrow from "../../img/yellowArrow.png";
import {pProjects} from "./data";

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

class Plantation extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let { projects , currentPhase } = this.props.appState;

    projects = [...projects, ...pProjects];

    const plantationProjects = projects.filter( project => {
      return ( parseInt(project.phase) === currentPhase );
    });

    return (
      <AppPage title={ [ <strong> { "PLANTACION" } </strong> ] }
               backButton={true}
               backButtonCallBack={ () => {
                 if (!this.props.appState.isFetching) { this.props.getProjectByUser(this.props.appState.user.id); }
               } }
      >
        { ( plantationProjects.length > 0 ) ? plantationProjects.map((pProject, i) => {
          return (
            <div>
              <div className={ (i < 1) ? 'first-gap-list-element' : 'gap-list-element' }></div>
              <div className={ 'flex-center' }>
                <div className={ 'list-margin' }>
                  <ListAccordion
                    counter={ i+1 }
                    projectName={ pProject.name }
                    phase={ currentPhase }
                    onClick={ ( ) => { this.props.selectPlantationProject(pProject) } }
                  >
                    <Row>
                      <Col width="6%">
                      </Col>
                      <Col width="47%">
                        <div onClick={ () => { this.props.goToReportList(); } }>
                          <CardOptionButton
                            accordionIconsStyles={styles.accordionIcons}
                            iconStyles={{fontSize:"10px", color:"white"}}
                            iconReference="fas fa-eye fontAwesome"
                            textStyles={{fontSize:"11px", marginLeft:"10px"}}
                            imgStyles={{height:"5vmin"}}
                            image={yellowArrow}
                            title="Ver reportes"
                          />
                        </div>
                      </Col>
                      <Col width="47%">
                        <div onClick={ () => { this.props.goToSelectPlantationReportType() } }>
                            <CardOptionButton
                              className="modal-btn"
                              accordionIconsStyles={styles.accordionIcons}
                              iconStyles={{fontSize:"10px", color:"white"}}
                              iconReference="fas fa-plus fontAwesome"
                              textStyles={{fontSize:"11px", marginLeft:"10px"}}
                              imgStyles={{height:"5vmin"}}
                              image={yellowArrow}
                              title="Nuevo registro"
                            />
                        </div>
                      </Col>
                    </Row>
                  </ListAccordion>
                </div>
              </div>
            </div>
          );})
          :
          <NotFound />
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

export default  connect(mapStateToProps,
  { goToSelectPlantationReportType,
    getProjectByUser,
    goToReportList,
    selectPlantationProject, })(Plantation);
