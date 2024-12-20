import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Parallax } from 'react-parallax'
import Parallaxbg from '../assets/parallaxBg.jpg'
import Parallaxbga from '../assets/parallaxBg2.jpg'
import ProductCategory from '../components/ProductCategory'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { fetchApprovedContactsAPI, getHomeProductsAPI } from '../services/allApi'



const Home = () => {
  const [allHomeProducts, setAllHomeProducts]=useState([])
  const [testimonials, setTestimonials] = useState([]);

  // console.log(testimonials);
  
  

  useEffect(()=>{
    getAllHomeProducts()
    fetchTestimonials()
  },[])

  const getAllHomeProducts = async () => {
    try {
      const result = await getHomeProductsAPI()
      if (result.status == 200) {
        setAllHomeProducts(result.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const fetchTestimonials = async () => {
    try {
        const result = await fetchApprovedContactsAPI();
        if (result.status == 200) {
            setTestimonials(result.data);
        }
    } catch (error) {
        console.log(error);
    }
};
  // console.log(allHomeProducts);
  
  return (
    <>

      <div style={{ width: '100%' }} >
        <Parallax  bgImage={Parallaxbg} bgImageStyle={{backgroundSize: 'cover'}} strength={600}>
          <div style={{ height: '50rem' }}>
            <div className="text-content text-white fw-bolder d-flex flex-column align-items-center justify-content-center h-100 text-center">
              <h1 className="display-4 fw-bold mb-3" style={{ fontSize: '3rem' }}>Discover Your Fashion Style</h1>
              <p className="lead mb-4 fw-bold" style={{ color: '#f8f9fa', fontSize: '1.25rem' }}>Where Every Outfit Tells Your Story</p>

              {
                sessionStorage.getItem("token") ?
                  <Link to={'/products'} className="btn btn-primary btn-lg fw-bold" style={{ padding: '15px 30px', fontSize: '1.25rem', borderRadius: '25px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>Explore Now</Link>
                  :
                  <Link to={'/login'} className="btn btn-primary btn-lg fw-bold" style={{ padding: '15px 30px', fontSize: '1.25rem', borderRadius: '25px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>Get Started</Link>
              }
            </div>
          </div>
        </Parallax>





        {/* Products */}
        <div className=' text-center'>
        <h1 className="text-center py-5 display-6 fw-semibold">Check Out New Products</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {
              allHomeProducts?.map(product=>(
                <div key={product?._id} className="d-flex">           
                  <ProductCard displayData={product} />
              </div>
              ))
              
            }
         </div>
        </div>

        <Parallax className="container-fluid w-100" bgImage={Parallaxbga} strength={600}>
          <div style={{ height: '60vh' }}>
            <div
              className="text-content text-white fw-bold d-flex flex-column align-items-center justify-content-center text-center"
              style={{ minHeight: '400px' }}
            >
              <h2 className="fs-1 fw-semibold text-primary" style={{ textShadow: '2px 2px 5px black' }}>
                50% OFF SALE!
              </h2>
              <p
                style={{ fontSize: '22px', maxWidth: '600px', textShadow: '1px 1px 3px black' }}
                className="px-3"
              >
                Discover exclusive fashion pieces at unbeatable prices. Shop the latest trends and enjoy up to 50% off on your favorite styles!
              </p>
              <Link to={'/products'} className="btn btn-primary text-white mt-3 px-4 py-3" style={{ fontSize: '18px', border: 'none', borderRadius: '25px', width: '200px', height: '55px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }} >Shop Now</Link>
            </div>
          </div>
        </Parallax>

        {/* Services */}
        <div className="my-5">
          <h2 className="text-center fs-1 mb-4">Our Services</h2>
          <Row className="text-center my-5">
            <Col md={4} className="mb-4">
              <i className="fas fa-tags" style={{ fontSize: '4rem', color: '#FF5733' }}></i>
              <h4 className="mt-3">Exclusive Discounts</h4>
              <p>Enjoy exclusive deals and discounts on your favorite fashion items.</p>
            </Col>
            <Col md={4} className="mb-4">
              <i className="fas fa-truck" style={{ fontSize: '4rem', color: '#FF5733' }}></i>
              <h4 className="mt-3">Fast Delivery</h4>
              <p>Quick and reliable delivery for all your orders.</p>
            </Col>
            <Col md={4} className="mb-4">
              <i className="fas fa-tshirt" style={{ fontSize: '4rem', color: '#ff6f61' }}></i>
              <h4 className="mt-3">Exclusive Designs</h4>
              <p>Stay ahead of the trends with our exclusive and handpicked designs.</p>
            </Col>
          </Row>
        </div>

        <div className="my-5">
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>
                What People Say About Us
            </h2>
            <div
                className="p-4 rounded" style={{background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', overflow: 'hidden', }}>
                <marquee>
                  <div className="marquee" style={{ whiteSpace: 'nowrap', display: 'flex', animation: 'scroll 15s linear infinite' }}>
                      {testimonials.map((testimonial, index) => (
                          <div
                              key={index}
                              className="d-inline-block mx-3 p-3 text-center"
                              style={{
                                  minWidth: '250px',
                                  backgroundColor: '#fff',
                                  borderRadius: '8px',
                                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                              }}
                          >
                              <p style={{ fontStyle: 'italic', marginBottom: '10px', color: '#555' }}>
                                  "{testimonial.message}"
                              </p>
                              <h5 style={{ fontWeight: 'bold', color: '#333' }}>- {testimonial.username}</h5>
                          </div>
                      ))}
                  </div>
                </marquee>
            </div>
        </div>





      </div>

    </>
  )
}

export default Home