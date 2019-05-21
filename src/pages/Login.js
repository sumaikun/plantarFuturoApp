import React, { Component } from 'react';

//images
import logo from '../img/Logo.png';
import fbicon from '../img/fbIcon.png';
import insicon from '../img/InstagramIcon.png';
import youicon from '../img/youtubeIcon.png';

//css
import '../css/App.css';
import '../css/Login.css';

//components or pages
//Libraries
import ReactResizeDetector from 'react-resize-detector';
//import { connect } from 'react-redux';

//Onsen Ui
import {  Page,  Button,  Input, Icon, ProgressBar } from 'react-onsenui';
import Ons from 'onsenui';


//flux
import { fetchLogin } from '../flux/actions';
import { connect } from 'react-redux';


//helpers
import { formValidation } from '../helpers/formValidation';

class Login extends Component {

  constructor(props)
  {
    super(props);
    this.makeLogin = this.makeLogin.bind(this);

  }

  componentDidMount() {
    const backgContainer = document.getElementById('backgContainer');
    console.log(backgContainer.clientHeight);
    this.setState({ backgHeight:backgContainer.clientHeight });
  }



  makeLogin(){

    if(!this.props.appState.isFetching)
    {
      let validation = formValidation([
        {
          ref:this.userName,
          name:"usuario"
        },
        {
          ref:this.userPassword,
          name:"Contraseña"
        }
      ]);

      validation ?  this.props.fetchLogin({
        email: this.userName.value,
        password: this.userPassword.value
      }) : false;

    }


  }



  onResize = (width,height) =>{
    const backgContainer = document.getElementById('backgContainer');


    if(height < this.state.backgHeight)
    {
      //console.log("prevent that resize");
      backgContainer.style.height = this.state.backgHeight+"px";
    }

  }

  render() {

    const { isFetching } = this.props.appState;

    return (
      <Page id="login">

        { isFetching ? <ProgressBar indeterminate  /> : null }

           <div className="login-wrap" id="backgContainer" style={{backgroundSize:'cover',overflow:'hidden'}} >
            <div style={{marginTop:"-25px",height:"120%",backgroundColor:"#5a5b5d42"}}>
              <div className="login-html">
              <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
               <div className="App">
                <br/>
                <img id='logo' className="App-logo" src={logo} />
                  <div id='logoTitle'>
                    <br/>
                    <span style={{color:'white'}} >Bienvenidos a <b>PLANTAR FUTURO</b>{" "}
                      <i class="fas fa-tree"></i>
                    </span>
                  </div>
                  <br/><br/>
                </div>
                <div className="login-form">
                  <div className="group">

                    <input className="input" placeholder="&#61447; correo" type="email" ref={(input) => this.userName = input}  style={{fontFamily:'Arial, FontAwesome'}} />
                  </div>
                  <div className="group">
                    <input  className="input fontAwesome" placeholder="&#61475; Contraseña" type="password" ref={(input) => this.userPassword = input}  />
                  </div>
                  <div className="group">
                    <Button id='signIn' onClick={this.makeLogin}  modifier="large"
                      style={{fontSize:"24px",padding:'5px'}}
                      ><b>Ingresar</b></Button>
                  </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-evenly', marginTop:'25%'}}>
                      <img id='logo' className="Social-logo"  src={fbicon} />
                      <img id='logo' className="Social-logo" src={insicon} />
                      <img id='logo' className="Social-logo" src={youicon} />
                </div>
              </div>
            </div>
          </div>
        </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState
  };
}

export default  connect(mapStateToProps, { fetchLogin })(Login);
