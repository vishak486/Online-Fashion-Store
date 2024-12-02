import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import { Button, Form, Modal } from 'react-bootstrap'
import { addCategoryAPI } from '../services/allApi';

const AddCategory = ({getAllCategories}) => {
    const [show, setShow] = useState(false);
    const [categoryDetails,setCategoryDetails]=useState({
        categoryName:"",categoryImg:""
    })

    // console.log(categoryDetails);
    
    const handleClose = () => {
        setShow(false);
        setCategoryDetails({categoryName:"",categoryImg:""})
    }
    const handleShow = () => setShow(true);

    const handleAddCategory=async()=>{
        const {categoryName,categoryImg}=categoryDetails
        if(categoryName && categoryImg)
        {
            const reqBody=new FormData()
            reqBody.append("categoryName",categoryName)
            reqBody.append("categoryImg",categoryImg)
            const token=sessionStorage.getItem("token")
            if(token)
            {
                const reqHeader={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                  }
                try
                {
                    const result=await addCategoryAPI(reqBody,reqHeader)
                    if(result.status==200)
                    {
                        alert("Category Added Successfully")
                        getAllCategories()
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
            alert("Please fill the form")
        }
    }
    return (
        <>

            <Button className='btn-lg' variant="primary" onClick={handleShow}>
                +Add Category
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
                    <Button variant="primary" onClick={handleAddCategory}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddCategory