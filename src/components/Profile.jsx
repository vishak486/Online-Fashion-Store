import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import EditProfile from './EditProfile'
import SERVER_URL from '../services/serverUrl'
import { getProfileDetailsAPI } from '../services/allApi';

const Profile = () => {

  const [userDetails, setUserDetails] = useState({username: '',email: '',phone: '',address: '',profilePic: '',
  });
  // console.log(userDetails);
  

  useEffect(()=>{
    fetchUserDetails()
  },[])

  const fetchUserDetails =async()=>{
     const token = sessionStorage.getItem("token")
        if(token)
        {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        try{
          const result= await getProfileDetailsAPI(reqHeader)
          if(result.status==200)
          {
            setUserDetails(result.data)
          }
        }
        catch(err)
        {
          console.log(err);
          
        }
        }
  }

  // if (loading) {
  //   return <div className="text-center text-primary mt-5">Loading...</div>;
  // }
  return (
    <>
      <div style={{ paddingTop: '100px' }} className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 border rounded shadow-lg p-5 bg-white">
            <h2 className="text-center fw-bold text-primary mb-4">Your Profile</h2>

            {/* Profile Image and Header */}
            <div className="text-center mb-4">
              <img
                 src={userDetails.profilePic ? `${SERVER_URL}/uploads/${userDetails.profilePic}` : 'https://via.placeholder.com/150'}
                alt="Profile"
                className="img-fluid rounded-circle mb-3 border border-4 border-primary profile-image"
                style={{ width: '150px', height: '150px', transition: 'transform 0.3s ease' }}
              />
              <h4 className="fw-bold mb-1 text-dark">{userDetails.username}</h4>
              <p className="text-muted mb-0">{userDetails.email}</p>
            </div>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Full Name</label>
              <p className="fs-5 text-muted">{userDetails.username}</p>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Email</label>
              <p className="fs-5 text-muted">{userDetails.email}</p>
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Phone Number</label>
              <p className="fs-5 text-muted">{userDetails.phone}</p>
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Address</label>
              <p className="fs-5 text-muted">{userDetails.address}</p>
            </div>

            {/* Edit Button */}
            <div className="d-flex justify-content-between mt-4">
              <EditProfile fetchUserDetails={fetchUserDetails}/>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Profile