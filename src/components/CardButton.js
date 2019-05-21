import React, { Component } from 'react';
//sources
//import checkList from "../img/checkList.png";
//Onsen Ui
import {  Card , Icon } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components

//container
import AppPage from '../containers/AppPage';



const styles = {
  cardButton:{
    "borderLeft":"8px solid #00471c",
    "padding":"5px",
    backgroundColor:'#f1f2f2',
  },
  imageIcon:{
    "backgroundColor":"#00471c",
    "display": "flex",
    "borderRadius": "50%",
    "width": "40px",
    "height": "40px",
    "justifyContent":"center",
    "alignItems":"center"
  },
  title:{
    "fontWeight":"bold",
    "fontSize":"18px",
  },
  subTitle:{
    "fontSize":"12px"
  },
  nextButton:{
    "display": "flex",
    "borderRadius": "50%",
    "width": "30px",
    "height": "30px",
    "justifyContent":"center",
    "alignItems":"center",
    "color":"#faa61f",
    "border":"2px solid #faa61f"
  },
  buttonContainer:{
    backgroundColor:'#f1f2f2',
    "display": "flex",
    "justifyContent": "space-around",
    "alignItems": "center"
  },
  infoContainer:{
    fontSize: "12px",
    marginTop: "13px",
    backgroundColor: "#e6e7e8",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }

}

class CardButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
        <Card style={styles.cardButton}>
          <div style={styles.buttonContainer}>
            <div style={styles.imageIcon}>
                <img id='logo' className="Social-logo" style={{height:"8vmin"}}  src={this.props.imgIcon} />
            </div>
            <div>
              <span style={styles.title}>{this.props.title}</span>
              <br/>
              <span style={styles.subTitle}>{this.props.subTitle}</span>
            </div>
            <div>
              <button style={styles.nextButton}>
                <i className="fas fa-arrow-right fontAwesome"></i>
              </button>
            </div>
            <div style={{backgroundColor:"#8dc63f",width:"8px",height:"8px",borderRadius:"50%"}}>
            </div>
          </div>
          <div style={styles.infoContainer}>
            <span>{this.props.infoContainer}</span>
          </div>
        </Card>
    );
  }
}

/*const mapStateToProps = state => {
  return {
    project: state.project,
  };
}

export default  connect(mapStateToProps, { getProjects , getFunctionalUnits })(ListProjects);*/

export default CardButton;
