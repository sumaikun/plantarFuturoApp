import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";

import { formCardStyles } from "../../jsStyles/Styles";

//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import Loading from "../../components/Loading";
//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';
//import {  } from '../flux/actions';
//helper

const styles = formCardStyles;


class Rainfall extends Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { formData:{} , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    console.log(this.props);
  }

  componentDidMount(){
    console.log(this.props);
    if(this.props.appState.tunnelDeformationE)
    {
      this.setState({
        formData:{
          ...this.state.formData,
          ...this.props.appState.forestalUnitE
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
               [event.target.name] : event.target.value
           }

         },() => {
           console.log(this.state);
         }
       );
    }
  }

  submitData(e){



  }

  contentPage(){

    return(

      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col width="33%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="Codigo" maxLength="10" required/>
              </Card>
            </Col>
            <Col width="33%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"30%"}} type="date" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>
            <Col width="33%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                <label>Hora:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"30%"}} type="time" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Intensidad
                </span>
              </Card>
            </Col>
          </Row>


          <Row>
            <Col width="33%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin'>
                  <option value="" disabled selected>Tipo</option>
                  <option value="1">LLovizna</option>
                  <option value="2">Lluvia</option>
                  <option value="3">Lluvia torrencial</option>
                  <option value="4">Tormenta</option>
                </Select>
              </Card>
            </Col>
            <Col width="33%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Minutos:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"30%"}} type="number" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>
            <Col width="33%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                <label>Horas:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"30%"}} type="number" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>
          </Row>


          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Duración
                </span>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="49.5%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
              <label>Inicio:</label>
            <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="datetime-local" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>
            <Col width="49.5%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Final:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="datetime-local" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>

          </Row>



          <Row>
            <Col width="99%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin'>
                  <option value="" disabled selected>Estado de emergencia</option>
                  <option value="1">Leve</option>
                  <option value="2">Grave</option>
                </Select>
              </Card>
            </Col>
          </Row>

          <Row>

            <Col width="60%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput}placeholder="Responsable" required />
              </Card>
            </Col>

            <Col width="39.5%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput}placeholder="Identificación" required />
              </Card>
            </Col>

          </Row>

          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, height:"auto"}}>

                <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"250px"}} name="note" value={this.state.formData.note}  placeholder="Observaciones"></textarea>

              </Card>
            </Col>
          </Row>

          <Row>
            <button type="submit"
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",marginLeft:"50%",marginRight:"1%",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 1px 1px -2px",
              color:"white",width:"50%",borderRadius:"10%"}}
              ><b>Registrar</b></button>
          </Row>
        </form>
      </div>


    );
  }



  render() {


    return (
      <AppPage  title={["", <strong>Precipitación</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

        {this.contentPage()}

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

export default  connect(mapStateToProps, {})(Rainfall);
