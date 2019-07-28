
import React, { Component } from 'react';
//sources
import "../../../css/accordion.css";
import { workingRowStyles, modalStyles } from "../../../jsStyles/Styles";


//Onsen Ui
import {  List , ListItem, Col, Row, Checkbox, ListHeader, Radio, Input, Modal, Button} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import Loading from "../../../components/Loading";

//container
import AppPage from '../../../containers/AppPage';

//flux
import { getListUsers, getSSTAssistants, getSSTVisitors, goToAssistantForm, getSSTVisitor, getSSTVisitorAssistants } from '../../../flux/actions';
import { connect } from 'react-redux';

//const styles = workingRowStyles;

const styles =  {
  ...workingRowStyles,
  ...modalStyles
};

styles.modalOverride = {

  header:{backgroundColor:"white"},
  body:{backgroundColor:"white"}

}

styles.modalCell = {
  backgroundColor: "#E5E5E5",
  padding: "5%",
  textAlign: "center",
  color: "#25315a",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  borderStyle: "solid",
  borderWidth: "5px",
  borderColor: "white"
}

styles.modalColumn = {
  borderStyle: "solid",
  borderWidth: "0px -1px",
  borderColor: "white"
}


workingRowStyles.tableHeaders = {
    backgroundColor: "rgb(0, 104, 40)",
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
}

workingRowStyles.tableHeadersBorders = {
  borderStyle: "solid",
  borderWidth: "0px 1px"
}

workingRowStyles.radioCircle = {
  borderStyle: "solid",
  borderWidth: "5px",
  borderRadius: "50%"
}

workingRowStyles.listText = {
  color: "#205286",
  fontWeight: "bold"
}

