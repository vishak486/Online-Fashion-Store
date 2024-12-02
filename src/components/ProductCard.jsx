import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Shirt from '../assets/halfshirt.png'
import Pant from '../assets/pant.png'
import Onepiece from '../assets/onepeice.png'
import Twopiece from '../assets/twopiece.png'
import { Link } from 'react-router-dom'

const ProductCard = () => {
    return (
        <>

            <div className="container py-5">
                <div className="row justify-content-evenly">
                    {/* Card 1 */}
                    <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-4">
                        <Card
                            className="shadow-lg border-0"
                            style={{
                                width: '18rem',
                                background: 'linear-gradient(to bottom, #d0e8f2, #fff)',
                                borderRadius: '15px',
                            }}
                        >
                            <Card.Img
                                style={{
                                    width: '100%',
                                    height: '350px',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '15px',
                                    borderTopRightRadius: '15px',
                                    padding:'10px'
                                }}
                                variant="top"
                                src={Shirt}
                            />
                            <Card.Body className="text-center">
                                <Card.Title className="fw-bold fs-5">Men's Collection</Card.Title>
                                <Card.Text className="text-muted fs-6">
                                    Discover the finest apparel for men, designed for comfort and style.
                                </Card.Text>
                                <Link to={'/view'} className="btn btn-primary rounded-pill px-4">
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Card 2 */}
                    <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-4">
                        <Card
                            className="shadow-lg border-0"
                            style={{
                                width: '18rem',
                                background: 'linear-gradient(to bottom, #f8cdda, #fff)',
                                borderRadius: '15px',
                            }}
                        >
                            <Card.Img
                                style={{
                                    width: '100%',
                                    height: '350px',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '15px',
                                    borderTopRightRadius: '15px',
                                    padding:'10px'
                                }}
                                variant="top"
                                src={Onepiece}
                            />
                            <Card.Body className="text-center">
                                <Card.Title className="fw-bold fs-5">Women's Collection</Card.Title>
                                <Card.Text className="text-muted fs-6">
                                    Elevate your wardrobe with our elegant women's collection.
                                </Card.Text>
                                <Button variant="primary" className="rounded-pill px-4">
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Card 3 */}
                    <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-4">
                        <Card
                            className="shadow-lg border-0"
                            style={{
                                width: '18rem',
                                background: 'linear-gradient(to bottom, #e2f0cb, #fff)',
                                borderRadius: '15px',
                            }}
                        >
                            <Card.Img
                                style={{
                                    width: '100%',
                                    height: '350px',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '15px',
                                    borderTopRightRadius: '15px',
                                    padding:'10px'
                                }}
                                variant="top"
                                src={Pant}
                            />
                            <Card.Body className="text-center">
                                <Card.Title className="fw-bold fs-5">Kids' Collection</Card.Title>
                                <Card.Text className="text-muted fs-6">
                                    Vibrant and durable outfits for kids to play and shine in.
                                </Card.Text>
                                <Button variant="primary" className="rounded-pill px-4">
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ProductCard