import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Cart from './pages/Cart'
import Pnf from './pages/Pnf'

import Footer from './components/Footer'
import Header from './components/Header'

import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/cart' element={<Cart/>}  />
      <Route path='/pnf' element={<Pnf/>}  />
      <Route path='/login' element={<Auth/>}  />
      <Route path='/register' element={<Auth insideRegister={true}/>}  />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
