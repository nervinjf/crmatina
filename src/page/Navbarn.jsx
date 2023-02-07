import React from 'react';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoneb from '../imagenes/NC_VersionPPAL_RGB.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbarn = () => {
  const navigate = useNavigate();

  const SignOff = () => {
    localStorage.removeItem("userData");
    navigate("/login")
  }

  return (
      <Navbar bg="dark" variant="dark" fixed="top" >
        <Container>
          {/* <Navbar.Brand to='/'><div className='logo'><img src={} alt="" width="100px"/></div></Navbar.Brand> */}
          <Nav className="me-auto">
            <div className='me-autom'>
            <div className='nav-items-'>
            <Nav.Link as={Link} to='/' >Home</Nav.Link>
            <Nav.Link as={Link} to="/Registrar" >Registrar-Tomador</Nav.Link>
            <Nav.Link as={Link} to="/Registros" >Registros</Nav.Link>
            <Nav.Link as={Link} to="/calendar" >Reportes</Nav.Link>
            <Nav.Link as={Link} to="/registeruser" >Usuario</Nav.Link>
            {/* <Nav.Link as={Link} to="/pivote" >pivote</Nav.Link> */}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </div>
            <div className='nav-items-logoff'>
              <button><i class="fa-solid fa-right-from-bracket" onClick={SignOff}></i></button>
            </div>
            </div>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default Navbarn;