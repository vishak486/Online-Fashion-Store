import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AddCategory from '../components/AddCategory'
import EditCategory from '../components/EditCategory'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { deleteCategoryAPI, getAllCategoryAPI } from '../services/allApi'
import SERVER_URL from '../services/serverURL'

import {viewCategoryResponseContext} from '../contexts/CategoryContext'

const AdminManageCategory = () => {
    const { forCategories, updateCategories }=useContext(viewCategoryResponseContext)
    const [Categories, setCategories] = useState([])
    const [searchKey,setSearchKey]=useState("")
    useEffect(()=>{
        getAllCategories()
    },[searchKey])


    const getAllCategories = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllCategoryAPI(searchKey,reqHeader)
                if (result.status == 200) {
                    setCategories(result.data)
                    updateCategories(result.data)
                }

            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const deleteCategories=async(id)=>{
        const token=sessionStorage.getItem("token")
        if(token)
        {
            const reqHeader={Authorization:`Bearer ${token}`}
            try
            {
                await deleteCategoryAPI(id,reqHeader)
                getAllCategories()
            }
            catch(err)
            {
                console.log(err)
            }
        }
    }
    return (
        <>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                <AdminHeader />
                <div className="flex-grow-1 p-4 bg-light" style={{ marginLeft: '250px', transition: 'margin-left 0.3s' }} >
                    <Row className="align-items-center mb-4">
                        <Col>
                            <h4 className="text-primary fw-bold mb-3">Category List</h4>
                            <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search Category' className="form-control" />
                        </Col>
                        <Col className="text-end">
                            <AddCategory getAllCategories={getAllCategories} />
                        </Col>
                    </Row>
                    <div className="table-responsive">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Category Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Categories.length === 0 ?
                                        (
                                            <tr>
                                                <td colSpan="7" className="text-center">No Categories found</td>
                                            </tr>
                                        )
                                        :
                                        (
                                            Categories?.map((category, index) => (
                                                <tr key={category?._id}>
                                                    <td>{index+1}</td>
                                                    <td>{category?.categoryName}</td>
                                                    <td> <img
                                                         src={category.categoryImg ? `${SERVER_URL}/uploads/${category.categoryImg}` : "https://via.placeholder.com/70"}
                                                        alt="Stylish Watch"
                                                        className="img-fluid rounded"
                                                        style={{ height: '50px', width: '70px' }}
                                                    /></td>
                                                    <td>
                                                        <EditCategory category={category} getAllCategories={getAllCategories}/>
                                                        <Button onClick={()=>deleteCategories(category._id)} variant="danger" className="btn-md">Delete</Button>
                                                    </td>

                                                </tr>
                                            ))
                                        )
                                }


                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminManageCategory