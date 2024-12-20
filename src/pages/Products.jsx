import React, { useContext, useEffect, useState } from 'react'
import SERVER_URL from '../services/serverUrl'
import { fetchAllProductsAPI, FetchCategoryAPI } from '../services/allApi'
import { Link } from 'react-router-dom'


const Products = () => {
    const [allProducts, setAllProducts] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [allCategories,setAllCategories]=useState([])
    const [selectedCategory, setSelectedCategory] =useState("")
    // console.log(selectedCategory);
    console.log(allCategories);
    
    // console.log(allProducts);
   

    useEffect(() => {
        fetchAllCategories()
        fetchAllProducts()
       
    }, [searchKey,selectedCategory])

    const fetchAllCategories=async()=>{
        try
        {
            const result=await FetchCategoryAPI()
            if(result.status==200)
            {
                setAllCategories(result.data) 
            }
        }
        catch(err)
        {
            console.log(err);  
        }
    }

    const fetchAllProducts = async () => {
        try {
            const result = await fetchAllProductsAPI(searchKey,selectedCategory)
            if (result.status == 200) {
                setAllProducts(result.data)
            }
        }
        catch (err) {
            console.log(err);
            
        }
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category); 
    };

    return (
        <>
            <div style={{ paddingTop: '100px' }} className="container my-5">
                <div className="row">
                    {/* Filter Section */}
                    <div className="col-lg-4">
                        <div className="p-3 shadow rounded ">
                            <h4 className="mb-4 text-center text-primary">Filter</h4>
                            <button onClick={()=>setSelectedCategory("")} className="btn btn-outline-primary w-100 mb-3">All</button>
                            
                            <button class="btn btn-outline-primary w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Select Categories
                            </button>
                            <div className="collapse" id="collapseExample">
                                {
                                    allCategories.length>0?(
                                        allCategories.map(category=>(
                                            <button key={category._id} onClick={()=>handleCategoryClick(category.categoryName)} className="btn btn-light w-100 mb-2">{category.categoryName}</button>
                                        ))
                                    ):
                                    (
                                        <div>Loading...</div>
                                    )
                                }
                            </div>


                        </div>
                    </div>
                    {/* Product Section */}
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="text-primary">Find your Products</h1>
                            <input
                                type="text"
                                onChange={e => setSearchKey(e.target.value)}
                                placeholder="Search Your Products"
                                className="form-control w-50 shadow-sm"
                            />
                        </div>
                        <div className="row">
                            {/* product Card */}
                            {
                                allProducts?.length === 0 ? (
                                    <div className="text-danger fw-bolder">No Products Available!!!</div>
                                )
                                    :
                                    (
                                        allProducts.map((product) => (
                                            <div key={product._id} className="col-lg-4 col-md-6 mb-4">
                                                <div className="card h-100 shadow-sm border-0">
                                                    <img
                                                        src={`${SERVER_URL}/uploads/${product?.productImg}`}
                                                        // src="https://via.placeholder.com/150?text=Recipe+1"
                                                        alt="product 1"
                                                        className="card-img-top"
                                                    />
                                                    <div className="card-body text-center">
                                                        <h5 className="card-title fw-bolder text-dark">{product?.productName}</h5>
                                                        <p className="text-muted fw-bolder">Category:{product.categoryName}</p>
                                                        <p className="text-muted fw-bolder">Available Stock:{product.productQuantity}</p>
                                                        <p className="text-muted fw-bolder">Price: ₹ {product.productPrice}</p>
                                                        {
                                                            sessionStorage.getItem("token") ?
                                                                <Link to={`/${product?._id}/view`} className="btn btn-primary rounded-pill mt-1 px-4">View Details</Link>
                                                                :
                                                                <Link to={`/login`} className="btn btn-primary rounded-pill mt-1 px-4">View Details</Link>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )

                            }



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products