class visitantList extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalVisitant:false,
      formData:[],
      modalData:[]
    }
    this.renderHeader = this.renderHeader.bind(this);
  }
  add(){
    let { modalData, formData } = this.state;
    let visitors = [
      ...modalData,
      ...formData,
      {
        //visitor_id: visitor_id,
        notes :  formData.notes
      }
    ]
    this.setState({ modalData : visitors });
    console.log(modalData);
    console.log(visitors);
  }
  componentDidMount(){
    this.props.getList(this.props.project_id);
    this.props.getListUsers(this.props.project_id)
  }
  handleChangeInput(event){
    if(event.target.name && event.target.value.length > -1) {
       this.setState({
           formData: {
               ...this.state.b,
               [event.target.name] : event.target.value
           }
         }
       );
    }
    if (event.target.value[0] == "=") event.target.value = event.target.value.substr(1)
  }
  onOpenNote(){
    this.setState({modalVisitant: true})
  }
  onCloseAssiten(){
    this.setState({modalVisitant: false})
  }
  onCreateAssiten(){
    console.log(this.state.formData);
    this.setState({modalVisitant: true})
  }
  onClickVisitorForm(memo) {
    console.log(memo);
    this.props.getSSTVisitor(memo, 'update')
    this.props.goToAssistantForm()
  }

  onClickSSTCreate() {
    this.props.getSSTVisitor({})
    this.props.goToAssistantForm()
  }
  renderHeader(){
    return(
      <ListHeader style={{fontSize: 15, padding:"0px"}} className="testClass">
        <Row>
          <Col width="70%" style={workingRowStyles.tableHeaders}>
              <span>Nombre</span>
          </Col>
          <Col width="30%" style={{ ...workingRowStyles.tableHeaders,
            ...workingRowStyles.tableHeadersBorders}}>
              <span>Notas</span>
          </Col>
        </Row>
      </ListHeader>
    );
  }

  render() {
    let  {listSSTVisitors} = this.props.appState,  listData = []
    if (listSSTVisitors) listData.push(...listSSTVisitors);
    return (
      <AppPage  title={["Lista de ", <strong>Visitantes</strong>]} backButton={true} >
        <div>
          <div style={styles.formContainer}>
            <div className="login-form" >
              <div className="group" style={styles.searchInputContainer}>
                  <input id="search" /*value={searchName} name="buscador" onChange={e => this.setState({ searchName: e.target.value })} */className="input fontAwesome" placeholder="Buscar" type="text"   style={{fontFamily:'Arial', marginTop:"8px", width:"9GO_TO_MACHINERY_LIST0%", height:"10px"}} /><br />
                <div style={styles.searchButton} onClick={()=>{this.onClickSSTCreate()}}>
                    <span className="fas fa-plus fontAwesome" ></span>
                </div>
              </div>
          </div>
        </div>
            <List renderHeader={this.renderHeader}>
            {
              listData.map((memo, i) => {
                  return  (
                  <div>
                    <ListItem>

                    <Col width="70%">
                      <div onClick={()=>{this.onClickVisitorForm(memo)}} className="center" style={styles.mainListItem}>
                        <span style={styles.counter}>{i+1}</span>
                        <span style={styles.projectName}>{memo.name}</span>
                        <div>
                          <span style={styles.projectInfo}>{memo.state}</span>
                        </div>
                        <div style={styles.buttonContainer}>
                          <div style={styles.ProjectButton}>
                            <i className="fas fa-arrow-right fontAwesome"></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col width="30%" style={{textAlign:"center"}}>
                        <div onClick={()=>{this.onOpenNote()}}>
                          <div style={styles.ProjectButton}>
                            <i className="fa fa-pencil fontAwesome"></i>
                          </div>
                        </div>
                    </Col>
                    </ListItem>
                      <div style={{
                          height: "10px",
                          backgroundColor: "#e6e7e8",
                      }}>
                      </div>
                    </div>
                  );
              })
            }
            </List>
          <div style={{overflow:'hidden',marginTop:"130%", backgroundColor: 'orange' }}>
            <div className="group" style={{...styles.searchInputContainer, "justify-content":"left"}}>
              <div style={styles.buttonContainer}>
                <div style={styles.ProjectButton} >
                  <i className="fas fa-pencil-alt fontAwesome"></i>
                </div>
              </div>
              <div style={{ ...styles.buttonContainer, 'margin-left':'50%' }}>
                <div style={styles.ProjectButton}>
                  <i className="far trash-alt fontAwesome"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.modalVisitant()}

      </AppPage>
    );
  }

  modalVisitant(){
    return(
      <Modal style={{padding:'0 30px 0px 30px'}} isOpen={this.state.modalVisitant} animation="fade">
        <Row style={ styles.modalCell }>
          <div>NOTAS</div>
        </Row>
        <Row>
          <Col height="1000px" width="100%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
            <textarea width="1500px" name="notes"  onChange={this.handleChangeInput.bind(this)} />
          </Col>
        </Row>
        <Row>
          <Col  width="50%" style={ styles.modalCell }>
            <Button onClick={this.add.bind(this)} modifier="large--cta">
                Registrar
            </Button>
          </Col>
          <Col  width="50%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
            <Button onClick={()=>{this.onCloseAssiten()}}   modifier="large--cta">
                Cerrar
            </Button>
          </Col>
        </Row>
      </Modal>
    )
  }
}
const mapStateToProps = state => {

  return {
    navigation: state.navigation,
    appState: state.appState,
    project_id: state.appState.project_data.id
  };
}
//report_date
const mapDispatchToProps = (dispatch) => {
  return {
    getList: (id) => {dispatch(getSSTVisitors(id))},
    getSSTVisitorAssistants:(visitor)=>{dispatch(getSSTVisitorAssistants(visitor))},
    goToAssistantForm: ()=> {dispatch(goToAssistantForm())},
    getListUsers: (id)=> {dispatch(getListUsers(id))},
    getSSTVisitor: (visitor)=> {dispatch(getSSTVisitor(visitor))}

  }
}

export default  connect(mapStateToProps,mapDispatchToProps )(visitantList);
