import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthResponseContext } from '../contexts/AuthContext';

const Header = () => {
  const { isLoged, setIsloged } = useContext(AuthResponseContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoged) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        setUsername(user.username.split(" ")[0]);

        // Check if the user is an admin and has navigated out of the admin path
        if (user.role === "admin" && !location.pathname.startsWith('/admin')) {
          sessionStorage.clear();
          setIsloged(false);
          navigate('/login');
        }
      } else {
        setUsername("");
      }
    }
  }, [isLoged, location, setIsloged, navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsloged(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="lg" className="bg-primary py-3 fixed-top">
        <Container fluid>
          <Navbar.Brand as={Link} to={'/'}>
            <i className="fa-solid fa-shopping-bag me-2 text-white"></i>
            <span className="text-white fw-bolder fs-4">Fashion Store</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-center">
            <Nav className="ms-auto px-5 fs-5 my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} className="text-white" to={'/'}>Home</Nav.Link>
              <Nav.Link as={Link} className="text-white" to={'/products'}>Products</Nav.Link>
              <Nav.Link as={Link} className="text-white" to={'/about'}>About</Nav.Link>
              <Nav.Link as={Link} className="text-white" to={'/contact'}>Contact</Nav.Link>

              {isLoged && (
                <>
                  <Nav.Link as={Link} className="text-white" to={'/cart'}>
                    <i className="fa-solid fa-shopping-cart"></i>Cart
                  </Nav.Link>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Hi, {username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={'/orderHistory'}>Order Summary</Dropdown.Item>
                      <Dropdown.Item as={Link} to={'/profile'}>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}

              {!isLoged && (
                <Nav.Link as={Link} className="text-white" to={'/login'}>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
