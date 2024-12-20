import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { viewCategoryResponseContext } from '../contexts/CategoryContext'; 
import { updateCategoryAPI, updateProductAPI } from '../services/allApi';

const EditProduct = ({product,getAllProducts,Categories}) => {
    const [show, setShow] = useState(false);
    // const { forCategories } = useContext(viewCategoryResponseContext);
    const [productDetails, setProductDetails]=useState({
        id: product._id || "", productName: product.productName || "", productDescription: product.productDescription || "", productImg: product.productImg || "",  categoryName: product.categoryName || ""
    })

    const handleClose = () => {
        setShow(false);
        setProductDetails({ id: product._id || "", productName: product.productName || "", productDescription: product.productDescription || "", productImg: product.productImg || "",  categoryName: product.categoryName || ""})
    }
    const handleShow = () => {
        setShow(true);
        setProductDetails({ id: product._id || "", productName: product.productName || "", productDescription: product.productDescription || "", productImg: product.productImg || "",  categoryName: product.categoryName || ""})
    }

    const handleUpdateProduct = async () => {
        const { id, productName, productDescription, productImg, categoryName } = productDetails;
    
        // Ensure all fields are filled
        if (productName && productDescription && productImg && categoryName) {
            const reqBody = new FormData();
            reqBody.append('productName', productName);
            reqBody.append('productDescription', productDescription);
            reqBody.append('productImg', productImg);
            reqBody.append('categoryName', categoryName);
    
            const token = sessionStorage.getItem("token");
    
            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                };
    
                try {
                    const result = await updateProductAPI(id, reqBody, reqHeader);
                    if (result.status === 200) {
                        alert("Product Updated Successfully");
                        getAllProducts();  
                        handleClose();      
                    }
                } catch (err) {
                    console.log(err);
                }
            } 
        } else {
            alert("Please fill all the form fields.");
        }
    }

    return (
        <>
            <Button className='btn-md mx-2' variant="warning" onClick={handleShow}>
                Edit Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Product Name */}
                        <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={productDetails.productName}
                                onChange={e => setProductDetails({ ...productDetails, productName: e.target.value })}
                                placeholder="Product Name"
                            />
                        </Form.Group>

                        {/* Product Description */}
                        <Form.Group className="mb-3" controlId="productDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={productDetails.productDescription}
                                onChange={e => setProductDetails({ ...productDetails, productDescription: e.target.value })}
                                placeholder="Product Description"
                            />
                        </Form.Group>

                        {/* Product Image */}
                        <Form.Group className="mb-3" controlId="productImage">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={e => setProductDetails({ ...productDetails, productImg: e.target.files[0] })}
                            />
                        </Form.Group>

                        {/* Product Category */}
                        <Form.Group className="mb-3" controlId="productCategory">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Select
                                value={productDetails.categoryName}
                                onChange={e => setProductDetails({ ...productDetails, categoryName: e.target.value })}
                            >
                                <option value="" disabled>Select a Category</option>
                                {Categories && Categories.length > 0 ? (
                                    Categories.map(category => (
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
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Edit Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditProduct;
