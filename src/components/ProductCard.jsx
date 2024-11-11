import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Shirt from '../assets/halfshirt.png'
import Pant from '../assets/pant.png'
import Onepiece from '../assets/onepeice.png'
import Twopiece from '../assets/twopiece.png'

const ProductCard = () => {
    return (
        <>

            <div className="container">
                <div className="row justify-content-evenly">
                    {/* Card 1 */}
                    <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-4">
                        <Card className="shadow-lg" style={{ width: '18rem', backgroundColor: '#d0e8f2' }}>
                            <Card.Img style={{ width: '100%', height: '300px', objectFit: 'cover' }} className="img-fluid px-5 py-4" variant="top" src={Shirt} />
                            <Card.Body>
                                <Card.Title>Mens Collection</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Card 2 */}
                    <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-4">
                        <Card className="shadow-lg" style={{ width: '18rem', backgroundColor: '#d0e8f2' }}>
                            <Card.Img style={{ width: '100%', height: '300px', objectFit: 'cover' }} className="img-fluid px-5 py-4" variant="top" src={Onepiece} />
                            <Card.Body>
                                <Card.Title>Mens Collection</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Card 3 */}
                    <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-4">
                        <Card className="shadow-lg" style={{ width: '18rem', backgroundColor: '#d0e8f2' }}>
                            <Card.Img style={{ width: '100%', height: '300px', objectFit: 'cover' }} className="img-fluid px-5 py-4" variant="top" src={Pant} />
                            <Card.Body>
                                <Card.Title>Kids Collection</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ProductCard