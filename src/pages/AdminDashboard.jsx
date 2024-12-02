import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'

const AdminDashboard = () => {
   
    return (
        <>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                <AdminHeader/>

                {/* Main Content */}
                <div  className="flex-grow-1 p-4 bg-light"  style={{ marginLeft: '250px', transition: 'margin-left 0.3s' }} >
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold text-primary">Welcome, Admin!</h2>
                        
                    </div>

                    {/* Dashboard Cards */}
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-primary fw-bold">Users</h5>
                                    <p className="card-text">1,234 Active Users</p>
                                    <i className="fas fa-users fa-3x text-primary"></i>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-success fw-bold">Sales</h5>
                                    <p className="card-text">$12,345 in Sales</p>
                                    <i className="fas fa-chart-line fa-3x text-success"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-danger fw-bold">Issues</h5>
                                    <p className="card-text">12 Pending Issues</p>
                                    <i className="fas fa-exclamation-circle fa-3x text-danger"></i>
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