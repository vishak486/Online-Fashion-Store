import React from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({isLoged,setIsloged}) => {
  const handleLogout = () => {
    sessionStorage.clear()
    setIsloged(false)
    navigate('/login')
}
  return (
    <>
      <Navbar expand="lg" className="bg-primary py-3 fixed-top">
        <Container fluid>
          <Navbar.Brand as={Link} to={'/'} ><i className="fa-solid fa-shopping-bag me-2 text-white"></i><span className='text-white fw-bolder fs-4'>Fashion Store</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className='justify-content-center'>
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}  navbarScroll>
              <Nav.Link as={Link} className='text-white' to={'/'} >Home</Nav.Link>
                {
                  isLoged && (
                    <>
                      <Nav.Link as={Link} className='text-white' to={'/cart'} ><i className="fa-solid fa-shopping-cart"></i>Cart</Nav.Link>
                      <Nav.Link as={Link} className='text-white' to={'/profile'}>Profile</Nav.Link>
                    </>
                  )
                }
               {/* Conditional rendering for Login/Logout */}
               {
               isLoged ? (
                <Nav.Link onClick={handleLogout} className='text-white'>Logout</Nav.Link>
              ) : (
                <Nav.Link as={Link} className='text-white' to={'/login'}>Login</Nav.Link>
              )
              }


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