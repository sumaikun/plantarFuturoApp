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


class RiverCollapse extends Component {
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
            <Col width="50%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
              <label>fecha:</label>
            <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="date" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>
            <Col width="50%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Hora reporte:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="time" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Represamiento
                </span>
              </Card>
            </Col>
          </Row>

          <div>

            <Row>
              <Col width="40%">
                <Card style={styles.cardInput}>
                  <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin'>
                    <option value="" disabled selected></option>
                    <option value="1">Si</option>
                    <option value="2">No</option>
                  </Select>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="100%">
                <Card style={styles.cardInput}>
                  <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput} placeholder="Ubicación" required />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="100%">
                <Card style={{...styles.cardInput, height:"auto"}}>

                  <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="note" value={this.state.formData.note}  placeholder="Descripción"></textarea>

                </Card>
              </Col>
            </Row>

          </div>

          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Arrastre de material
                </span>
              </Card>
            </Col>
          </Row>


          <div>

            <Row>
              <Col width="40%">
                <Card style={styles.cardInput}>
                  <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin'>
                    <option value="" disabled selected></option>
                    <option value="1">Si</option>
                    <option value="2">No</option>
                  </Select>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="100%">
                <Card style={styles.cardInput}>
                  <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput} placeholder="Ubicación" required />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="100%">
                <Card style={{...styles.cardInput, height:"auto"}}>

                  <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="note" value={this.state.formData.note}  placeholder="Descripción"></textarea>

                </Card>
              </Col>
            </Row>

          </div>


          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Precencia de ruidos
                </span>
              </Card>
            </Col>
          </Row>


          <div>

            <Row>
              <Col width="40%">
                <Card style={styles.cardInput}>
                  <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin'>
                    <option value="" disabled selected></option>
                    <option value="1">Si</option>
                    <option value="2">No</option>
                  </Select>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="100%">
                <Card style={styles.cardInput}>
                  <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput} placeholder="Ubicación" required />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="100%">
                <Card style={{...styles.cardInput, height:"auto"}}>

                  <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="note" value={this.state.formData.note}  placeholder="Descripción"></textarea>

                </Card>
              </Col>
            </Row>

          </div>


          <Row>

            <Col width="60%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput}placeholder="Responsable" required />
              </Card>
            </Col>

            <Col width="40%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput}placeholder="Identificación" required />
              </Card>
            </Col>

          </Row>

          <Row>
            <Col width="100%">
              <Card style={{...styles.cardInput, height:"auto"}}>

                <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="note" value={this.state.formData.note}  placeholder="Observaciones"></textarea>

              </Card>
            </Col>
          </Row>

          <Row>
            <button type="submit"
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 10px 10px -2px",
              color:"white",width:"100%",borderRadius:"10%"}}
              ><b>Registrar</b></button>
          </Row>
        </form>
      </div>


    );
  }



  render() {


    return (
      <AppPage  title={["Recorrido de ", <strong>Quebrada</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

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

export default  connect(mapStateToProps, {})(RiverCollapse);
