import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import placeholderImage from "../../img/image-placeholder.png";

import Styles from  './styles'

//Onsen Ui
import {  Col, Row, Card, Button, Input } from 'react-onsenui';

//Libraries

//components
import Loading from "../../components/Loading";

//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';

import {createVisitor} from '../../flux/actions';
//helper


class AssistantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisable:false ,
      formData:this.props.sst,
      selectSearch:{}
    };
  }
  componentDidMount(){
  }
  handleChangeInput(event){

    if(event.target.name && event.target.value.length > -1) {
       this.setState({
           formData: {
               ...this.state.formData,
               [event.target.name] : event.target.value
           }
         }
       );
    }
    if (event.target.value[0] == "=") event.target.value = event.target.value.substr(1)
  }
  submitData(e){
    e.preventDefault();
    //if (this.props.sst.actions == 'update')  return this.props.handleChangeUpdate(this.state.formData)
    //return this.props.handleChangeCreate(this.state.formData)
  }
  enableForm(){
    this.setState({ isDisable: !this.state.isDisable });
  }
  render() {
    const { isFetching } = this.props.appState;
    if (isFetching) {
      return <div style={{backgroundColor:"white",height:"100%"}}>
        <Loading/>
      </div>
    }
    console.log(this.props);
    return (
      <AppPage  title={["Formulario de", <strong>Visitantes</strong>]} backButton={true} backButtonCallBack={()=>{ }}>
      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col width="99%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>Nombre</label>
                <Input style={{...Styles.dateInput}} type="text" name="name" onChange={this.handleChangeInput.bind(this)} value={this.state.formData.name} disabled={this.state.isDisable}/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="45%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>C.C</label>
                <Input style={{...Styles.dateInput, position:"absolute", width:"40%"}} type="text" name="document" onChange={this.handleChangeInput.bind(this)} value={this.state.formData.document} disabled={this.state.isDisable}/>
              </Card>
            </Col>
            <Col width="54%">
              <Card style={Styles.cardInput}>
                  <label>Entidad</label>
                <Input type="text" name="entity" onChange={this.handleChangeInput.bind(this)} value={this.state.formData.entity} disabled={this.state.isDisable}/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="45%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>Cargo</label>
                <Input style={{...Styles.dateInput, position:"absolute", width:"40%"}} type="text" name="position" onChange={this.handleChangeInput.bind(this)} value={this.state.formData.position} disabled={this.state.isDisable}/>
              </Card>
            </Col>
            <Col width="54%">
              <Card style={Styles.cardInput}>
                  <label>Rol</label>
                <Input type="text" name="state" onChange={this.handleChangeInput.bind(this)} value={this.state.formData.state} disabled={this.state.isDisable}/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="45%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>Estado</label>
                <Input style={{...Styles.dateInput, position:"absolute", width:"40%"}} type="text" name="project_id" onChange={this.handleChangeInput.bind(this)} value={this.state.formData.project_id} disabled={this.state.isDisable}/>
              </Card>
            </Col>
          </Row>
          <Row>
            <button type="button" disabled={this.state.isDisable} style={Styles.button}
              ><b>Registrar</b></button>
          </Row>
        </form>
      </div>
      </AppPage>
    );
  }


}

const mapStateToProps = state => {
  return {
    sst:  state.appState.sstData,
    appState: state.appState,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeCreate: (data)=>{dispatch(createVisitor(data))},
    /*handleChangeUpdate: (data)=>{dispatch(updateVisitor(data))}*/
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(AssistantForm);
