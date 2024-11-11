import React from 'react'
import AuthWomen from '../assets/AuthWomen.jpg'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Auth = ({ insideRegister }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='img-fluid' src={AuthWomen} alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className='mt-2 fw-bolder'><i className="fa-solid fa-shopping-bag "></i>Fashion Store</h1>
              <h5>Sign {insideRegister ? "Up" : "In"} to Your Account</h5>
              <Form>
                {
                  insideRegister && 
                  <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3" >
                  <Form.Control type="text" placeholder="Username" />
                </FloatingLabel>
                }
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister ?
                  <div className="mt-3">
                      <button className='btn btn-primary mb-2 w-100'>Register</button>
                      <p>Already A User? Please Click here to <Link to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className="mt-3">
                      <button className='btn btn-primary mb-2 w-100'>Login</button>
                      <p>New User?Click here to <Link to={'/register'}>Register</Link></p>
                  </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth