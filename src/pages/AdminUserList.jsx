import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import { getAllUserAPI, userDeleteAPI } from '../services/allApi'


const AdminUserList = () => {
    const [userDetails,setUserDetails]=useState([])

    useEffect(()=>{
        getUserDetails()
    },[])
    console.log(userDetails);
    

    const getUserDetails=async()=>{
        const token=sessionStorage.getItem("token")
        console.log(token);
        
        if(token)
        {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
              }
            try
            {
                const result= await getAllUserAPI(reqHeader)
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

    const deleteUserDetails=async(id)=>{
        const token=sessionStorage.getItem("token")
        if(token)
        {
            const reqHeader={Authorization:`Bearer ${token}`}
            try
            {
                await userDeleteAPI(id,reqHeader)
                getUserDetails()
            }
            catch(err)
            {
                console.log(err);
                
            }
        }
    }
    return (
        <>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                <AdminHeader />
                <div className="flex-grow-1 p-4 bg-light" style={{ marginLeft: '250px', transition: 'margin-left 0.3s' }} >
                    {/* Table */}
                    <div className="mt-5">
                        <h4 className="text-primary fw-bold mb-3">User List</h4>
                        <div style={{ overflowX: 'auto' }} className="table-responsive">
                            <table className="table table-striped table-hover shadow-sm bg-white">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Photo</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center">No users found</td>
                                        </tr>
                                    ) : (
                                        userDetails.map((user, index) => (
                                            <tr key={user._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img src={user.profilePhoto || "https://via.placeholder.com/70"} 
                                                         alt={user.username} 
                                                         className="img-fluid rounded" 
                                                         style={{ height: '50px', width: '70px' }} />
                                                </td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.address}</td>
                                                <td>
                                                    <button 
                                                        className='btn btn-outline-danger btn-md' 
                                                        onClick={() => deleteUserDetails(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AdminUserList