import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import { fetchAdminDashboardAPI } from '../services/allApi';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        outOfStockProducts: 0,
        pendingOrders: 0,
        pendingContacts: 0,
    });
    const [collapsed, setCollapsed] = useState(false);

    console.log(stats);

    useEffect(() => {
        getAdminDashboard()
    }, [])

    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Toggle the collapsed state
    };

    const getAdminDashboard = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await fetchAdminDashboardAPI(reqHeader)
                if (result.status == 200) {
                    setStats(result.data)
                }
            }
            catch (err) {
                console.log(err);
            }
        }

    }
    return (
        <>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                <AdminHeader  collapsed={collapsed} toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <div className="flex-grow-1 p-4 bg-light"  style={{
                        marginLeft: collapsed ? '70px' : '250px', // Change margin based on collapsed state
                        transition: 'margin-left 0.3s ease', // Smooth transition for margin
                    }} >
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold text-primary">Welcome, Admin!</h2>

                    </div>

                    {/* Dashboard Cards */}
                    <div className="row g-4 text-center">
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-primary fw-bold">Users</h5>
                                    <p className="card-text">{stats.users} Active Users</p>
                                    <i className="fas fa-users fa-3x text-primary"></i>
                                    <div className='mt-3'>
                                        <Link to={'/admin-users'} className='btn btn-primary' >View Users</Link>
                                    </div>                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-success fw-bold">Total Products</h5>
                                    <p className="card-text">{stats.products} Products</p>
                                    <i className="fas fa-boxes fa-3x text-success"></i>
                                    <div className='mt-3'>
                                        <Link to={'/admin-manage-products'} className='btn btn-primary' >View Products</Link>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-warning fw-bold">Out of Stock</h5>
                                    <p className="card-text">{stats.outOfStockProducts} Products</p>
                                    <i className="fas fa-exclamation-circle fa-3x text-warning"></i>
                                    <div className='mt-3'>
                                        <Link to={'/admin-manage-products'} className='btn btn-primary' >View Products</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-danger fw-bold">Pending Orders</h5>
                                    <p className="card-text">{stats.pendingOrders} Orders</p>
                                    <i className="fas fa-shopping-cart fa-3x text-danger"></i>
                                    <div className='mt-3'>
                                        <Link to={'/admin-order-history'} className='btn btn-primary' >View Orders</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-info fw-bold">Pending Contacts</h5>
                                    <p className="card-text">{stats.pendingContacts} Contacts</p>
                                    <i className="fas fa-envelope fa-3x text-info"></i>
                                    <div className='mt-3'>
                                        <Link to={'/admin-manage-contact'} className='btn btn-primary' >View Contacts</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </>
    )
}

export default AdminDashboard