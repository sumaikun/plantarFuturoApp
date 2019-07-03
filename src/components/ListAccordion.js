import React, { Component } from 'react';
//sources
import checkList from "../img/checkList.png";
import tree from "../img/tree.png";
import chart from "../img/chart.png";
import plant from "../img/plant.png";
import "../css/accordion.css";
//Onsen Ui
import { List, ListItem } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components

//container

const styles = {
  mainListItem:{
    display: "flex",
    justifyContent: "space-between"
  },
  counter:{
    color: "#e6e7e8"
  },
  projectName:{
    color: "#352865",
    fontSize: "15px",
    //fontWeight: "bold"
  },
  projectInfo:{
    color: "#e6e7e8",
    fontSize: "10px",
  },
  ProjectButton:{
    color:"orange",
    fontWeight:"bold",
    fontSize:"18px"
  },
  buttonContainer:{
    backgroundColor: "#f1f2f2",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  }

}

class ListAccordion extends Component {
  constructor(props) {
    super(props);


    let self = this;


    window.fn = {};
    window.fn.toggle = function(el) {

        if(self.props.phase == 4 )
        {
          return;
        }

        el.classList.toggle("active");
        el.nextElementSibling.classList.toggle("show");
    }
  }

  render() {


    return (
      <List key={1}>
        <ListItem key={1} tappable class="accordion" onclick="fn.toggle(this)">
          <div className="center" style={styles.mainListItem}>
            <span style={styles.counter}>{this.props.counter}</span>
            <div className={'list__accordion__center'}>
              <span className={'project-list-title-font'} style={styles.projectName}>{this.props.projectName}</span>
              <span style={styles.projectInfo}>{this.props.projectInfo}</span>
            </div>
            <div style={styles.buttonContainer}>
              <div style={styles.ProjectButton}><span>...</span></div>
            </div>
          </div>
        </ListItem>
        <div className="panel">
          {this.props.children}
        </div>
      </List>
    );
  }
}

/*const mapStateToProps = state => {
  return {
    project: state.project,
  };
}

export default  connect(mapStateToProps, { getProjects , getFunctionalUnits })(ListProjects);*/

export default ListAccordion;
