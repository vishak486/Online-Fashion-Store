import React from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-primary py-3 fixed-top">
        <Container fluid>
          <Navbar.Brand  href='/' ><i className="fa-solid fa-shopping-bag me-2 text-white"></i><span className='text-white fw-bolder fs-4'>Fashion Store</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className='justify-content-center'>
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}  navbarScroll>
              <Nav.Link className='text-white' href="#action1">Home</Nav.Link>
              <Nav.Link className='text-white' href="#action2"><i className="fa-solid fa-shopping-cart"></i>Cart</Nav.Link>
              <Nav.Link className='text-white' href="#action2">Profile</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header