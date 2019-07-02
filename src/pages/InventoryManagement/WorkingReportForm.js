import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import placeholderImage from "../../img/image-placeholder.png";
import { formCardStyles , workingRowStyles , modalStyles } from "../../jsStyles/Styles";


//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio, Checkbox } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components

import Loading from "../../components/Loading";
import Modal from "../../components/Modal";

//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';
import {  } from '../../flux/actions';
//helper

//
import moment from 'moment';

const styles =  {
  ...formCardStyles,
  ...workingRowStyles
};

class WorkingReportForm extends Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { isDisable:false , formData:{} , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.enableForm = this.enableForm.bind(this);
    console.log(this.props);
  }

  componentDidMount(){
    console.log(this.props);

    /*if(this.props.appState.currentHillsideMovement)
    {
      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          ...this.props.appState.currentHillsideMovement,
          date:this.props.appState.currentHillsideMovement.report_date.split(" ")[0],
          hour:this.props.appState.currentHillsideMovement.report_date.split(" ")[1]
        }
      },()=>{
        console.log(this.state);
      });
    }*/
  }



  handleChangeInput(event){

    if(event.target.name && event.target.value.length > -1)
    {
      console.log(event.target.name);
      console.log(event.target.value);
       this.setState(
         {
           formData:{
               ...this.state.formData,
               [event.target.name] : event.target.value
           }

         },() => {
           console.log(this.state);
         }
       );
    }
    if (event.target.value[0] == "="){
      event.target.value = event.target.value.substr(1)
    }
  }

  submitData(e){


      e.preventDefault();

      /*if(this.props.appState.isFetching)
      {
        return Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
      }

      if(this.props.appState.currentHillsideMovement)
      {
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        data.report_date = data.date+" "+data.hour;
        console.log(data);
        console.log("edit hall side movement");
        this.props.updateHallsideMovement(this.state.formData.id,data);
      }
      else
      {
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        data.project_id = this.props.appState.selectedProject.id;
        data.report_date = data.date+" "+data.hour;
        console.log(data);
        console.log("create hall side movement");
        this.props.createHallsideMovement(data);

      }*/

  }

  enableForm(){

    this.setState({ isDisable: !this.state.isDisable },()=>{
      console.log(this.state);
    });

  }



  contentPage(){

    return(

      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        {
          this.props.appState.currentPlantationEstablishment ?
             <Row>
              <button onClick={this.enableForm} style={styles.disableButton}>Habilitar edición</button>
            </Row>:null
        }
        <form className="simpleForm"  onSubmit={this.submitData}>


          <Row>

            <Col width="99%">
              <Card style={{...styles.cardInput }}>
                <Input type="text" name="name" onChange={this.handleChangeInput.name} value={this.state.formData.name} placeholder="Nombre" disabled={this.state.isDisable} required/>
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="49%">
              <Card style={{...styles.cardInput }}>
                <Input  type="number" name="cc" onChange={this.handleChangeInput.cc} value={this.state.formData.cc} placeholder="CC" disabled={this.state.isDisable} required/>
              </Card>
            </Col>

            <Col width="50%">
              <Card style={{...styles.cardInput }}>
                <Input  type="text" name="entity" onChange={this.handleChangeInput.entity} value={this.state.formData.entity} placeholder="Entidad" disabled={this.state.isDisable} required/>
              </Card>
            </Col>

          </Row>


          <Row>

            <Col width="49%">
              <Card style={{...styles.cardInput }}>
                <Input  type="text" name="charge" onChange={this.handleChangeInput.charge} value={this.state.formData.charge} placeholder="Cargo" disabled={this.state.isDisable} required/>
              </Card>
            </Col>

            <Col width="50%">
              <Card style={{...styles.cardInput }}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin' >
                  <option value="" disabled selected>Rol</option>
                  <option value="1">Trabajador</option>
                  <option value="2">Visitante</option>
                </Select>
              </Card>
            </Col>

          </Row>


          <Row>

            <Col width="49%">
              <Card style={{...styles.cardInput }}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin' >
                  <option value="" disabled selected>Estado</option>
                  <option value="1">Activo</option>
                  <option value="2">Inactivo</option>
                </Select>
              </Card>
            </Col>

          </Row>



          <Row>
            <button type="submit" disabled={this.state.isDisable}
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",marginLeft:"50%",marginRight:"1%",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 1px 1px -2px",
              color:"white",width:"50%",borderRadius:"10%"}}
              ><b>Registrar</b></button>
          </Row>


        </form>



      </div>


    );
  }



  render() {

    const { isFetching , currentFunctionalUnit } = this.props.appState;

    return (
      <AppPage  title={["Reporte de ", <strong>Obra</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

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
    project: state.project,
    appState: state.appState,
  };
}

//export default MachineryForm;

export default  connect(mapStateToProps, { })(WorkingReportForm);