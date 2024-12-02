import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { updateStockAPI } from '../services/allApi';

const EditStock = ({product,getAllProducts}) => {
    const [show, setShow] = useState(false);
    const [stockDetails, setStockDetails] = useState({
        id:product._id || "",
        productPrice: product.productPrice || "",
        productQuantity: product.productQuantity || ""
    });

    const handleClose = () => {
        setShow(false);
        setStockDetails({
            id:product._id || "",
            productPrice: product.productPrice || "",
            productQuantity: product.productQuantity || ""
        })
    }
    const handleShow = () => {
        setShow(true);
        setStockDetails({
            id:product._id || "",
            productPrice: product.productPrice || "",
            productQuantity: product.productQuantity || ""
        })
    }
    const handleUpdateStock=async()=>{
        const {id,productPrice,productQuantity}=stockDetails
        if(productPrice && productQuantity)
        {
            const token=sessionStorage.getItem("token")
            if(token)
            {
                const reqHeader={
                    "Authorization":`Bearer ${token}`
                  }
                  try
                  {
                    const result = await updateStockAPI(id,stockDetails,reqHeader)
                    if(result.status===200)
                    {
                        alert("Stock updated successfully")
                        getAllProducts()
                        handleClose()
                    }
                  }
                  catch(err)
                  {
                    console.log(err)
                  }
            }
        }
        else
        {
            alert("Please fill the form")
        }
    }

    return (
        <>
            <Button className='btn-md mx-2' variant="info" onClick={handleShow}>
                Edit Stock
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={stockDetails.productPrice}
                                onChange={(e) =>
                                    setStockDetails({ ...stockDetails, productPrice: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="productQuantity">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={stockDetails.productQuantity}
                                onChange={(e) =>
                                    setStockDetails({ ...stockDetails, productQuantity: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateStock}>
                        Update Stock
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditStock;
