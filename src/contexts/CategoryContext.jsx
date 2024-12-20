import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAllCategoryAPI } from '../services/allApi';
import { AuthResponseContext } from '../contexts/AuthContext'; 


export const viewCategoryResponseContext=createContext()

const CategoryContext = ({children}) => {
    const { isLoged, setIsloged } = useContext(AuthResponseContext);
  const [Categories, setCategories] = useState([])
  const [searchKey,setSearchKey]=useState("")
  useEffect(()=>{
    if(isLoged)
    {
        getAllCategories()
    }
      
  },[searchKey,isLoged])


  const getAllCategories = async () => {
      const token = sessionStorage.getItem("token")
      if (token) {
          const reqHeader = {
              "Authorization": `Bearer ${token}`
          }
          try {
              const result = await getAllCategoryAPI(searchKey,reqHeader)
              if (result.status == 200) {
                  setCategories(result.data)
                  
              }

          }
          catch (err) {
              console.log(err)
          }
      }
  }
    
  return (
    <viewCategoryResponseContext.Provider
            value={{
              Categories,
                getAllCategories,
                searchKey,
                setSearchKey,
            }}
        >
            {children}
        </viewCategoryResponseContext.Provider>
  )
}

export default CategoryContext