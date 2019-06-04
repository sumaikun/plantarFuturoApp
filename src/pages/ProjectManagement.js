import React, { Component } from 'react';
//sources
import checkList from "../img/checkList.png";
import tree from "../img/tree.png";
import chart from "../img/chart.png";
import plant from "../img/plant.png";
import yellowArrow from "../img/yellowArrow.png";
import "../css/accordion.css";
import "../css/Modal.css";

//Onsen Ui
import {  Col, Row, Card, Button} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import CardButton from "../components/CardButton";

//container
import AppPage from '../containers/AppPage';

//flux
import { setProjectPhase , goToProjects , fetchProjects, goToRiskManagement } from '../flux/actions';
import { connect } from 'react-redux';

//css
import "../css/style.css";

class ProjectManagement extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchProjects();
  }

  render() {

    return (
      <AppPage  title={["GESTION DE ", <strong>PROYECTOS</strong>]}>
        <div style={{height:"100%",backgroundColor:"white"}}>
          <br/>

          <div onClick={()=>{this.props.setProjectPhase(1);
             this.props.goToProjects()}}>
            <CardButton
              imgIcon = {checkList}
              title="Inventario"
              subtitle="Total proyectos"
              infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
             />
           </div>

           <div style={{height:"10px"}} ></div>
          <div onClick={()=>{this.props.setProjectPhase(2);
             this.props.goToProjects()}}>
            <CardButton
              imgIcon = {tree}
              title="Aprovechamiento"
              subtitle="Total proyectos"
              infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
              />
           </div>
            <div style={{height:"10px"}} ></div>
          <div onClick={()=>{this.props.setProjectPhase(3);
             this.props.goToProjects()}}>
            <CardButton
              imgIcon = {plant}
              title="Compensacion"
              subtitle="Total proyectos"
              infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
              />
            </div>
            <div style={{height:"10px"}} ></div>
            <div onClick={()=>{Ons.notification.alert({title:"",message:"¡Proximamente!"})}}>
              <CardButton
                imgIcon = {chart}
                title="Vivero"
                subtitle="Total reportes"
                infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
                />
            </div>
            <div style={{height:"10px"}} ></div>
<<<<<<< HEAD
            <div onClick={()=>{this.props.setProjectPhase(4),
              this.props.goToProjects()
              }}>
              <CardButton
=======
            <div onClick={()=>{this.props.goToRiskManagement()}}>
              <CardButton 
>>>>>>> 27168855fbf6650c8b5585db5996ff601328c649
                imgIcon = {checkList}
                title="Riesgo"
                subtitle="Total proyectos"
                infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
               />
             </div>
        </div>
      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation
  };
}

export default  connect(mapStateToProps, { fetchProjects , goToProjects , setProjectPhase, goToRiskManagement })(ProjectManagement);
