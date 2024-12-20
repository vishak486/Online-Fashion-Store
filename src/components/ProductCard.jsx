import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Shirt from '../assets/halfshirt.png'
import Pant from '../assets/pant.png'
import Onepiece from '../assets/onepeice.png'
import Twopiece from '../assets/twopiece.png'
import { Link } from 'react-router-dom'
import SERVER_URL from '../services/serverURL'

const ProductCard = ({displayData}) => {
    return (
        <>

            <div className="container">

                <div id="recipes" style={{ paddingTop: "100px" }} className="container-fluid px-4 py-5">

                        {/* Recipe Card 1 */}
                        <div className="col">
                            <div style={{ background: 'linear-gradient(to bottom, #e2f0cb, #fff)', }} className="card shadow-sm border rounded">
                                <img src={`${SERVER_URL}/uploads/${displayData?.productImg}`}  className="card-img-top" alt="Recipe Image" />
                                <div className="card-body text-center">
                                    <h2 className="fs-4 fw-bold">{displayData?.productName}</h2>
                                    <p>Category : {displayData?.categoryName}</p>
                                    <p className="text-success fs-5">Available Stock: {displayData?.productQuantity}</p>
                                    <p className="text-danger fs-5">Price: ₹{displayData?.productPrice}</p>
                                    {
                                        sessionStorage.getItem("token")?
                                        <Link to={`/${displayData?._id}/view`}   className="btn btn-primary rounded-pill mt-1 px-4">View Details</Link>
                                        :
                                        <Link to={`/login`}   className="btn btn-primary rounded-pill mt-1 px-4">View Details</Link>
                                    }
                                </div>
                            </div>
                        </div>
   
                </div>
            </div>



        </>
    )
}

export default ProductCard