import React, { Component } from 'react';
//sources
import "../css/simpleForm.css";
import placeholderImage from "../img/image-placeholder.png";

//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import Loading from "../components/Loading";
//container
import AppPage from '../containers/AppPage';

//flux
import { connect } from 'react-redux';
import { createForestUnitPhase1 , updateForestUnitPhase1 , getForestalUnits } from '../flux/actions';
//helper

import { getFileContentAsBase64 } from '../helpers/imageHandler';

const styles = {
  cardInput:{
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding:"3px"
  },
  cardRadio:{
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding:"3px",
    justifyContent:"space-around"
  },
  cardLabel:{
    height: "30px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#61af2e",
    padding:"3px",
    color:"white"
  },
  textInput:{
    fontSize:"14px"
  },
  dateInput:{
    fontSize:"14px",
    textAlign:"center",
    color:"grey"
  },
  buttonCard:{
    backgroundColor:"rgb(97, 175, 46)",
    width:"100%",
    textAlign:"center"
  }
}

class FormInventory extends Component {
  constructor(props) {
    super(props);
    this.saveImage = this.saveImage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { formData:{} , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    console.log(this.props);
  }

  componentDidMount(){
    console.log(this.props);
    if(this.props.appState.forestalUnitE)
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

  saveImage(key){

      let self = this;

      console.log("react ambit prev cordova");

      console.log(self);

      if (window.cordova) {

        navigator.camera.getPicture(image => {

          getFileContentAsBase64(image,function(base64Image){

            console.log("react ambit post cordova");

            console.log(self);

            //window.open(base64Image);
            console.log(base64Image);
            // Then you'll be able to handle the myimage.png file as base64

            self.setState({
              formData:
              {
                ...self.state.formData,
                [key]:base64Image
              }
            },()=>{
                console.log(self.state);
            });


          });


        }, null);
      } else{
        console.log("please run the cordova project");
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

    e.preventDefault();

    if(!this.props.appState.isFetching)
    {
      if(this.props.appState.forestalUnitE)
      {
        console.log("editMode");
        console.log(this.state.formData);
        console.log(this.state.formData.id);
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        //return;
        this.props.updateForestUnitPhase1(this.state.formData.id,data);
      }else{
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        data.functional_unit_id = this.props.appState.currentFunctionalUnit.id;
        this.props.createForestUnitPhase1(data);
        console.log("createMode");
      }
    }
    else{
      Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
    }

  }

  contentPage(){

    return(

      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="Codigo" maxLength="10" required/>
              </Card>
            </Col>
            {/*}<Col>
              <Card style={styles.cardInput}>
                <Input style={styles.dateInput} type="date" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>*/}
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput}placeholder="Nombre" required />
              </Card>
            </Col>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="scientific_name" value={this.state.formData.scientific_name} onChange={this.handleChangeInput}placeholder="Nombre cientifico" />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin' value={this.state.formData.origin === "1" || this.state.formData.origin === 'Nativa'  ?  1 :
                 this.state.formData.origin === "2" || this.state.formData.origin === 'Exotica'  ? 2 : ''
              } >
                  <option value="" disabled selected>Origen</option>
                  <option value="1">Nativa</option>
                  <option value="2">Exótica</option>
                </Select>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name='cap_cm' onChange={this.handleChangeInput}value={this.state.formData.cap_cm} placeholder="CAP" min="0" type="number" />
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="total_heigth_m" onChange={this.handleChangeInput}value={this.state.formData.total_heigth_m} placeholder="HT" min="0" type="number" />
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="commercial_heigth_m" onChange={this.handleChangeInput}value={this.state.formData.commercial_heigth_m} placeholder="HC" min="0" type="number" />
              </Card>
            </Col>
          </Row>
          <Row>
          <Col>
            <Card style={styles.cardInput}>
              <Select style={{width:"100%"}} name="cup_density" onChange={this.handleChangeInput} value={this.state.formData.cup_density === "1" || this.state.formData.cup_density === 'Clara'  ?  1 :
               this.state.formData.cup_density === "2" || this.state.formData.cup_density === 'Media'  ? 2 :
               this.state.formData.cup_density === "3" || this.state.formData.cup_density === 'Espesa' ? 3:''
            } required>
                <option value="" disabled selected>Densidad de copa</option>
                <option value="1">Clara</option>
                <option value="2">Media</option>
                <option value="3">Espesa</option>
              </Select>
            </Card>
          </Col>
          <Col>
            <Card style={styles.cardRadio}>
                <span style={{fontSize:"10px",color:"gray"}} >
                  Epifitas
                </span>
                <span style={{fontSize:"10px",color:"gray"}} >
                  Si
                </span>
                <Radio onChange={this.handleChangeInput}name="epiphytes" value="1" checked={this.state.formData.epiphytes === "1" || this.state.formData.epiphytes === 'Si'} modifier='material' />
                <span style={{fontSize:"10px",color:"gray"}} >
                  No
                </span>
                <Radio onChange={this.handleChangeInput}name="epiphytes" value="2" checked={this.state.formData.epiphytes === "2" || this.state.formData.epiphytes === 'No'}  modifier='material' />
            </Card>
          </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  Estado GRAL
                </span>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  Díametro de copa
                </span>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="30%">
              <Card style={styles.cardInput} >
                <Select onChange={this.handleChangeInput} style={{width:"100%"}} name='condition' value = {
                  this.state.formData.condition === "1" || this.state.formData.condition === 'Malo' ? 1:
                  this.state.formData.condition === "2" || this.state.formData.condition === 'Regular' ? 2:
                  this.state.formData.condition === "3" || this.state.formData.condition === 'Bueno' ? 3: ''
                } required>
                  <option value="" disabled selected>Fisico</option>
                  <option value="1">Malo</option>
                  <option value="2">Regular</option>
                  <option value="3">Bueno</option>
                </Select>
              </Card>
            </Col>
            <Col width="30%">
              <Card style={styles.cardInput}>
              <Select onChange={this.handleChangeInput} style={{width:"100%"}} value = {
                this.state.formData.health_status === "1" || this.state.formData.health_status === 'Malo' ? 1:
                this.state.formData.health_status === "2" || this.state.formData.health_status === 'Regular' ? 2:
                this.state.formData.health_status === "3" || this.state.formData.health_status === 'Bueno' ? 3: ''
              }  name='health_status'  required>
                <option value="" disabled selected>Sanitario</option>
                <option value="1">Malo</option>
                <option value="2">Regular</option>
                <option value="3">Bueno</option>
              </Select>
              </Card>
            </Col>
            <Col width="20%">
              <Card style={styles.cardInput}>
                <Input onChange={this.handleChangeInput}style={styles.textInput} name="x_cup_diameter_m" value={this.state.formData.x_cup_diameter_m} placeholder="X" min="0" type="number" />
              </Card>
            </Col>
            <Col width="20%">
              <Card style={styles.cardInput}>
                <Input onChange={this.handleChangeInput}style={styles.textInput} name="y_cup_diameter_m" value={this.state.formData.y_cup_diameter_m} placeholder="Y" min="0" type="number" />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="50%">
              <Card style={styles.cardLabel}>
                  <span>
                    Coordenadas
                  </span>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input onChange={this.handleChangeInput}style={styles.textInput} name="waypoint" value={this.state.formData.waypoint}  placeholder="wayPoint" type="number" required />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="100%">
              <br/>
              <Card>
                <div>
                <textarea onChange={this.handleChangeInput}style={{width:"100%",borderRadius:"10%",height:"80px"}} name="note" value={this.state.formData.note}  placeholder="Observaciones"></textarea>
                </div>
              </Card>
            </Col>
          </Row>

          <Row>

            <Row>
              <Col>
                <Card style={styles.cardLabel}>
                  <span>
                    Foto general
                  </span>
                </Card>
              </Col>
            </Row>

          <Col>
            <br/>
            <Card style={styles.greenCard} >
              <div>
                <img src={this.state.formData.general_image ? this.state.formData.general_image : placeholderImage } style={{width:"100%"}} />
              </div>
              <Button style={styles.buttonCard}
                onClick={()=>{this.saveImage("general_image")}}
              >Tomar foto</Button>
            </Card>
          </Col>
          </Row>


          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  Foto del individuo
                </span>
              </Card>
            </Col>
          </Row>

        <Row>
          <Col>
            <br/>
            <Card style={styles.greenCard} >
              <div>
                <img src={this.state.formData.id_image ? this.state.formData.id_image : placeholderImage } style={{width:"100%"}} />
              </div>
              <Button style={styles.buttonCard}
                onClick={()=>{this.saveImage("id_image")}}
              >Tomar foto</Button>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card style={styles.cardLabel}>
              <span>
                Foto de referencia
              </span>
            </Card>
          </Col>
        </Row>

      <Row>
        <Col>
          <br/>
          <Card style={styles.greenCard} >
            <div>
              <img src={this.state.formData.reference_image ? this.state.formData.reference_image : placeholderImage } style={{width:"100%"}} />
            </div>
            <Button style={styles.buttonCard}
              onClick={()=>{this.saveImage("reference_image")}}
            >Tomar foto</Button>
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

    const { isFetching , currentFunctionalUnit } = this.props.appState;

    return (
      <AppPage  title={["Formulario de ", <strong>INVENTARIO</strong>]} backButton={true} backButtonCallBack={()=>{ this.props.getForestalUnits(currentFunctionalUnit.id) }}>

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

export default  connect(mapStateToProps, { createForestUnitPhase1 ,  updateForestUnitPhase1 , getForestalUnits })(FormInventory);
