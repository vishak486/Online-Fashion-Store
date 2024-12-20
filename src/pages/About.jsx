import React from 'react'

const About = () => {
  return (
    <div  style={{ paddingTop: "100px" }} className="container my-5 px-4 mx-auto">
     {/* Welcome Section */}
     <div className="row align-items-center text-dark bg-light rounded shadow-lg p-4">
        <div className="col-lg-6 text-center">
          <img
            className="img-fluid rounded"
            src="https://t4.ftcdn.net/jpg/05/93/76/93/360_F_593769347_XTZ3b2RzbKlG9iNKrN4H0UGcURnmEYEa.jpg"
            alt="Fashion Store Welcome"
            style={{ maxHeight: "450px" }}
          />
        </div>
        <div className="col-lg-6 px-4">
          <h1 className="fw-bold">Welcome To Fashion Store</h1>
          <p className="lead my-3">
            Discover the latest trends in fashion with exclusive collections.{" "}
            <br /> Shop the best styles at your fingertips.
          </p>
          <a href="#collections" className="btn btn-dark">
            Explore Now
          </a>
        </div>
      </div>

      {/* About Us Section */}
      <div className="row align-items-center text-dark rounded shadow-lg p-4 mt-5">
        <div className="col-lg-6 order-lg-2 text-center">
          <img
            className="img-fluid rounded"
            src="https://i.pinimg.com/736x/e6/ab/34/e6ab3444bdc8dac8c0d1f35cb154c962.jpg"
            alt="About Us Fashion Store"
            style={{ maxHeight: "350px" }}
          />
        </div>
        <div className="col-lg-6 order-lg-1 px-4">
          <h1 className="fw-bold mb-3">About Us</h1>
          <p className="my-3">
            At <b>Fashion Store</b>, we believe fashion is an art. Our curated
            collections are designed to help you express yourself effortlessly.
            We bring you premium styles for every occasion.
          </p>
          <ul className="list-unstyled">
            <li className="mb-2">
              <i className="fas fa-check-circle text-success me-2"></i> Exclusive
              designs tailored for every occasion
            </li>
            <li className="mb-2">
              <i className="fas fa-check-circle text-success me-2"></i> Premium
              quality materials and craftsmanship
            </li>
            <li className="mb-2">
              <i className="fas fa-check-circle text-success me-2"></i> Affordable
              prices without compromising style
            </li>
            <li>
              <i className="fas fa-check-circle text-success me-2"></i> Fast
              delivery and top-notch customer satisfaction
            </li>
          </ul>
          <a href="#learn-more" className="btn btn-primary">
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

export default About