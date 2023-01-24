import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = props => (
  <Navbar bg="dark" variant="dark" style={{paddingLeft: "20px"}}>
    <Navbar.Brand href="#home">Get Quotation for car</Navbar.Brand>
  </Navbar>
);

export default Header
