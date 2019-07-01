import React, { Component } from 'react';
//sources
import checkList from "../img/checkList.png";
import tree from "../img/tree.png";
import chart from "../img/chart.png";
import plant from "../img/plant.png";
import yellowArrow from "../img/yellowArrow.png";
import "../css/accordion.css";
import { workingRowStyles } from "../jsStyles/Styles";

// CSS
import "../css/style.css";

//Onsen Ui
import {  List , ListItem, Col, Row, Card, ListHeader, SearchInput } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";
//container
import AppPage from '../containers/AppPage';

//flux
import { goToInventoryForm , setForestalUnit, goToProcessForm, goToCompensationForm } from '../flux/actions';
import { connect } from 'react-redux';

const styles = workingRowStyles;


class ForestalUnitList extends Component {
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
      <ListHeader style={{position: "fixed", zIndex:1,width:"100%", fontSize: 15, padding:"0px",marginTop:"-40px"}} className="testClass">
        <Row>
          <Col width="50%" style={{
            backgroundColor: "rgba(99, 177, 48, 0.88)",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            display: "fixed"
            }}>
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
    /*tableData*/
    forestalUnits.sort((a,b) => {
      if (a.created_at > b.created_at) return -1
      if (a.created_at < b.created_at) return 1
      return 0
    })

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
            <div className={'plus-icon-container'} style={styles.searchButton} onClick={()=>{
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
              <span className="fas fa-plus fontAwesome plus-icon" ></span>
            </div>
          </div>
        </div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/>

        { forestalUnits.length > 0  ?
          
          <List
            renderHeader={this.renderHeader}>

           {forestalUnits.filter(f => f.created_at.split(' ')[0].includes(searchDate)).filter(e => e.code.includes(searchName)).map((unit, i) => {
              console.log(searchDate)
              return (
              <div>
                <ListItem  tappable onClick={()=>{
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
        <br/>
      </div>
      
    );
    
  }
  onFilter(forestalUnits) {
    console.log(forestalUnits)
    let searchData = forestalUnits.filter(function (data) {
      if(data.code == "A2431") return data;
    });
  }
  render() {


      const {  isFetching ,currentPhase , forestalUnits } = this.props.appState

    return (
      <AppPage  title={["Unidad funcional ", <strong>{this.props.appState.currentFunctionalUnit.code}</strong>]} backButton={true} >

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
    appState: state.appState
  };
}

export default  connect(mapStateToProps, { goToInventoryForm , setForestalUnit, goToProcessForm, goToCompensationForm })(ForestalUnitList);
