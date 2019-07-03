import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import { formCardStyles , workingRowStyles , modalStyles } from "../../jsStyles/Styles";


//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio} from 'react-onsenui';
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
  ...workingRowStyles,
  ...modalStyles
};

class MachineryForm extends Component {
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
          this.props.appState.currentMachineForm ?
             <Row>
              <button onClick={this.enableForm} style={styles.disableButton}>Habilitar edición</button>
            </Row>:null
        }
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>

            <Col width="99%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha de entrega:</label>
                <Input style={{...styles.dateInput}} type="date" name="date" onChange={this.handleChangeInput}value={this.state.formData.date} disabled={this.state.isDisable} required/>
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
                <Input style={styles.textInput} type="text" name="place" value={this.state.formData.place} onChange={this.handleChangeInput} placeholder="Lugar" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="code" value={this.state.formData.code} onChange={this.handleChangeInput} placeholder="Código" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="name" value={this.state.formData.name} onChange={this.handleChangeInput} placeholder="Nombre" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>

          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, height:"auto"}}>

                <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="description" value={this.state.formData.description} disabled={this.state.isDisable} placeholder="Descripción" ></textarea>

              </Card>
            </Col>
          </Row>


          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="type" value={this.state.formData.type} onChange={this.handleChangeInput} placeholder="Tipo" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="model" value={this.state.formData.model} onChange={this.handleChangeInput} placeholder="Modelo" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>


          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="number" name="quantity" value={this.state.formData.quantity} onChange={this.handleChangeInput} placeholder="Cantidad" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="customer" value={this.state.formData.customer} onChange={this.handleChangeInput} placeholder="Cliente" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="front" value={this.state.formData.front} onChange={this.handleChangeInput} placeholder="Frente de obra" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="condition" value={this.state.formData.condition} onChange={this.handleChangeInput} placeholder="Condición" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>


          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="provider" value={this.state.formData.provider} onChange={this.handleChangeInput} placeholder="Proveedor" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="service" value={this.state.formData.service} onChange={this.handleChangeInput} placeholder="Servicio restante" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="49%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha de adquisición:</label>
                <Input style={{...styles.dateInput , width:"30%"}} type="date" name="adquisition_date" onChange={this.handleChangeInput}value={this.state.formData.adquisition_date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="initial_value" value={this.state.formData.initial_value} onChange={this.handleChangeInput} placeholder="Valor inicial" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>


          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, height:"auto"}}>

                <Input onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="observations" value={this.state.formData.observations}  disabled={this.state.isDisable} placeholder="Observaciones" />

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

        <br/>

        <div style={{overflow: 'hidden', backgroundColor: 'orange' }} id="modal-btn"
        onClick={
          ()=>{
            console.log("Trying to go up");
            /*window.scrollTo({
                top: 100,
                left: 100,
                behavior: 'smooth'
              })*/

           throw new Error('I crashed!');
          }
        } >
          <div className="group" style={{...styles.searchInputContainer, "justify-content":"left"}}>
            <div style={styles.buttonContainer}>
              <div style={styles.ProjectButton}>
                <i className="fas fa-arrow-right fontAwesome"></i>
              </div>
            </div>
            <div>
              <span style={{color:"white",fontWeight:"bold", marginLeft:"5%"}}>Trasladar</span>
            </div>
            <div style={{ ...styles.buttonContainer, 'margin-left':'50%' }}>
              <div style={styles.ProjectButton}>
                <i className="fas fa-arrow-right fontAwesome"></i>
              </div>
            </div>
          </div>
        </div>

      </div>


    );
  }



  render() {

    const { isFetching , currentFunctionalUnit } = this.props.appState;

    return (
      <AppPage  title={["Inventario de ", <strong>Maquinaría</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

        {  isFetching ?
          <div style={{backgroundColor:"white",height:"100%"}}>
            <Loading/>
          </div> :

           this.contentPage()

        }


        <Modal title="Traslado de unidad" ModalStyles={styles.modalStyles}>
          ...info
        </Modal>

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

export default  connect(mapStateToProps, { })(MachineryForm);
