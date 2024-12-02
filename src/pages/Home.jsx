import React from 'react'
import Header from '../components/Header'
import LandingImg from '../assets/landing.png'
import ProductCategory from '../components/ProductCategory'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>

      <div style={{ backgroundColor: '#d0e8f2', marginTop: '80px' }} className="container-fluid">
        <div style={{ height: '85vh' }} className="d-flex align-items-center justify-content-center">
          <div className="row  align-items-center px-5">
            {/* Left Text Column */}
            <div className="col-lg-6 col-md-12 text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-3">Discover Your Fashion Style</h1>
              <p className="lead mb-4 fw-bold" style={{ color: '#555' }}>Where Every Outfit Tells Your Story</p>
              {
                sessionStorage.getItem("token") ?
                  <Link to={'/login'} className="btn btn-primary btn-lg fw-bold">Explore Now</Link>
                  :
                  <Link to={'/login'} className="btn btn-primary btn-lg fw-bold">Get Started</Link>
              }
            </div>
            {/* Right Image Column */}
            <div className="col-lg-6 col-md-12 text-center">
              <div className="position-relative rounded overflow-hidden bg-danger" style={{ maxWidth: '100%', borderRadius: '25px' }}>
                <img src={LandingImg} alt="Fashion Landing" className="img-fluid" style={{ borderRadius: '15px', maxHeight: '400px', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>


        {/* Categories */}
        <div className='mt-5 text-center'>
          <h1 className='mb-5 display-5 fw-bold'>Our Categories</h1>
          <div className="d-flex justify-content-center">
            <ProductCategory />
          </div>
        </div>
        {/* Products */}
        <div className='mt-5 text-center'>
          <h1 className='mb-5 display-5 fw-bold'>Our Products</h1>
          <div className="d-flex justify-content-center">
            <ProductCard />
          </div>
        </div>

      </div>

    </>
  )
}

export default Home