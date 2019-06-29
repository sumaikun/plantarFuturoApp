import React, { Component } from 'react';
//sources
import checkList from "../../img/checkList.png";
import tree from "../../img/tree.png";
import chart from "../../img/chart.png";
import plant from "../../img/plant.png";
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import "../../css/style.css";
import { workingRowStyles , riskColors } from "../../jsStyles/Styles";

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
import { goToHillsideCollapse, goToRainFall, goToRiverCollapse, goToTunnelDeformation, goToRiskIndicator, goToHillsideMovement,
  setTunnelDeformation, setHillsideMovement, setRainfall,  setHillSideCollapse,  setRiverCollapse,
  setCurrentRiskPhase} from '../../flux/actions';
import { connect } from 'react-redux';

const styles = workingRowStyles;

class RiskReport extends Component {
  constructor(props) {
    super(props);

    this.contentPage = this.contentPage.bind(this);
    this.state = {
      searchName: '',
      searchDate: ''
    }
  }



  contentPage(){

    let currentRiskList;
    let action;

    console.log(this.props.appState.currentRiskPhase);

    switch(this.props.appState.currentRiskPhase)
    {
      case 1:

        currentRiskList = this.props.appState.TunnelDeformationList;

        action = (risk) => {
          this.props.setTunnelDeformation(risk);
          this.props.goToTunnelDeformation();
        }

        break;
      case 2:

        currentRiskList = this.props.appState.HillsideMovementList;

        action = (risk) => {
          this.props.setHillsideMovement(risk);
          this.props.goToHillsideMovement();
        }

        break;
      case 3:

        currentRiskList = this.props.appState.RainfallList;

        action = (risk) => {
          this.props.setRainfall(risk);
          this.props.goToRainFall();
        }

        break;
      case 4:

        currentRiskList = this.props.appState.HallsideCollapseList;

        action = (risk) => {
          this.props.setHillSideCollapse(risk);
          this.props.goToHillsideCollapse();
        }

        break;
      case 5:

        currentRiskList = this.props.appState.RiverCollapseList;

        action = (risk) => {
          this.props.setRiverCollapse(risk);
          this.props.goToRiverCollapse();
        }

        break;
      default:
          break;
    }



    return(
    <div>
      <div style={styles.formContainer}>
        <div className="login-form" >

          <div className="group" style={styles.searchInputContainer}>
            <input className="input fontAwesome" placeholder="Buscar" type="text"   style={{fontFamily:'Arial', marginTop:"8px", width:"80%"}} />
            <i class="fas fa-search" style={{top:"5%"}}></i>
          </div>
        </div>

        </div>


        { currentRiskList.length > 0  ?

          <List
            renderHeader={this.renderHeader}>

           {currentRiskList.map((risk, i) => {

              return (
              <div>
                <ListItem tappable onClick={()=>{

                    action(risk);

                  }}>
                  <div className="center" style={styles.mainListItem}>
                    <span className="Level4" style={styles.counter}>{i+1}</span>
                    <span className="Level3" style={styles.projectName}>{risk.code}</span>
                    <div>
                      <div className="Level2" style={{...styles.projectInfo,
                        ...riskColors['level'+risk.level],
                        "text-align":"center",
                      }}>Riesgo nivel {" "+risk.level}</div>
                      <br/>
                      <span style={styles.projectInfo}>{risk.report_date}</span>
                    </div>
                    <div className="Level" style={styles.buttonContainer}>
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

      console.log("fase de riesgo actual "+this.props.appState.currentRiskPhase);

      const {  isFetching } = this.props.appState

    return (
      <AppPage  title={["Reporte de ", <strong>{"Riesgos"}</strong>]} backButton={true} >

        {  isFetching ?
          <div style={{backgroundColor:"white",height:"100%"}}>
            <Loading/>
          </div> :

           this.contentPage()

        }

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

export default  connect(mapStateToProps, { goToHillsideCollapse, goToRainFall, goToRiverCollapse, goToTunnelDeformation, goToRiskIndicator, goToHillsideMovement,  setHillsideMovement, setRainfall,
setHillSideCollapse,  setRiverCollapse, setTunnelDeformation, setCurrentRiskPhase })(RiskReport);
