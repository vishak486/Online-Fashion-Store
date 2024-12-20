import React, { useState } from 'react'
import { addContactAPI } from '../services/allApi';

const Contact = () => {
  const [contactDetails,setContactDetails]=useState({
    username:"",email:"",message:""
  })
  
  // console.log(contactDetails);

  const handleAddContact=async(e)=>{
    e.preventDefault()
    const {username,email,message}=contactDetails
    if(username && email && message)
    {
      const usernameRegex = /^[a-zA-Z\s]+$/;
      if (!usernameRegex.test(contactDetails.username)) {
        alert("Please enter a valid Username!");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactDetails.email)) {
        alert("Please enter a valid email address!");
        return;
      }
        try
        {
          const result=await addContactAPI(contactDetails)
          if(result.status==200)
          {
            alert("Contact Added Successfully");
            setContactDetails({username:"",email:"",message:""})
          }
        }
        catch(err)
        {
          console.log(err);
        }
    }
    else
    {
      alert("Please fill for the completely")
    }
  }
  return (
    <div style={{ paddingTop: "100px" }} className="container my-5 px-4 mx-auto">
       <div className="row justify-content-center align-items-center text-dark bg-light rounded shadow-lg p-4">
        <div className="col-lg-6 text-center">
          <img
            className="img-fluid rounded"
            src="https://thumbs.dreamstime.com/b/portrait-stunning-young-girl-shop-bags-look-empty-space-glossy-dress-isolated-vibrant-red-color-background-portrait-337494185.jpg"
            alt="Contact Us Fashion Store"
            style={{ maxHeight: "650px" }}
          />
        </div>
        <div className="col-lg-6">
          <h1 className="fw-bold mb-3 text-primary">Get in Touch</h1>
          <p className="lead text-primary">
            Have questions or need assistance? Fill out the form below, and
            we’ll get back to you as soon as possible.
          </p>
          <form>
            {/* Username Field */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-bold text-primary">
                Username
              </label>
              <input
                value={contactDetails.username}
                onChange={(e)=>setContactDetails({...contactDetails,username:e.target.value})}
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold text-primary">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                value={contactDetails.email}
                onChange={(e)=>setContactDetails({...contactDetails,email:e.target.value})}
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Field */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-bold text-primary">
                Message
              </label>
              <textarea
                className="form-control"
                value={contactDetails.message}
                onChange={(e)=>setContactDetails({...contactDetails,message:e.target.value})}
                id="message"
                rows="5"
                placeholder="Write your message here"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button onClick={handleAddContact} type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact