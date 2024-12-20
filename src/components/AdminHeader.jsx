import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthResponseContext } from '../contexts/AuthContext'; 

const AdminHeader = ({collapsed,toggleSidebar }) => {
    const { isLoged, setIsloged } = useContext(AuthResponseContext);
    // const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear()
        setIsloged(false)
        navigate('/login')
    }

    // const toggleCollapse = () => setCollapsed(!collapsed);
    return (
        <>
            {/* Sidebar */}
            {/* <nav
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
                        <Link to={'/admin-manage-products'} className="nav-link text-white"><i className="fas fa-box me-2"></i>Manage Product</Link>
                    </li>
                    
                    <li className="nav-item mb-3">
                        <Link to={'/admin-order-history'} className="nav-link text-white"><i className="fas fa-history me-2"></i>Order History</Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-manage-contact'} className="nav-link text-white"><i className="fas fa-address-book me-2"></i>Manage Contact</Link>
                    </li>
                    <li className="nav-item mb-3">
                    <button onClick={handleLogout} className="nav-link text-white bg-transparent border-0">
                            <i className="fas fa-sign-out-alt me-2"></i>Logout
                        </button>
                    </li>
                </ul>
            </nav> */}
            <nav
                className={`bg-primary text-white p-3 position-fixed h-100 ${collapsed ? 'colapsed' : ''}`}
                style={{ zIndex: 1000, width: collapsed ? '80px' : '250px', transition: 'width 0.3s ease' }}
            >
                <div className="d-flex justify-content-between align-items-center">
                    {/* Admin title for larger screens */}
                    <h4 className={`text-center fw-bold mb-4 ${collapsed ? 'd-none' : ''}`} style={{ transition: 'all 0.3s ease' }}>
                        Admin Dashboard
                    </h4>
                    {/* Collapse button */}
                    <button onClick={toggleSidebar} className="btn btn-light d-lg-none">
                        <i className={`fas fa-${collapsed ? 'bars' : 'times'}`}></i>
                    </button>
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item mb-3">
                        <Link to={'/admin'} className="nav-link text-white">
                            <i className="fas fa-home me-2"></i>
                            <span className={collapsed ? 'd-none' : ''}>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-users'} className="nav-link text-white">
                            <i className="fas fa-users me-2"></i>
                            <span className={collapsed ? 'd-none' : ''}>Manage Users</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-manage-categories'} className="nav-link text-white">
                            <i className="fas fa-chart-line me-2"></i>
                            <span className={collapsed ? 'd-none' : ''}>Manage Categories</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-manage-products'} className="nav-link text-white">
                            <i className="fas fa-box me-2"></i>
                            <span className={collapsed ? 'd-none' : ''}>Manage Product</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-order-history'} className="nav-link text-white">
                            <i className="fas fa-history me-2"></i>
                            <span className={collapsed ? 'd-none' : ''}>Order History</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to={'/admin-manage-contact'} className="nav-link text-white">
                            <i className="fas fa-address-book me-2"></i>
                            <span className={collapsed ? 'd-none' : ''}>Manage Contact</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <button onClick={handleLogout} className="nav-link text-white bg-transparent border-0">
                            <i className="fas fa-sign-out-alt me-2"></i>
                            <span className={collapsed ? 'd-none' : ''}>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminHeader