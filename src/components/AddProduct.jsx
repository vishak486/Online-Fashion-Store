import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { viewCategoryResponseContext } from '../contexts/CategoryContext'
import { addProductAPI } from '../services/allApi';

const AddProduct = ({getAllProducts}) => {
    const [show, setShow] = useState(false);
    const { forCategories } = useContext(viewCategoryResponseContext)
    // console.log("Categories in AddProduct:", forCategories);

    const [productDetails, setProductDetails] = useState({
        productName: "", productDescription: "", productPrice: "", productQuantity: "", productImg: "", categoryName: ""
    })
    // console.log(productDetails);

    const handleClose = () => {
        setShow(false);
        setProductDetails({ productName: "", productDescription: "", productPrice: "", productQuantity: "", productImg: "", categoryName: ""})
    }
    const handleShow = () => {
        setShow(true);
    }
    const handleAddProduct=async()=>{
        const{productName,productDescription,productPrice,productQuantity,productImg,categoryName}=productDetails
        if(productName && productDescription && productPrice && productQuantity && productImg && categoryName)
        {
            const reqBody=new FormData()
            reqBody.append('productName',productName)
            reqBody.append('productDescription',productDescription)
            reqBody.append('productPrice',productPrice)
            reqBody.append('productQuantity',productQuantity)
            reqBody.append('productImg',productImg)
            reqBody.append('categoryName',categoryName)

            const token=sessionStorage.getItem("token")
            if(token)
            {
                const reqHeader={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                  }
                try
                {
                    const result= await addProductAPI(reqBody,reqHeader)
                    if(result.status==200)
                    {
                        alert("Product Added Successfully")
                        getAllProducts()
                        handleClose()

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
            alert("Please fill the form!!!")
        }

    }

    

    return (
        <>
            <Button className="btn-lg" variant="primary" onClick={handleShow}>
                +Add Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Product Name */}
                        <Form.Group className="mb-3" controlId="formProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control value={productDetails.productName} onChange={e => setProductDetails({ ...productDetails, productName: e.target.value })} type="text" placeholder="Enter Product Name" autoFocus />
                        </Form.Group>

                        {/* Product Description */}
                        <Form.Group className="mb-3" controlId="formProductDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control value={productDetails.productDescription} onChange={e => setProductDetails({ ...productDetails, productDescription: e.target.value })} as="textarea" rows={3} placeholder="Enter Product Description" />
                        </Form.Group>

                        {/* Product Price */}
                        <Form.Group className="mb-3" controlId="formProductPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control value={productDetails.productPrice} onChange={e => setProductDetails({ ...productDetails, productPrice: e.target.value })} type="number" placeholder="Enter Product Price" />
                        </Form.Group>

                        {/* Product Quantity */}
                        <Form.Group className="mb-3" controlId="formProductQuantity">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control value={productDetails.productQuantity} onChange={e => setProductDetails({ ...productDetails, productQuantity: e.target.value })} type="number" placeholder="Enter Product Quantity" />
                        </Form.Group>

                        {/* Product Image */}
                        <Form.Group className="mb-3" controlId="formProductImage">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control onChange={e => setProductDetails({ ...productDetails, productImg: e.target.files[0] })} type="file" />
                        </Form.Group>

                        {/* Product Category */}
                        <Form.Group className="mb-3" controlId="formProductCategory">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Select value={productDetails.categoryName} onChange={e => setProductDetails({ ...productDetails, categoryName: e.target.value })}>
                                <option value="" disabled>Select a Category</option>
                                {/* Populate categories dynamically */}
                                {forCategories && forCategories.length > 0 ? (
                                    forCategories.map(category => (
                                        <option key={category._id} value={category.categoryName}>
                                            {category.categoryName}
                                        </option>
                                    ))
                                ) : (
                                    <option>No categories available</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleAddProduct} variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddProduct;
