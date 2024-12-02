import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeader = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/login')
    }
    return (
        <>
            {/* Sidebar */}
            <nav
                className="bg-primary text-white p-3 position-fixed h-100"
                style={{ width: '250px', zIndex: 1000 }}
            >
                <h4 className="text-center fw-bold mb-4">Admin Dashboard</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-3">
                        <Link to={'/admin'} className="nav-link text-white"><i className="fas fa-home me-2"></i>Dashboard</Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-users'} className="nav-link text-white"><i className="fas fa-users me-2"></i>Manage Users</Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-manage-categories'} className="nav-link text-white"><i className="fas fa-chart-line me-2"></i>Manage Categories</Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-manage-products'} className="nav-link text-white"><i className="fas fa-chart-line me-2"></i>Manage Product</Link>
                    </li>
                    
                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white"><i className="fas fa-cog me-2"></i>Settings</Link>
                    </li>
                    <li className="nav-item mb-3">
                    <button onClick={handleLogout} className="nav-link text-white bg-transparent border-0">
                            <i className="fas fa-sign-out-alt me-2"></i>Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminHeader