import React, { Component } from 'react';
import {  Col, Row, Card, Button} from 'react-onsenui';

import "../css/ballon.css";


class NotFound extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="ballonBackg">
        <br/>
        <Card style={{textAlign:"center"}}>
          <span >
            ¡ No hay datos que mostrar !
          </span>
          <div class="ballaozin">
          </div>
        </Card>
      </div>
    );
  }
}

export default NotFound;
