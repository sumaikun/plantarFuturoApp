import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";

import Styles from  './styles'

//Onsen Ui
import {  Col, Row, Card, Button, Input, Select } from 'react-onsenui';

//Libraries

//components
import Loading from "../../components/Loading";

//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';

import {createVisitor, updateVisitor} from '../../flux/actions';
//helper


class AssistantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisable:false ,
      formData:this.props.visitor,
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
    let {formData} = this.state //
    ,  {project_id }  = this.props
    , data = {...formData, project_id}
    this.props.handleChangeCreate(data);
    //this.props.handleChangeUpdate(data);
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
        <form className="simpleForm" onSubmit={this.submitData.bind(this)} >
          <Row>
            <Col width="99%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>Nombre</label>
                <Input style={{...Styles.dateInput}} type="text" name="name" onChange={this.handleChangeInput.bind(this)} disabled={this.state.isDisable}
                value={this.props.visitor.name}/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="45%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>C.C</label>
                <Input style={{...Styles.dateInput, position:"absolute", width:"40%"}} type="text" name="document" onChange={this.handleChangeInput.bind(this)} disabled={this.state.isDisable}
                value={this.props.visitor.document}
                />
              </Card>
            </Col>
            <Col width="54%">
              <Card style={Styles.cardInput}>
                  <label>Entidad</label>
                <Input type="text" name="entity" onChange={this.handleChangeInput.bind(this)} disabled={this.state.isDisable}
                value={this.props.visitor.entity}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="54%">
              <Card style={Styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput.bind(this)} name="position" disabled={this.state.isDisable} name='position'>
                    <option value="" disabled selected>Grieta</option>
                    <option value="Trabajador">Trabajador</option>
                    <option value="Visitante">Visitante</option>
                </Select>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="45%">
              <Card style={Styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput.bind(this)} name="state" disabled={this.state.isDisable}>
                    <option value="" disabled selected>Rol</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </Select>
              </Card>
            </Col>
          </Row>
          <Row>
            <button type="submit" disabled={this.state.isDisable} style={Styles.button}
              ><b>Registrar</b></button>
          </Row>
        </form >
      </div>
      </AppPage>
    );
  }


}

const mapStateToProps = state => {
  return {
    visitor:  state.appState.sstVisitor,
    appState: state.appState,
    project_id: state.appState.sstData.project_id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeCreate: (data)=>{dispatch(createVisitor(data))},
    handleChangeUpdate: (data)=>{dispatch(updateVisitor(data))}
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(AssistantForm);
