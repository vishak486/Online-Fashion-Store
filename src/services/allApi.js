import commonApi from "./commonApi";
import SERVER_URL from "./serverURL";

export const registerAPI=async(reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/register`,reqBody)
}

export const loginAPI=async(reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/login`,reqBody)
}

// admin getalluser
export const getAllUserAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/getAllUser`,{},reqHeader)
}
export const userDeleteAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/admin-users/${id}/deleteUser`,{},reqHeader)
}
// Manage Categories
export const addCategoryAPI=async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/add-category`,reqBody,reqHeader)
}
// getAllCategory
export const getAllCategoryAPI=async(searchKey,reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/get-category?search=${searchKey}`,{},reqHeader)
}
// editCategory
export const updateCategoryAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/admin-manage-categories/${id}/edit`,reqBody,reqHeader)
}
// deletecategory
export const deleteCategoryAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/admin-manage-categories/${id}/delete-category`,{},reqHeader)
}


// Manage Products
// addProduct
export const addProductAPI=async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/add-product`,reqBody,reqHeader)
}
// getProduct
export const getAllProductAPI=async(searchKey,reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/get-product?search=${searchKey}`,{},reqHeader)
}
export const updateProductAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/admin-manage-products/${id}/edit`,reqBody,reqHeader)
}
export const updateStockAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/admin-manage-products/${id}/edit-stock`,reqBody,reqHeader)
}
export const deleteProductAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/admin-manage-products/${id}/delete-product`,{},reqHeader)
}