import React, { createContext, useState } from 'react'
export const viewCategoryResponseContext=createContext()

const CategoryContext = ({children}) => {
    const [forCategories,setForCategories]=useState([])

    const updateCategories=(newCategories)=>{
        // console.log(newCategories);
        
        setForCategories(newCategories)
    }
    
  return (
    <viewCategoryResponseContext.Provider value={{forCategories,updateCategories}}>
        {children}
    </viewCategoryResponseContext.Provider>
  )
}

export default CategoryContext