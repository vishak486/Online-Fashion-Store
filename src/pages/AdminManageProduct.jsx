import React, { useState,useEffect, useContext } from 'react'
import AdminHeader from '../components/AdminHeader'
import AddProduct from '../components/AddProduct'
import EditProduct from '../components/EditProduct'
import EditStock from '../components/EditStock'

import { deleteProductAPI, getAllProductAPI } from '../services/allApi'
import SERVER_URL from '../services/serverURL'
import {viewCategoryResponseContext} from '../contexts/CategoryContext'
import { Button, Col, Row, Table } from 'react-bootstrap'


const AdminManageProduct = () => {
    const [allProduct, setAllProducts] = useState([])
    const [searchKey,setSearchKey]=useState("")
    const [collapsed, setCollapsed] = useState(false);
    
    const { Categories, getAllCategories } = useContext(viewCategoryResponseContext);
    useEffect(() => {
        getAllProducts()
    }, [searchKey])

    const getAllProducts = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllProductAPI(searchKey,reqHeader)
                if (result.status == 200) {
                    setAllProducts(result.data)
                }

            } catch (err) {
                console.error(err)
            }
        }
    }

    const deleteProducts=async(id)=>{
        const token=sessionStorage.getItem("token")
        if(token)
        {
            const reqHeader={Authorization:`Bearer ${token}`}
            try
            {
                await deleteProductAPI(id,reqHeader)
                getAllProducts()
            }
            catch(err)
            {
                console.log(err)
            }
        }
    }
    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Toggle the collapsed state
    };
    return (
        <>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                <AdminHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <div className="flex-grow-1 p-4 bg-light" style={{
                        marginLeft: collapsed ? '70px' : '250px', // Change margin based on collapsed state
                        transition: 'margin-left 0.3s ease', // Smooth transition for margin
                    }} >
                    <Row className="align-items-center mb-4">
                        <Col>
                            <h4 className="text-primary fw-bold mb-3">Product List</h4>
                            <input onChange={e=>setSearchKey(e.target.value)}  type="text" placeholder='Search products' className="form-control" />
                        </Col>
                        <Col className="text-end">
                            <AddProduct Categories={Categories} getAllProducts={getAllProducts} />
                        </Col>
                    </Row>
                    <div className="table-responsive">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Product Image</th>
                                    <th>Category</th>
                                    <th>Product Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                    <th>Update Stock</th> {/* New Column */}
                                </tr>
                            </thead>
                            <tbody>
                                {allProduct.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center">No products available</td>
                                    </tr>
                                ) : (
                                    allProduct.map((product, index) => (
                                        <tr key={product._id}>
                                            <td>{index + 1}</td>
                                            <td>{product.productName}</td>
                                            <td>
                                                <img
                                                    src={product.productImg ? `${SERVER_URL}/uploads/${product.productImg}` : "https://via.placeholder.com/70"}
                                                    alt={product.productName}
                                                    className="img-fluid rounded"
                                                    style={{ height: '50px', width: '70px' }}
                                                />
                                            </td>
                                            <td>{product.categoryName}</td>
                                            <td>{product.productDescription}</td>
                                            <td>${product.productPrice}</td>
                                            <td>{product.productQuantity}</td>
                                            <td>
                                                <EditProduct Categories={Categories} product={product} getAllProducts={getAllProducts}/>
                                                <Button  onClick={()=>deleteProducts(product._id)} variant="danger" className="btn-md mx-1">Delete</Button>
                                            </td>
                                            <td>
                                                <EditStock product={product} getAllProducts={getAllProducts}/>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>

        </>
    )
}

export default AdminManageProduct