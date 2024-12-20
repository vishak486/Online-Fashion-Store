import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SERVER_URL from '../services/serverUrl'
import { deleteCartDetailsAPI, emptyCartAPI, getCartDetailsAPI, orderPlaceAPI, updateCartQuantityAPI, validateUserProfileAPI } from '../services/allApi'
import { Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


const Cart = () => {
  const navigate=useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  console.log(cartItems);

  useEffect(() => {
    fetchCartItems()
  }, [])



  const fetchCartItems = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try {
        const result = await getCartDetailsAPI(reqHeader);
        if (result.status === 200) {
          setCartItems(result.data.cartItems);
          setTotalAmount(result.data.totalAmount);
        } else {
          alert(result.response.data);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteCartItem = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token)
       {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try 
      {
        const result = await deleteCartDetailsAPI(id,reqHeader);
        if (result.status == 200) 
        {
          if (cartItems.length === 1) {
            setCartItems([]); 
            setTotalAmount(0); 
            alert("Cart is now empty!");
          } else {
            fetchCartItems(); 
          } 
          
        } 
        else 
        {
          alert(result.response.data)
        }
      } 
      catch (err) 
      {
        console.log(err);
      }
    }
  };

  const handleEmptyCart = async () => {
    const token = sessionStorage.getItem("token");
    if (token) 
    {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try 
      {
        const result = await emptyCartAPI(reqHeader);
        if (result.status === 200) 
        {
          setCartItems([])
          fetchCartItems()
          setTotalAmount(0)
        } 
        else 
        {
          alert("Failed to empty the cart.");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdateQuantity=async(id,newQuantity)=>{
    const token = sessionStorage.getItem("token");
    if(token)
    {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const reqBody = { quantity: newQuantity };
      try
      {
          const result= await updateCartQuantityAPI(id,reqBody,reqHeader)
          if(result.status==200)
          {
            fetchCartItems()
          }
      }
      catch(err)
      {
        console.log(err);
      }
    }
  }

  const validateProfile=async()=>{
    const token = sessionStorage.getItem("token");
    if(token)
    {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try
      {
          const result=await validateUserProfileAPI(reqHeader)
          if(result.status==200)
          {
            console.log("Profile validation successful:", result.data);
            return true;
          }
      }
      catch(err)
      {
        if (err.response?.status === 406) {
          return false; // Profile is incomplete
      }
      }
    }
  }

  const handleCheckout = async () => {
    const isProfileComplete = await validateProfile();
    if (!isProfileComplete) {
      alert("Please complete your profile before proceeding to checkout.");
      navigate('/profile')
    }
    else
    {
      handlePlaceOrder()
    };
    }
  const handlePlaceOrder=async()=>{
    const token = sessionStorage.getItem('token');
    if(token)
    {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try
      {
        const reqBody = {
          items: cartItems.map(item => ({
            productId: item.productId._id,
            name: item.productId.productName,
            quantity: item.quantity,
            color:item.color,
            size:item.size
          })),
          totalAmount:totalAmount,
        }
        console.log("Sending Request to /placeOrder with Body:", reqBody);
        const result= await orderPlaceAPI(reqBody,reqHeader)
        console.log("Order API Response:", result);
        if(result.status==200)
        {
          alert("Your order has been placed successfully!")
          setCartItems([])
          setTotalAmount(0)
        }

      }
      catch(err)
      {
        console.log(err);
        
      }
    }
  }
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
            <Table responsive className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Color & Size</th> {/* Added Color & Size */}
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItems.length > 0 ?
                    (
                      cartItems.map((item, index) => (
                        <tr key={item._id} className="hover-shadow">
                          <td>{index + 1}</td>
                          <td>
                            <strong>{item.productId.productName}</strong>
                            <p className="text-muted small mb-0">Category: {item.productId.categoryName}</p>
                          </td>
                          <td>
                            <img
                              src={`${SERVER_URL}/uploads/${item?.productId.productImg}`}
                              // src="https://via.placeholder.com/70"
                              alt="Stylish Watch"
                              className="img-fluid rounded"
                              style={{ height: '50px', width: '70px' }}
                            />
                          </td>
                          <td>
                            <div>
                              <span className="d-block text-muted">Color: {item.color}</span> {/* Display Color */}
                              <span className="d-block text-muted">Size: {item.size}</span> {/* Display Size */}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <button  onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}  disabled={item.quantity === 1} className="btn btn-sm btn-outline-secondary">-</button>
                              <input
                                className="form-control mx-2 text-center"
                                style={{ width: '60px' }}
                                readOnly
                                value={item.quantity}
                              />
                              <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)} className="btn btn-sm btn-outline-secondary">+</button>
                            </div>
                          </td>
                          <td className="fw-bold text-success">₹{item.productId.productPrice}</td>
                          <td>{new Date(item.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}</td>
                          <td>
                            <button onClick={()=>handleDeleteCartItem(item._id)} className="btn btn-danger btn-sm rounded-circle">
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                    :
                    (
                      <tr>
                        <td colSpan="7" className="text-center hover-shadow text-danger">Empty Cart!!!</td>
                      </tr>
                    )
                }


              </tbody>
            </Table>
            <div className="d-flex justify-content-between mt-4">
              <button onClick={handleEmptyCart} className="btn btn-danger btn-lg w-100 py-2 rounded-3 shadow-sm">
                <i className="fas fa-trash me-2"></i>EMPTY CART
              </button>
              <Link to={'/products'} className="btn btn-primary btn-lg w-100 py-2 rounded-3 shadow-sm">
                <i className="fas fa-shopping-cart me-2"></i>SHOP MORE
              </Link>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="col-lg-4 col-md-12 border rounded shadow-sm bg-light p-4">
            <h2 className="h4 fw-bold text-secondary mb-3">Checkout</h2>
            <h4 className="fw-bold text-dark">
              Total Amount: <span className="text-danger">₹{totalAmount}</span>
            </h4>
            <hr />
            <button onClick={()=>handleCheckout()} className="btn btn-success w-100 mt-3 py-2 fw-bold rounded-3 shadow-lg">
              <i className="fas fa-credit-card me-2"></i>Checkout
            </button>
          </div>
        </div>
      </div>



    </>
  )
}

export default Cart