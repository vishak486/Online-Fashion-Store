import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { getAdminOrderHistoryAPI, updateOrderStatusAPI } from '../services/allApi';
import SERVER_URL from '../services/serverURL'
import AdminHeader from '../components/AdminHeader'

const AdminOrderHistory = () => {
    const [searchKey, setSearchKey] = useState('');
    const [show, setShow] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    

    const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order
    const [status, setStatus] = useState(''); // Track status value for modal
   
    console.log(searchKey);
    
    const [orders, setOrders] = useState([]);
    console.log(orders);


    useEffect(() => {
        fetchAdminOrders();
    }, [searchKey]);

    const handleClose = () => {
        setShow(false);
        setSelectedOrder(null);
        setStatus('');
    }
    const handleShow = (order) => {
        setSelectedOrder(order); // Set the selected order
        setStatus(order.status); // Set current status
        setShow(true);
    }
    const fetchAdminOrders = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = { Authorization: `Bearer ${token}` };
            try {
                const result = await getAdminOrderHistoryAPI(searchKey,reqHeader);
                console.log("API Response:", result.data);
                if (result.status === 200) {
                    setOrders(result.data);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleUpdateStatus = async () => {
        const token = sessionStorage.getItem('token');
        if (token) 
        {
            const reqHeader = { Authorization: `Bearer ${token}` };
            const reqBody = { status };
            try
            {
                const result=await updateOrderStatusAPI(selectedOrder._id,reqBody,reqHeader)
                if(result.status==200)
                {
                    alert("Status Updated succesfully")
                    fetchAdminOrders();
                    handleClose();
                }
            }
            catch(err)
            {
                console.log(err);
                
            }
        }
    }
    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Toggle the collapsed state
    };
    return (
        <>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                <AdminHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <div className="flex-grow-1 p-4 bg-light" style={{
                        marginLeft: collapsed ? '70px' : '250px', // Change margin based on collapsed state
                        transition: 'margin-left 0.3s ease', // Smooth transition for margin
                    }} >
                    <h1 className="display-5 text-primary fw-bold text-center mb-4">Admin Order History</h1>
                    <Row className="align-items-center mb-4">
                        <Col>
                            <h4 className="text-primary fw-bold mb-3">History List</h4>
                            <input  onChange={(e)=>setSearchKey(e.target.value)}  type="date" placeholder='Search Order (Ex:2024-12-16 )' className="form-control py-3" />
                        </Col>
                        
                    </Row>
                    <div className="row g-4">
                        {/* Admin Order History Cards */}
                        {orders.length > 0 ? (
                            orders.map((order, orderIndex) => (
                                <Col key={order._id} sm={12} md={6} lg={4} className="mb-4">
                                    <Card className="shadow-sm rounded">
                                        <Card.Body>
                                            {/* Order Header */}
                                            <Card.Title className="fw-bold text-primary">
                                                Order #{orderIndex + 1}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-3 text-muted ">
                                                <strong>User:</strong> {order.userId ? order.userId.username : 'Unknown'}
                                                <br />
                                                <strong>Email:</strong> {order.userId ? order.userId.email : 'Unknown'}
                                            </Card.Subtitle>

                                            {/* Products */}
                                            {order.products.map((product, productIndex) => (
                                                <div key={product._id} className="d-flex mb-3">
                                                    {/* Product Image */}
                                                    <img
                                                        src={`${SERVER_URL}/uploads/${product.productId.productImg}`}
                                                        alt={product.name}
                                                        className="img-fluid rounded me-3"
                                                        style={{ height: '50px', width: '70px' }}
                                                    />

                                                    {/* Product Details */}
                                                    <div className="flex-grow-1">
                                                        <strong>{product.name}</strong>
                                                        <div className="text-muted">
                                                            <span>Color: {product.color}</span><br />
                                                            <span>Size: {product.size}</span><br />
                                                            <span>Quantity: {product.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Order Details */}
                                            <div className="mt-3">
                                                <p className='text-success'><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                                                <p className='text-danger'><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                                                <p className='text-primary'><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                                                <p><strong>Status:</strong> {order.status}</p>
                                            </div>

                                            {/* Action Button */}
                                            <Button variant="warning"  onClick={()=>handleShow(order)} className="w-100">
                                                Edit Status
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <div className="text-center">
                                    <h5>No orders found!</h5>
                                </div>
                            </Col>
                        )}
                    </div>
                </div>
            </div>

              {/* Edit Status Modal */}
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Order Status</Form.Label>
                            <Form.Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpdateStatus} variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
}

export default AdminOrderHistory