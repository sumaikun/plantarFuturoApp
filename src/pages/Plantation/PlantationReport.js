import React, { Component, Fragment } from 'react';
//sources
import "../../css/simpleForm.css";
import { formCardStyles , workingRowStyles , modalStyles } from "../../jsStyles/Styles";
import "./data";


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
import {exampleActivities} from "./data";
//helper



const styles =  {
  ...formCardStyles,
  ...workingRowStyles,
};

class PlantationReport extends Component {
  constructor(props) {
    super(props);
    //this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { isDisable: false , formData: { activities_report: [] }, selectSearch: {} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    //this.enableForm = this.enableForm.bind(this);
    this.itemActivity = this.itemActivity.bind(this);
    console.log(this.props);
  }

  componentDidMount(){
    console.log(this.props);
    console.log( this.state.formData );

    if(this.props.appState.plantationReportToEdit)
    {
      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          ...this.props.appState.plantationReportToEdit,
        }
      },()=>{
        console.log(this.state);
      });
    }
  }

  handleChangeInput(event){

    if(event.target.name && event.target.value.length > 0)
    {
      console.log(event.target.name);
      console.log(event.target.value);
      this.setState(
        {
          formData:{
            ...this.state.formData,
            [event.target.name]: event.target.value
          }
        },() => {
          console.log(this.state);
        }
      );
    }

    if (event.target.value[0] == "="){
      event.target.value = event.target.value.substr(1);
    }
  }

  handleArrayChangeInput(event, key, index){

    if(event.target.name && event.target.value.length > 0)
    {
      console.log(event.target.name);
      console.log(event.target.value);

      this.setState(
        {
          formData:{
            ...this.state.formData,
            [key]: { ...this.state.formData.activities_report, [index]: { [event.target.name]: event.target.value } },
          }
        },() => {
          console.log(this.state);
        }
      );
    }

    if (event.target.value[0] == "="){
      event.target.value = event.target.value.substr(1);
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

  itemActivity(activityName, activityIndex, meditionUnit = null || undefined){
    return(

      <Row>
        <Col width="35%">
          <Card style={styles.cardInput}>
            <Input style={styles.textInput} type="text" name={ 'activity' } value={ this.state.formData.activities_report[activityIndex] ? ( this.state.formData.activities_report[activityIndex].activity ? this.state.formData.activities_report[activityIndex].activity : null ) : null } onChange={ (event) => { this.handleArrayChangeInput(event, 'activities_report', activityIndex ) } } placeholder={ activityName } disabled={ false } required />
          </Card>
        </Col>
        <Col width="12%">
          <Card style={styles.cardInput}>
            <Checkbox name={ `checked` } value={ this.state.formData.activities_report[activityIndex] ? ( this.state.formData.activities_report[activityIndex].checked ? this.state.formData.activities_report[activityIndex].checked : null ) : null } onChange={ (event) => { this.handleArrayChangeInput(event, 'activities_report', activityIndex ) } } />
          </Card>
        </Col>
        {
          ( meditionUnit != null || meditionUnit != undefined ) ?
            <Fragment>
              <Col width={'25.5%'}>
                <Card style={styles.cardInput}>
                  <Input style={styles.textInput} type="text" name={ 'hours' } value={ this.state.formData.activities_report[activityIndex] ? ( this.state.formData.activities_report[activityIndex].hours ? this.state.formData.activities_report[activityIndex].hours : null ) : null } placeholder="Horas" disabled={this.state.isDisable} onChange={ (event) => { this.handleArrayChangeInput(event, 'activities_report', activityIndex ) } } required />
                </Card>
              </Col>
              <Col width={'25.5%'}>
                <Card style={styles.cardInput}>
                  <Input style={styles.textInput} type="text" name={ 'quantityMeditionUnit' } value={ this.state.formData.activities_report[activityIndex] ? ( this.state.formData.activities_report[activityIndex].quantityMeditionUnit ? this.state.formData.activities_report[activityIndex].quantityMeditionUnit : null ) : null } placeholder={ meditionUnit } disabled={ this.state.isDisable } onChange={ (event) => { this.handleArrayChangeInput(event, 'activities_report', activityIndex ) } } />
                </Card>
              </Col>
            </Fragment>
            :
            <Col width={'51%'}>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name={ 'hours' } value={ this.state.formData.activities_report[activityIndex] ? ( this.state.formData.activities_report[activityIndex].hours ? this.state.formData.activities_report[activityIndex].hours : null ) : null } placeholder="Horas" disabled={this.state.isDisable} onChange={ (event) => { this.handleArrayChangeInput(event, 'activities_report', activityIndex ) } } required />
              </Card>
            </Col>
        }
      </Row>
    );
  }

  contentPage(activities){
    return(
      <div style={{backgroundColor:"#e6e7e8", height:"100%"}}>
        <br/>
        {
          this.props.appState.currentPlantationEstablishment ?
            <Row>
              <button onClick={this.enableForm} style={styles.disableButton}>Habilitar edición</button>
            </Row>
            :
            null
        }
        <form className="simpleForm" onSubmit={this.submitData}>
          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span style={{fontSize:"11px", textAlign:"center"}}>
                  FORMATO DE CONTROL DE ACTIVIDADES DIARIAS
                </span>
              </Card>
            </Col>
          </Row>

          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="responsible" value={this.state.formData.responsible} onChange={this.handleChangeInput} placeholder="Responsable" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="assistant" value={this.state.formData.assistant} onChange={this.handleChangeInput} placeholder="Auxiliar de campo" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="place" value={this.state.formData.place} onChange={this.handleChangeInput} placeholder="Sitio" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="49%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha:</label>
                <Input style={{...styles.dateInput}} type="date" name="date" onChange={this.handleChangeInput} value={this.state.formData.date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>

          </Row>


          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="number" step="any" name="people" value={this.state.formData.people} onChange={this.handleChangeInput} placeholder="No. personas campo" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="49%">

            </Col>

          </Row>

          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span style={{fontSize:"11px", textAlign:"center"}}>
                  ACTIVIDAD
                </span>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardLabel}>
                <span style={{fontSize:"11px", textAlign:"center"}}>
                  CANTIDAD
                </span>
              </Card>
            </Col>
          </Row>

          {
            activities.length > 0 ?
              activities.map( (activity, index) => {
                return (
                  this.itemActivity(activity.activity, index, activity.meditionUnit)
                );
              })
              :
              null
          }

          <Row>
            <button type="submit" disabled={this.state.isDisable}
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",marginLeft:"50%",marginRight:"1%",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 1px 1px -2px",
              color:"white",width:"49%",borderRadius:"10%"}}
              >
              <b>Registrar</b>
            </button>
          </Row>
        </form>
      </div>
    );
  }



  render() {

    let { isFetching , plantationReportType } = this.props.appState;
    let headerTitle = null;
    let activities = [...exampleActivities];

    switch ( plantationReportType ) {
      case 1:
        headerTitle = 'ESTABLECIMIENTO'
        break;

      case 2:
        headerTitle = 'MANTENIMIENTO';
        break;

      default:
        break;
    }



    return (
      <AppPage  title={["", <strong> {headerTitle} </strong>]} backButton={true} backButtonCallBack={()=>{ }}>

        {  isFetching ?
          <div style={{backgroundColor:"white",height:"100%"}}>
            <Loading/>
          </div>
          :
           this.contentPage(activities)
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

//export default MachineryForm;
export default connect(mapStateToProps, { })(PlantationReport);
