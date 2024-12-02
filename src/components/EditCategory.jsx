import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { updateCategoryAPI } from '../services/allApi';

const EditCategory = ({category,getAllCategories}) => {
    const [show, setShow] = useState(false);
    const [categoryDetails,setCategoryDetails]=useState({
        id:category._id ,categoryName:category.categoryName ,categoryImg: category.categoryImg
    })

    
    const handleClose = () => {
        setShow(false);
        setCategoryDetails({  id:category._id ,categoryName:category.categoryName ,categoryImg: category.categoryImg})
    }
    const handleShow = () => {
        setShow(true);
        setCategoryDetails({  id:category._id ,categoryName:category.categoryName ,categoryImg: category.categoryImg})
    }

    const handleUpdateCategory=async()=>{
        const{id,categoryName,categoryImg}=categoryDetails
        if(categoryName && categoryImg)
            {
                const reqBody= new FormData()
                reqBody.append('categoryName',categoryName)
                reqBody.append('categoryImg',categoryImg)
                const token=sessionStorage.getItem("token")
                if(token)
                {
                    const reqHeader={
                        "Content-Type":"multipart/form-data",
                        "Authorization":`Bearer ${token}`
                      }
                    try
                    {
                        const result= await updateCategoryAPI(id,reqBody,reqHeader)
                        if(result.status==200)
                        {
                            alert("Category Updated Successfully")
                            getAllCategories()
                            handleClose()
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
                alert("Please fill the form")
            }
    }

  return (
    <>
         <Button className='btn-md mx-2' variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control value={categoryDetails.categoryName} onChange={e=>setCategoryDetails({...categoryDetails,categoryName:e.target.value})} type="text"  placeholder="Category Name"  autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Category Image</Form.Label>
                            <Form.Control onChange={e=>setCategoryDetails({...categoryDetails,categoryImg:e.target.files[0]})} type="file" />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button  variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateCategory} >
                        Update Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    </>
  )
}

export default EditCategory