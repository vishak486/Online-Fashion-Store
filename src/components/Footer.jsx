import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div style={{ height: 'auto' }} className="container-fluid w-100 bg-primary text-white p-5 shadow">
  <div className="row d-flex justify-content-between">

    {/* About Section */}
    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
      <h5><i className="fa-solid fa-shopping-bag me-2"></i>Fashion Store</h5>
      <p>Your one-stop shop for the latest trends in fashion. Designed and crafted with a passion for style and quality.</p>
      <p>© 2024 Fashion Store, All rights reserved.</p>
    </div>

    {/* Quick Links Section */}
    <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
      <h5>Quick Links</h5>
      <Link className="text-white" to="/" style={{ textDecoration: 'none' }}>Home</Link><br />
      <Link className="text-white" to="/login" style={{ textDecoration: 'none' }}>Login</Link><br />
      <Link className="text-white" to="/register" style={{ textDecoration: 'none' }}>Register</Link>
    </div>

    {/* Support & Resources Section */}
    <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
      <h5>Support</h5>
      <Link className="text-white" to="/faq" style={{ textDecoration: 'none' }}>FAQ</Link><br />
      <Link className="text-white" to="/contact" style={{ textDecoration: 'none' }}>Contact Us</Link><br />
      <Link className="text-white" to="/returns" style={{ textDecoration: 'none' }}>Returns & Exchanges</Link>
    </div>

    {/* Contact Section */}
    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
      <h5>Stay Connected</h5>
      <div className="d-flex">
        <input placeholder="Enter your email here" type="text" className="form-control" />
        <button className="btn btn-warning ms-2"><i className="fa-solid fa-arrow-right"></i></button>
      </div>
      <div className="icons d-flex justify-content-between mt-3">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><i className="fa-brands fa-twitter"></i></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><i className="fa-brands fa-instagram"></i></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><i className="fa-brands fa-facebook"></i></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><i className="fa-brands fa-linkedin"></i></a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><i className="fa-brands fa-github"></i></a>
      </div>
    </div>

  </div>
  <p className="text-center mt-3">© 2024 Fashion Store. Crafted with love by the Fashion Team.</p>
</div>


    </>
  )
}

export default Footer