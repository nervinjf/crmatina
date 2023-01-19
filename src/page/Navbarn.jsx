import React from 'react';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoneb from '../imagenes/NC_VersionPPAL_RGB.png'
import { Link } from 'react-router-dom'

const Navbarn = () => {

  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand to='/'><div className='logo'><img src={} alt="" width="100px"/></div></Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/' >Home</Nav.Link>
            <Nav.Link as={Link} to="/Registrar" >Registrar-Tomador</Nav.Link>
            <Nav.Link as={Link} to="/Registros" >Registros</Nav.Link>
            <Nav.Link as={Link} to="/calendar" >Reportes</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
  );
};

export default Navbarn;