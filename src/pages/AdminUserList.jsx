import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import { getAllUserAPI, userDeleteAPI } from '../services/allApi'
import SERVER_URL from '../services/serverURL'
import { Table } from 'react-bootstrap'

const AdminUserList = () => {
    const [userDetails, setUserDetails] = useState([])
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        getUserDetails()
    }, [])
    // console.log(userDetails);

    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Toggle the collapsed state
    };

    const getUserDetails = async () => {
        const token = sessionStorage.getItem("token")
        console.log(token);

        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllUserAPI(reqHeader)
                if (result.status == 200) {
                    setUserDetails(result.data)
                }
            }
            catch (err) {
                console.log(err);

            }
        }
    }

    const deleteUserDetails = async (id) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = { Authorization: `Bearer ${token}` }
            try {
                await userDeleteAPI(id, reqHeader)
                getUserDetails()
            }
            catch (err) {
                console.log(err);

            }
        }
    }
    return (
        <>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                <AdminHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <div className="flex-grow-1 p-4 bg-light" style={{
                    marginLeft: collapsed ? '70px' : '250px', // Change margin based on collapsed state
                    transition: 'margin-left 0.3s ease', // Smooth transition for margin
                }} >
                    {/* Table */}
                    <div className="mt-5">
                        <h4 className="text-primary fw-bold mb-3">User List</h4>
                        <div className="table-responsive"style={{ overflowX: 'auto' }}>
                            <Table responsive striped bordered hover className="table table-striped table-hover shadow-sm bg-white">
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
                                                    <img src={user.profilePic ? `${SERVER_URL}/uploads/${user.profilePic}` : "https://via.placeholder.com/70"}
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
                            </Table>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}

export default AdminUserList