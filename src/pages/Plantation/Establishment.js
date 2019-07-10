import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
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



const styles =  {
  ...formCardStyles,
  ...workingRowStyles,
};

class Establishment extends Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { isDisable:false , formData:{} , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.enableForm = this.enableForm.bind(this);
    this.itemActivity = this.itemActivity.bind(this);
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


  itemActivity(input1Name,input1Placeholder = input1Name){

    return(
      <Row>
        <Col width="35%">
          <Card style={styles.cardInput}>
            <Input style={styles.textInput} type="text" name={input1Name} value={this.state.formData[input1Name]} onChange={this.handleChangeInput} placeholder={input1Placeholder} disabled={this.state.isDisable} required />
          </Card>
        </Col>
        <Col width="12%">
          <Card style={styles.cardInput}>
            <Checkbox />
          </Card>
        </Col>
        <Col>
          <Card style={styles.cardInput}>
            <Input style={styles.textInput} type="text" name="hours" value={this.state.formData.hours} onChange={this.handleChangeInput} placeholder="" disabled={this.state.isDisable} required />
          </Card>
        </Col>
      </Row>
    );
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

            <Col width="50%">
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

            <Col width="50%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha:</label>
                <Input style={{...styles.dateInput}} type="date" name="date" onChange={this.handleChangeInput}value={this.state.formData.date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>

          </Row>


          <Row>

            <Col width="59%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="decimal" name="people" value={this.state.formData.people} onChange={this.handleChangeInput} placeholder="No. personas en campo" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="40%">

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



          <Row>
            <Col width="35%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="roceria" value={this.state.formData.roceria} onChange={this.handleChangeInput} placeholder="Rocería" disabled={this.state.isDisable} required />
              </Card>
            </Col>
            <Col width="12%">
              <Card style={styles.cardInput}>
                <Checkbox />
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="hours" value={this.state.formData.hours} onChange={this.handleChangeInput} placeholder="Horas" disabled={this.state.isDisable} required />
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="m" value={this.state.formData.hours} onChange={this.handleChangeInput} placeholder="M2" disabled={this.state.isDisable} required />
              </Card>
            </Col>
          </Row>

          {this.itemActivity("mark","Marcación")}

          {this.itemActivity("Plateo")}

          {this.itemActivity("Ahoyado")}

          {this.itemActivity("Plantación")}

          {this.itemActivity("Tutorado")}

          {this.itemActivity("Fertilización")}

          {this.itemActivity("Podas")}

          {this.itemActivity("Resiembra")}

          {this.itemActivity("Riesgo")}

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
      <AppPage  title={["", <strong>Establecimiento</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

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

export default  connect(mapStateToProps, { })(Establishment);
