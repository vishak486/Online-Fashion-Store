import React from 'react'
import { Link } from 'react-router-dom'

const View = () => {
  return (
    <>
      <div style={{ paddingTop: '100px' }} className="container my-5 mx-auto">
        <div className="row g-5 align-items-center">
          {/* Product Image Section */}
          <div className="col-lg-6 col-md-12">
            <img
              width={'100%'}
              height={'550px'}
              src="https://images.unsplash.com/photo-1687481795360-77c1115d26c6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Product Thumbnail"
              className="rounded shadow-lg"
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>

          {/* Product Details Section */}
          <div className="col-lg-6 col-md-12">
            <h3 className="text-muted mb-3"><strong>PID:</strong> 12345</h3>
            <h1 className="display-4 fw-bold text-dark">Sample Product Title</h1>
            <h4 className="text-danger fw-bold py-3">$99.99</h4>
            <h5><strong>Brand:</strong> Sample Brand</h5>
            <h5><strong>Category:</strong> Sample Category</h5>
            <p className="py-3 text-muted">
              <strong>Description:</strong> This is a short description of the sample product. It highlights the features and benefits, ensuring customers are informed about the product.
            </p>

            {/* Color Selection Dropdown */}
            <div className="mb-4">
              <h5 className="text-dark"><strong>Choose Color:</strong></h5>
              <select className="form-select form-select-lg" aria-label="Color selection">
                <option selected>Choose color</option>
                <option value="1">Red</option>
                <option value="2">Blue</option>
                <option value="3">Green</option>
              </select>
            </div>

            {/* Size Selection Dropdown */}
            <div className="mb-4">
              <h5 className="text-dark"><strong>Choose Size:</strong></h5>
              <select className="form-select form-select-lg" aria-label="Size selection">
                <option selected>Choose size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
            </div>

            {/* Add to Cart Button */}
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-lg btn-primary shadow-lg w-100 text-uppercase fw-bold" style={{ borderRadius: '30px' }}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>




    </>
  )
}

export default View