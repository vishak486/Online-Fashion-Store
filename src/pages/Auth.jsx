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
      const usernameRegex = /^[a-zA-Z\s]+$/;
      if (!usernameRegex.test(userDetails.username)) {
        alert("Please enter a valid Username!");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userDetails.email)) {
        alert("Please enter a valid email address!");
        return;
      }
      if (userDetails.password.trim().length < 5) {
        alert("password must be at least 5 characters long!");
        return;
      }

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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userDetails.email)) {
        alert("Please enter a valid email address!");
        return;
      }
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
      <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('https://png.pngtree.com/background/20211216/original/pngtree-red-background-shopping-cart-picture-image_1553781.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container w-75">
        <div className="shadow-lg card p-4 bg-light rounded-4">
          <div className="row align-items-center">
            <div className="col-lg-6 d-none d-lg-block">
              <img
                className="img-fluid rounded-4"
                src={AuthWomen}
                alt=""
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <h1 className="mt-2 fw-bolder text-primary text-center">
                <i className="fa-solid fa-shopping-bag me-2"></i>
                Fashion Store
              </h1>
              <h5 className="text-secondary text-center">
                Sign {insideRegister ? "Up" : "In"} to Your Account
              </h5>
              <Form>
                {insideRegister && (
                  <FloatingLabel
                    controlId="floatingInputName"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control
                      value={userDetails.username}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          username: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Username"
                      className="rounded-3"
                    />
                  </FloatingLabel>
                )}
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    placeholder="name@example.com"
                    className="rounded-3"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                >
                  <Form.Control
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    type="password"
                    placeholder="Password"
                    className="rounded-3"
                  />
                </FloatingLabel>
                {insideRegister ? (
                  <div className="mt-4">
                    <button
                      onClick={handleRegister}
                      className="btn btn-primary mb-2 w-100 rounded-pill"
                    >
                      Register
                    </button>
                    <p className="text-center">
                      Already A User? Please Click here to{" "}
                      <Link to={"/login"} className="text-primary">
                        Login
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button
                      onClick={handleLogin}
                      className="btn btn-primary mb-2 w-100 rounded-pill"
                    >
                      Login
                    </button>
                    <p className="text-center">
                      New User? Click here to{" "}
                      <Link to={"/register"} className="text-primary">
                        Register
                      </Link>
                    </p>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </>
  )
}

export default Auth