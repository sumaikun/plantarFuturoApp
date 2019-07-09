import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import placeholderImage from "../../img/image-placeholder.png";

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
import { createForestUnitPhase3,
   updateForestUnitPhase3,
   getForestalUnits,
   addOfflineForestUnitP3,
   updateOfflineForestUnitP3,
   goBack
   } from '../../flux/actions';
//helper

import { getFileContentAsBase64 , getInputFileBase64 } from '../../helpers/imageHandler';

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
  },
  textInCard:{
    fontSize:"14px",
    textAlign:"center",
    color:"grey",
    fontWeight:"bold",
    borderStyle: "dotted"
  }
}

class FormCompensation extends Component {
  constructor(props) {
    super(props);
    this.saveImage = this.saveImage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { formData:{} , selectSearch:{} ,
      projectInfo:this.props.appState.selectedProject };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
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

  fileUpload(key,e){

     const file = e.target.files[0];
     const  fileType = file['type'];
     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
     if (validImageTypes.includes(fileType)) {
        console.log(key);
        let self = this;
        getInputFileBase64(e.target.files[0]).then(
          base64Image => {

          //console.log(base64Image);

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
    }
    else{
      e.preventDefault();
      Ons.notification.alert({title:"",message:"No se pueden subir otros archivos que no sean imagenes"});
    }
  }

  saveImage(){

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
                general_image:base64Image
              }
            },()=>{
                console.log(self.state);
            });


          });


        }, null,{
            quality : 40,
            correctOrientation : true
        });
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

    if (event.target.value[0] == "="){
      event.target.value = event.target.value.substr(1)
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
        //return;
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;

        if(this.props.appState.currentFunctionalUnit.ToSynchro)
        {
          Ons.notification.alert({title:"",message:"Esta registrando datos a una Unidad fuctional no sincronizada se guardara en memoria hasta la sincronización"});
          this.props.updateOfflineForestUnitP3(data);
          this.props.goBack();
          return;
        }


        this.props.updateForestUnitPhase3(this.state.formData.id,data);
      }else{
        let data = this.state.formData;
        data.functional_unit_id = this.props.appState.currentFunctionalUnit.id;
        data.user_id = this.props.appState.user.id;

        if(this.props.appState.currentFunctionalUnit.ToSynchro)
        {
          data.created_at = new Date().toISOString().split('T')[0];
          Ons.notification.alert({title:"",message:"Esta registrando datos a una Unidad fucional no sincronizada se guardara en memoria hasta la sincronización"});
          this.props.addOfflineForestUnitP3(data);
          this.props.goBack();
          return;
        }

        this.props.createForestUnitPhase3(data);
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

        {/*<Row>
          <Col>
            <Card style={styles.cardLabel}>
              <span>
                INFORMACIÓN GENERAL
              </span>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col width="25%">
            <Card style={styles.cardLabel}>
              <span>
                Autoridad
              </span>
            </Card>
          </Col>
          <Col width="25%">
            <Card style={{...styles.textInCard, 'fontSize':"8px"}}>
              {this.state.projectInfo.enviromental_control}
            </Card>
          </Col>
          <Col width="50%">
            <Card style={{...styles.cardLabel, "text-align":"center" }}>
              <span>
                INFORMACIÓN GENERAL
              </span>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card style={styles.textInCard}>
              {this.state.projectInfo.name}
            </Card>
          </Col>
          <Col width="50%">
            <Card style={styles.textInCard}>
              {this.state.projectInfo.administrative_act}
            </Card>
          </Col>
        </Row>


        <Row>
          <Col>
            <Card style={styles.textInCard}>
              Este: {this.state.projectInfo.east_coord}
            </Card>
          </Col>
          <Col>
            <Card style={styles.textInCard}>
              Norte: {this.state.projectInfo.north_coord}
            </Card>
          </Col>
          <Col>
            <Card style={styles.textInCard}>
              Plantar Futuro
            </Card>
          </Col>
          <Col>
            <Card style={styles.textInCard}>
              {this.state.projectInfo.inspector}
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card style={styles.textInCard}>
              {this.state.projectInfo.responsible}
            </Card>
          </Col>
        </Row>*/}

          <Row>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="Codigo" maxLength="10" required/>
              </Card>
            </Col>
          </Row>


          <Row>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="compensation_site" value={this.state.formData.compensation_site} onChange={this.handleChangeInput} maxLength={10}  placeholder="Sitio de compensacion"  required/>
              </Card>
            </Col>
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
                <Input onChange={this.handleChangeInput}style={styles.textInput} name="waypoint" value={this.state.formData.waypoint}  placeholder="wayPoint" type="text" required />
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
                    Evidencias Fotográficas
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
              <Row>
                <Button style={styles.buttonCard}
                  onClick={this.saveImage}
                >Tomar foto</Button>
                <label className="fileContainer" style={{ "font-size": "17px",
                  color: "white"
                }}>
                  Subir archivo
                  <input  type="file" onChange={(event)=>{this.fileUpload("general_image",event)}}
                     />
                </label>
              </Row>
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
      <AppPage  title={["Formulario de ", <strong>COMPENSACIÓN</strong>]} backButton={true} backButtonCallBack={()=>{ this.props.getForestalUnits(currentFunctionalUnit.id) }}>

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

export default  connect(mapStateToProps, { createForestUnitPhase3,
    updateForestUnitPhase3,
    getForestalUnits,
    addOfflineForestUnitP3,
    updateOfflineForestUnitP3,goBack })(FormCompensation);
