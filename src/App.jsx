import { useContext, useEffect, useState } from 'react'
import './App.css'
import { AuthResponseContext } from './contexts/AuthContext'; 
import Home from './pages/Home'
import Auth from './pages/Auth'
import Cart from './pages/Cart'
import Pnf from './pages/Pnf'
import View from './components/View'
import Profile from './components/Profile'
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products'
import OrderSummary from './pages/orderSummary';
import Footer from './components/Footer'
import Header from './components/Header'

import AdminDashboard from './pages/AdminDashboard'
import AdminUserList from './pages/AdminUserList'
import AdminManageProduct from './pages/AdminManageProduct'
import AdminManageCategory from './pages/AdminManageCategory'
import AdminOrderHistory from './pages/AdminOrderHistory';
import AdminManageContact from './pages/AdminManageContact';



import { Navigate, Route, Routes, useLocation } from 'react-router-dom'



function App() {
  // const [isLoged, setIsloged] = useState(!!sessionStorage.getItem("user"))
  const { isLoged, setIsloged } = useContext(AuthResponseContext);
  const location=useLocation()
  const hideHeader=['/admin']
  const hideFooter = ['/admin'];

  useEffect(() => {
    // setIsloged(!!sessionStorage.getItem("user"))
  }, [location,setIsloged])

  const shouldHide = (hiddenRoutes) => hiddenRoutes.some(route => location.pathname.startsWith(route));

  const ProtectedRoute = ({ element }) => {
    return isLoged ? element : <Navigate to="/login" replace />;
  };
  const AdminProtectedRoute = ({ element }) => {
    const user = JSON.parse(sessionStorage.getItem('user')); 
    return user?.role === 'admin' ? element : <Navigate to="/login" replace />;
  };
  return (
    <>
    {!shouldHide(hideHeader) && <Header isLoged={isLoged} setIsloged={setIsloged} />}
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/cart' element={<ProtectedRoute element={<Cart />} />}  />
      <Route path='/orderHistory' element={<ProtectedRoute element={<OrderSummary />} />}  />
      <Route path='/:id/view'  element={<ProtectedRoute element={<View />} />} />
      <Route path='/profile' element={<ProtectedRoute element={<Profile />} />}  />
      <Route path='/products'  element={<Products />}   />
      <Route path='/about'  element={<About />}   />
      <Route path='/contact'  element={<Contact />}   />
      <Route path='/*' element={<Pnf/>}  />
      <Route path="/admin" element={<AdminProtectedRoute element={<AdminDashboard />} />} />

      <Route path="/admin-users" element={<AdminProtectedRoute element={<AdminUserList />} />} />
      <Route path="/admin-manage-products" element={<AdminProtectedRoute element={<AdminManageProduct />} />} />
      <Route path="/admin-manage-categories" element={<AdminProtectedRoute element={<AdminManageCategory />} />} />
      <Route path="/admin-order-history" element={<AdminProtectedRoute element={<AdminOrderHistory />} />} />
      <Route path="/admin-manage-contact" element={<AdminProtectedRoute element={<AdminManageContact/>} />} />

      <Route path='/login' element={<Auth setIsloged={setIsloged}/>}  />
      <Route path='/register' element={<Auth insideRegister={true} setIsloged={setIsloged}/>}  />
    </Routes>
    {!shouldHide(hideFooter) && <Footer />}
    </>
  )
}

export default App
