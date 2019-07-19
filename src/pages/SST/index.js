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
import { goToSSTForm, setSST } from '../../flux/actions';
import { connect } from 'react-redux';

//helpers


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

class ProjectListCivil extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode:false,
      idToModify:null,
    }

  }
  componentDidMount(){
  }

  render() {
    console.log(this.props)
    return (
      <AppPage  title={[<strong>{"Lista de informes SST"}</strong>]} backButton={true} backButtonCallBack={()=>{  }}><br / >
              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <div  onClick={()=>{this.props.goToSSTForm()}}>
                    <ListAccordion counter={2} projectName={"INFORME 1"} projectInfo={""} />
                  </div>
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

export default  connect(mapStateToProps,{ goToSSTForm, setSST})(ProjectListCivil);
