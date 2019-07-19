import React, { Component } from 'react';
//sources
import "../../css/accordion.css";
import { workingRowStyles, modalStyles } from "../../jsStyles/Styles";


//Onsen Ui
import {  List , ListItem, Col, Row, Card, ListHeader, Radio } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";
import SearchInput from "../../components/SearchInput";
import Modal from "../../components/Modal";

//container
import AppPage from '../../containers/AppPage';

//flux
import {  } from '../../flux/actions';
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

class AsistantList extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.contentPage = this.contentPage.bind(this);
  }

  renderHeader(){
    return(
      <ListHeader style={{fontSize: 15, padding:"0px"}} className="testClass">
        <Row>
          <Col width="50%" style={workingRowStyles.tableHeaders}>
              <span>Nombre</span>
          </Col>
          <Col width="25%" style={{ ...workingRowStyles.tableHeaders,
            ...workingRowStyles.tableHeadersBorders}}>
              <span>Si</span>
          </Col>
          <Col width="25%" style={{...workingRowStyles.tableHeaders,
            ...workingRowStyles.tableHeadersBorders}}>

              <span>No</span>

          </Col>
        </Row>
      </ListHeader>
    );
  }

  contentPage(currentPhase,forestalUnits){
    return(
    <div>

      <SearchInput/>

          <List
            renderHeader={this.renderHeader}>
            <div>
              <ListItem>

              <Col width="50%">
                  <span style={workingRowStyles.listText}  >Usuario</span>
              </Col>
              <Col id="modal-btn" width="25%" style={{textAlign:"center"}}>
                <Radio name="test" style={ workingRowStyles.radioCircle } />
              </Col>
              <Col width="25%" style={{textAlign:"center"}}>
                <Radio name="test" style={ workingRowStyles.radioCircle } />
              </Col>
              </ListItem>
                <div style={{
                    height: "10px",
                    backgroundColor: "#e6e7e8",
                }}>
                </div>
              </div>

          </List>:<NotFound/>
          <div style={{overflow: 'hidden',marginTop:"130%", backgroundColor: 'orange' }}>
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
    );
  }

  render() {


    const {  isFetching ,currentPhase , forestalUnits } = this.props.appState

    return (
      <AppPage  title={["Lista de ", <strong>Asistentes</strong>]} backButton={true} >

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div> :

             this.contentPage(currentPhase,forestalUnits)


          }


          <Modal title="" ModalStyles={{...styles.modalStyles,
            ...styles.modalOverride
          }}>
              <Row style={ styles.modalCell }>
                <div>MOTIVO AUSENCIA</div>
              </Row>

              <Row>
                <Col style={ styles.modalCell }>
                  <span>Incapacidad</span>
                </Col>
                <Col width="25%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
                  <Radio name="excuse"  />
                </Col>
              </Row>

              <Row>
                <Col style={ styles.modalCell }>
                  <span>Permiso</span>
                </Col>
                <Col width="25%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
                  <Radio name="excuse"  />
                </Col>
              </Row>

              <Row>
                <Col style={ styles.modalCell }>
                  <span>Injustificado</span>
                </Col>
                <Col  width="25%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
                  <Radio name="excuse"  />
                </Col>
              </Row>
          </Modal>

      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState
  };
}

export default  connect(mapStateToProps, {  })(AsistantList);
