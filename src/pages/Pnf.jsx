import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <>

      <div className="container d-flex justify-content-center align-items-center flex-column" style={{minHeight:'100vh'}}>
        <h1 style={{fontSize:'100px'}} className="fw-bolder">404</h1>
        <img width="350px" src="https://media1.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif?cid=82a1493b3zxdxdx5y635v0tprpgqcu32u07ncui8tytoxe3g&ep=v1_gifs_related&rid=200w.gif&ct=g" alt="" />
        <Link className="btn btn-primary btn-lg" to={'/'}>Home</Link>
      </div>
    </>
  )
}

export default Pnf