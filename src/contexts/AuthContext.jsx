import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const AuthResponseContext =createContext()

const AuthContext = ({children}) => {
    const [isLoged, setIsloged]=useState(!!sessionStorage.getItem("user"))
    

    useEffect(() => {
        setIsloged(!!sessionStorage.getItem("user"));
      },[]);

  return (
    <AuthResponseContext.Provider value={{ isLoged, setIsloged }}>
      {children}
    </AuthResponseContext.Provider>
  )
}

export default AuthContext