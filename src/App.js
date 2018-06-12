import React, { Component } from 'react';
import SelectedShoppingCart from './SelectShoppingCart';
import * as cartData from './cart-data';
import phLogo from './payment-highway-logo.png';

class App extends Component {
  render() {
    return (
      <div >
        <nav className="navbar navbar-light bg-light" style={{height: "70px", backgroundColor: "#f8f8f8"}}>
           <a className="navbar-brand" href="https://paymenthighway.fi/en/">
             <img src={phLogo} style={{height: "45px", width: "auto"}} alt="Payment Highway"/>
           </a>
        </nav>
        <SelectedShoppingCart {...cartData}/>
      </div>
    );
  }
}

export default App;
