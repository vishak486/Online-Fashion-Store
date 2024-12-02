import React from 'react'
import Header from '../components/Header'
import EditProfile from './EditProfile'

const Profile = () => {
  return (
    <>
      <div style={{ paddingTop: '100px' }} className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 border rounded shadow-lg p-5 bg-white">
            <h2 className="text-center fw-bold text-primary mb-4">Your Profile</h2>

            {/* Profile Image and Header */}
            <div className="text-center mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="img-fluid rounded-circle mb-3 border border-4 border-primary profile-image"
                style={{ width: '150px', height: '150px', transition: 'transform 0.3s ease' }}
              />
              <h4 className="fw-bold mb-1 text-dark">John Doe</h4>
              <p className="text-muted mb-0">john.doe@example.com</p>
            </div>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Full Name</label>
              <p className="fs-5 text-muted">John Doe</p>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Email</label>
              <p className="fs-5 text-muted">john.doe@example.com</p>
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Phone Number</label>
              <p className="fs-5 text-muted">+1 (234) 567-8900</p>
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Address</label>
              <p className="fs-5 text-muted">123 Main Street, Anytown, USA</p>
            </div>

            {/* Edit Button */}
            <div className="d-flex justify-content-between mt-4">
              <EditProfile/>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Profile