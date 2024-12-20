import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SERVER_URL from '../services/serverURL'
import { addToCartAPI, getSingleProductsAPI } from '../services/allApi'

const View = () => {
  const {id}=useParams()
  const [product,setProduct]=useState([])
  // console.log(product);
  const [addCart,setAddCart]=useState({
    productId:id,color:"",size:""
  })
  console.log(addCart);
  
  

  useEffect(()=>{
    fetchProductDetails()
  },[])

  const fetchProductDetails=async()=>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
    }
    try{
      const result= await getSingleProductsAPI(id,reqHeader)
      if(result.status==200)
      {
        setProduct(result.data)
      }
    }
    catch(err)
    {
      console.log(err);
      
    }
    }
  }

  const handleAddToCart=async()=>{
    const{productId,color,size}=addCart
    if(color && size)
    {
      const token = sessionStorage.getItem("token")
      if(token)
      {
        const reqHeader = {"Authorization":`Bearer ${token}`}
        try
        {
          const result= await addToCartAPI(addCart,reqHeader)
          if(result.status==200)
          {
            alert("Added to Cart Successfull")
            setAddCart({productId:id,color:"",size:""})
          }
          else
          {
            alert(result.response.data)
          }
        }
        catch(err)
        {
          console.log(err);
          
        }
      }

    }
    else
    {
      alert("Please fill form Completely")
    }
  }
  return (
    <>
      <div style={{ paddingTop: '100px' }} className="container my-5 mx-auto">
        <div className="row g-5 align-items-center">
          {/* Product Image Section */}
          <div className="col-lg-6 col-md-12">
            <img
              width={'100%'}
              height={'550px'}
              src={`${SERVER_URL}/uploads/${product?.productImg}`}
              alt="Product Thumbnail"
              className="rounded shadow-lg"
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>

          {/* Product Details Section */}
          <div className="col-lg-6 col-md-12">
            {/* <h3 className="text-muted mb-3"><strong>PID:</strong> 12345</h3> */}
            <h1 className="display-4 fw-bold text-dark">{product.productName}</h1>
            <h4 className="text-danger fw-bold py-3">₹ {product.productPrice}</h4>
            <h5 className='text-success'><strong>Available Stock:</strong> {product.productQuantity}</h5>
            <h5><strong>Category:</strong> {product.categoryName}</h5>
            <p className="py-3 text-muted">
              <strong>Description:</strong> {product.productDescription}
            </p>

            {/* Color Selection Dropdown */}
            <div className="mb-4">
              <h5 className="text-dark"><strong>Choose Color:</strong></h5>
              <select value={addCart.color} onChange={e=>setAddCart({...addCart,color:e.target.value})} className="form-select form-select-lg" aria-label="Color selection">
                <option selected>Choose color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Black">Black</option>
              </select>
            </div>

            {/* Size Selection Dropdown */}
            <div className="mb-4">
              <h5 className="text-dark"><strong>Choose Size:</strong></h5>
              <select value={addCart.size} onChange={e=>setAddCart({...addCart,size:e.target.value})} className="form-select form-select-lg" aria-label="Size selection">
                <option selected>Choose size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
              </select>
            </div>

            {/* Add to Cart Button */}
            <div className="d-flex justify-content-center mt-4">
              <button disabled={!addCart.color || !addCart.size} onClick={()=>handleAddToCart()} className="btn btn-lg btn-primary shadow-lg w-100 text-uppercase fw-bold" style={{ borderRadius: '30px' }}>
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