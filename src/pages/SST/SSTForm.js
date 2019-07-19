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
import { goToAssistantList, getSST } from '../../flux/actions';
//helper

//
import moment from 'moment';

const styles =  {
  ...formCardStyles,
  ...workingRowStyles,
  ...modalStyles
};

class SSTForm extends Component {
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
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha:</label>
                <Input style={{...styles.dateInput}} type="date" name="date" onChange={this.handleChangeInput}value={this.state.formData.date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="45%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Hora reporte:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="time" name="hour" onChange={this.handleChangeInput}value={this.state.formData.hour} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
            <Col width="54%">
              <Card style={styles.cardInput}>
                  <label>Lugar:</label>
                <Input type="text" name="place" onChange={this.handleChangeInput} value={this.state.formData.place} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, height:"auto"}}>
                <Input onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="objetive" value={this.state.formData.ls_description}  placeholder="Objetivo" disabled={this.state.isDisable} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="99%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="responsible" value={this.state.formData.people} onChange={this.handleChangeInput} placeholder="Responsable" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>

          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span style={{ textAlign:"center" }}>
                  Asistentes
                </span>
              </Card>
            </Col>

          </Row>


          <Row>

            <Card width="99%" style={{width:"99%",
                borderLeft: "yellow",
                borderStyle: "solid",
                borderWidth: "0px 0px 0px 10px"}}>
              <div style={{...styles.buttonContainer, "background-color":'white'}}>
                <div className="margin" style={styles.imageIcon}>
                    <i style={{color:"#30bfce"}} className="fas fa-user font Awesome"></i>
                </div>
                <div style={{position:"absolute", marginLeft:"30%"}}  onClick={()=>{this.props.goToAssistantList()}}>
                  <span style={{color:"gray"}}>Listado de asistentes</span>
                </div>
                <div>
                  <button className="nextButton" style={{marginLeft:"80%"}} >
                    <i className="fas fa-arrow-right font Awesome"></i>
                  </button>
                </div>
              </div>
            </Card>

          </Row>

          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, height:"auto"}}>

                <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="objetive" value={this.state.formData.comment}  placeholder="Comentarios" disabled={this.state.isDisable} ></textarea>

              </Card>
            </Col>
          </Row>

          <Row>

            <Col>
              <Card style={styles.cardLabel}>
                <span style={{ textAlign:"center" }}>
                  Foto de avance de obra
                </span>
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="50%">
              <br/>
              <Card style={styles.greenCard} >
                <div>
                  <img src={this.state.formData.general_image ? this.state.formData.general_image : placeholderImage } style={{width:"100%"}} />
                </div>
                {this.state.formData.general_image ?  null :
                  <Row>
                    <Button style={{...styles.buttonCard, 'font-size':"13px"}}
                      onClick={()=>{this.saveImage('general_image')}}
                    >Tomar foto</Button>
                    <label className="fileContainer" style={{ "font-size": "12px",
                      color: "white"
                    }}>
                      Subir archivo
                      <input  type="file" onChange={(event)=>{this.fileUpload("general_image",event)}}
                         />
                    </label>
                  </Row>
                }

              </Card>
            </Col>

            <Col width="50%">
              <br/>
              <Card style={styles.greenCard} >
                <div>
                  <img src={this.state.formData.id_image ? this.state.formData.id_image : placeholderImage } style={{width:"100%"}} />
                </div>
                {this.state.formData.id_image ?
                  null:
                  <Row>
                    <Button style={{...styles.buttonCard, 'font-size':"13px"}}
                      onClick={()=>{this.saveImage('id_image')}}
                    >Tomar foto</Button>
                    <label className="fileContainer" style={{ "font-size": "12px",
                      color: "white"
                    }}>
                      Subir archivo
                      <input  type="file" onChange={(event)=>{this.fileUpload("id_image",event)}}
                         />
                    </label>
                  </Row>
                }
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="50%">
              <br/>
              <Card style={styles.greenCard} >
                <div>
                  <img src={this.state.formData.general_image ? this.state.formData.general_image : placeholderImage } style={{width:"100%"}} />
                </div>
                {this.state.formData.general_image ?  null :
                  <Row>
                    <Button style={{...styles.buttonCard, 'font-size':"13px"}}
                      onClick={()=>{this.saveImage('general_image')}}
                    >Tomar foto</Button>
                    <label className="fileContainer" style={{ "font-size": "12px",
                      color: "white"
                    }}>
                      Subir archivo
                      <input  type="file" onChange={(event)=>{this.fileUpload("general_image",event)}}
                         />
                    </label>
                  </Row>
                }

              </Card>
            </Col>

            <Col width="50%">
              <br/>
              <Card style={styles.greenCard} >
                <div>
                  <img src={this.state.formData.id_image ? this.state.formData.id_image : placeholderImage } style={{width:"100%"}} />
                </div>
                {this.state.formData.id_image ?
                  null:
                  <Row>
                    <Button style={{...styles.buttonCard, 'font-size':"13px"}}
                      onClick={()=>{this.saveImage('id_image')}}
                    >Tomar foto</Button>
                    <label className="fileContainer" style={{ "font-size": "12px",
                      color: "white"
                    }}>
                      Subir archivo
                      <input  type="file" onChange={(event)=>{this.fileUpload("id_image",event)}}
                         />
                    </label>
                  </Row>
                }
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
      <AppPage  title={["FORMULARIO ", <strong>SST</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

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

export default  connect(mapStateToProps, {goToAssistantList, getSST })(SSTForm);
