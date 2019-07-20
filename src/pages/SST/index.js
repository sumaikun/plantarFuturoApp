import React, { Component } from 'react';
import moment from 'moment'


//sources
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";


//Onsen Ui
import {  Col, Row, Card, Button, List, ListItem} from 'react-onsenui';
import Ons from 'onsenui';

//components
import ListAccordion from "../../components/ListAccordion";
import CardOptionButton from "../../components/CardOptionButton";

//container
import AppPage from '../../containers/AppPage';

//flux
import { goToSSTForm, getSST, getSSTForm} from '../../flux/actions';
import { connect } from 'react-redux';
import Styles from './styles'


class ListSSTByProject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode:false,
      idToModify:null,
    }
  }
  componentDidMount(){
    this.props.getList()
  }
  render() {
    let {listSST}= this.props.appState
    if (!listSST) return null;
    return (
      <AppPage title={[<strong>{"Lista de informes SST"}</strong>]} backButton={true} backButtonCallBack={()=>{  }}><br / >
        <div  style={{display:"flex",justifyContent:"center"}} >
          <div style={{width:"95%"}} >
          {
            listSST.map((memo, i) => {
                return  (
                  <div  style={{marginBottom: "1em"}} key={i} onClick={()=>{this.onClickSSTForm()}}>
                    <ListAccordion counter={i + 1} projectName={moment(memo.report_date).format("DD/MM/YYYY")} projectInfo={""} />
                  </div>
                );
            })
          }
          </div>
        </div>
      </AppPage>
    );
  }
  onClickSSTForm() {

    this.props.goToSSTForm()
  }
}

const mapStateToProps = state => {
  console.log(state.appState);
  return {
    navigation: state.navigation,
    appState: state.appState
  };
}
//report_date
const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => {getSST()},
    getForm: (sst) => {getSSTForm(sst)},
    goToSSTForm: ()=> {dispatch(goToSSTForm())}
  }
}

export default  connect(mapStateToProps,mapDispatchToProps )(ListSSTByProject);
