import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { getOrderPlaceAPI } from '../services/allApi';
import SERVER_URL from '../services/serverURL'

const orderSummary = () => {
    const [searchKey, setSearchKey] = useState('');
    const [orders, setOrders] = useState([]);
    console.log(orders);

    console.log(searchKey);


    useEffect(() => {
        fetchOrders()
    }, [searchKey])

    const fetchOrders = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = { "Authorization": `Bearer ${token}` };
            try {
                const result = await getOrderPlaceAPI(searchKey,reqHeader)
                if (result.status == 200) {
                    setOrders(result.data);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };
    return (
        <>
            <div style={{ paddingTop: "100px" }} className="container my-5 px-4 mx-auto">
                <h1 className="display-5 text-primary fw-bold text-center mb-4">
                    Order Summary
                </h1>
                <Row className="align-items-center mb-4">
                    <Col>
                        <input onChange={(e) => setSearchKey(e.target.value)} type="date" placeholder='Search Order (Ex:2024-12-16 )' className="form-control py-3" />
                    </Col>
                </Row>
                <div className="row g-4">
                    {/* Order Summary Cards */}
                    {orders.length > 0 ? (
                        orders.map((order, orderIndex) => (
                            <div key={orderIndex} className="col-md-6 col-lg-4">
                                <div className="card shadow-sm border rounded">
                                    <div className="card-body">
                                        <h5 className="card-title text-secondary fw-bold mb-3">
                                            Order #{orderIndex + 1}
                                        </h5>

                                        {/* Product List */}
                                        <div className="list-group mb-3">
                                            {order.products.map((product, productIndex) => (
                                                <div key={product._id} className="list-group-item">
                                                    {/* Product Details */}
                                                    <div className="d-flex align-items-center mb-3">
                                                        <img
                                                            src={`${SERVER_URL}/uploads/${product.productId.productImg}`}
                                                            alt={product.name}
                                                            className="img-fluid rounded"
                                                            style={{ height: "70px", width: "90px", objectFit: "cover" }}
                                                        />
                                                        <div className="ms-3">
                                                            <h6 className="text-dark">{product.name}</h6>
                                                            <div className="text-muted">Color: {product.color}</div>
                                                            <div className="text-muted">Size: {product.size}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted">Quantity: {product.quantity}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Summary */}
                                        <div className="mt-3">
                                            <p className="text-success fw-bold">Shipping Address: {order.shippingAddress}</p>
                                            <p className="fw-bold text-danger">Total Amount: ₹{order.totalAmount}</p>
                                            <p className="text-muted fw-bold">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                                            <span style={{ height: '40px' }} className={`badge rounded-pill w-100 fs-5 text-white ${order.status === "Delivered" ? "bg-success" : order.status === "Shipped" ? "bg-info" : order.status === "Pending" ? "bg-warning" : "bg-danger"}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="alert alert-info text-center">
                                No orders found!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default orderSummary