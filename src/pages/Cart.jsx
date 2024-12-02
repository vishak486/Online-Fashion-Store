import React from 'react'
import Header from '../components/Header'

const Cart = () => {
  return (
    <>
    
      <div style={{ paddingTop: '100px' }} className="container my-5 px-4 mx-auto">
        {/* Cart Summary */}
        <h1 className="display-5 text-primary fw-bold text-center mb-4">
          My Cart
        </h1>
        <div className="row g-4">
          {/* Cart Items Section */}
          <div className="col-lg-8 col-md-12 border rounded shadow-sm bg-light p-4">
            <h2 className="h4 fw-bold text-secondary mb-3">Cart Items</h2>
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Color & Size</th> {/* Added Color & Size */}
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Fake Data */}
                <tr className="hover-shadow">
                  <td>1</td>
                  <td>
                    <strong>Stylish Watch</strong>
                    <p className="text-muted small mb-0">Category: Accessories</p>
                  </td>
                  <td>
                    <img
                      src="https://via.placeholder.com/70"
                      alt="Stylish Watch"
                      className="img-fluid rounded"
                      style={{ height: '50px', width: '70px' }}
                    />
                  </td>
                  <td>
                    <div>
                      <span className="d-block text-muted">Color: Black</span> {/* Display Color */}
                      <span className="d-block text-muted">Size: M</span> {/* Display Size */}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-sm btn-outline-secondary">-</button>
                      <input
                        className="form-control mx-2 text-center"
                        style={{ width: '60px' }}
                        readOnly
                        value="2"
                      />
                      <button className="btn btn-sm btn-outline-secondary">+</button>
                    </div>
                  </td>
                  <td className="fw-bold text-success">$150</td>
                  <td>
                    <button className="btn btn-danger btn-sm rounded-circle">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr className="hover-shadow">
                  <td>2</td>
                  <td>
                    <strong>Elegant Shoes</strong>
                    <p className="text-muted small mb-0">Category: Footwear</p>
                  </td>
                  <td>
                    <img
                      src="https://via.placeholder.com/70"
                      alt="Elegant Shoes"
                      className="img-fluid rounded"
                      style={{ height: '50px', width: '70px' }}
                    />
                  </td>
                  <td>
                    <div>
                      <span className="d-block text-muted">Color: Brown</span> {/* Display Color */}
                      <span className="d-block text-muted">Size: 10</span> {/* Display Size */}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-sm btn-outline-secondary">-</button>
                      <input
                        className="form-control mx-2 text-center"
                        style={{ width: '60px' }}
                        readOnly
                        value="1"
                      />
                      <button className="btn btn-sm btn-outline-secondary">+</button>
                    </div>
                  </td>
                  <td className="fw-bold text-success">$120</td>
                  <td>
                    <button className="btn btn-danger btn-sm rounded-circle">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-danger btn-lg w-100 py-2 rounded-3 shadow-sm">
                <i className="fas fa-trash me-2"></i>EMPTY CART
              </button>
              <a href="/" className="btn btn-primary btn-lg w-100 py-2 rounded-3 shadow-sm">
                <i className="fas fa-shopping-cart me-2"></i>SHOP MORE
              </a>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="col-lg-4 col-md-12 border rounded shadow-sm bg-light p-4">
            <h2 className="h4 fw-bold text-secondary mb-3">Checkout</h2>
            <h4 className="fw-bold text-dark">
              Total Amount: <span className="text-danger">$270</span>
            </h4>
            <hr />
            <button className="btn btn-success w-100 mt-3 py-2 fw-bold rounded-3 shadow-lg">
              <i className="fas fa-credit-card me-2"></i>Checkout
            </button>
          </div>
        </div>
      </div>



    </>
  )
}

export default Cart