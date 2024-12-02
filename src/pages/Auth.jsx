import React, { useState } from 'react'
import AuthWomen from '../assets/AuthWomen.jpg'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { loginAPI, registerAPI } from '../services/allApi'

const Auth = ({ insideRegister,setIsloged }) => {
  const navigate = useNavigate()
  
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", role: "user"
  })
  // console.log(userDetails);

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("Inside handleRegister");
    if (userDetails.username && userDetails.email && userDetails.password) {
      try {
        const result = await registerAPI(userDetails)
        if (result.status == 200) {
          alert("Register Successful....Please Login!!!")
          navigate('/login')
          setUserDetails({ username: "", email: "", password: "", role: "user" })

        }
        else {
          if (result.status == 406) {
            alert(result.response.status)
            setUserDetails({ username: "", email: "", password: "", role: "user" })
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      alert("Please Fill the Form!!!")
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("Inside handleLogin");
    if (userDetails.email && userDetails.password) {
      const result = await loginAPI(userDetails)
      try {
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)

          setIsloged(true)
          const userRole = result.data.user.role
          if (userRole == "admin") {
          navigate('/admin')
          }
          else if (userRole == "user") {
          navigate('/')
          }
          else {
            alert("Invalid User Role")
          }

          setUserDetails({username: "", email: "", password: ""})
        }
        else {
          alert(result.response.data)
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      alert("Please Fill the Form!!!")
    }
  }

  return (
    <>
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
                      <Form.Control value={userDetails.username} onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder="Username" />
                    </FloatingLabel>
                  }
                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                    <Form.Control value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control value={userDetails.password} onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder="Password" />
                  </FloatingLabel>
                  {
                    insideRegister ?
                      <div className="mt-3">
                        <button onClick={handleRegister} className='btn btn-primary mb-2 w-100'>Register</button>
                        <p>Already A User? Please Click here to <Link to={'/login'}>Login</Link></p>
                      </div>
                      :
                      <div className="mt-3">
                        <button onClick={handleLogin} className='btn btn-primary mb-2 w-100'>Login</button>
                        <p>New User?Click here to <Link to={'/register'}>Register</Link></p>
                      </div>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth