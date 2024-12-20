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

// getAllHomeProducts
export const getHomeProductsAPI=async()=>{
    return await commonApi("GET",`${SERVER_URL}/home-products`,{})
}
// getSingleProductDetails
export const getSingleProductsAPI=async(id,reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/product/${id}/view`,{},reqHeader) 
}
// getAllProducts for products page
export const fetchAllProductsAPI=async(searchKey,categoryName)=>{
    return await commonApi("GET",`${SERVER_URL}/all-products?search=${searchKey}&category=${categoryName}`,{})
}

export const FetchCategoryAPI=async()=>{
    return await commonApi("GET",`${SERVER_URL}/fetch-category`,{})
}
// addtoCartAPI
export const addToCartAPI=async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/addToCart`,reqBody,reqHeader)
}
// getCartDetailsAPI
export const getCartDetailsAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/getToCart`,{},reqHeader)
}
// deleteCartDetailsAPI
export const deleteCartDetailsAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/deleteCart/${id}`,{},reqHeader)
}
// emptyCartAPI
export const emptyCartAPI=async(reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/emptyCart`,{},reqHeader)
}

// updateCartQuantityAPI 
export const updateCartQuantityAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/updateCart/${id}`,reqBody,reqHeader)
}

// getProfileDetailsAPI
export const getProfileDetailsAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/getUserProfile`,{},reqHeader)
}
export const updateUserAPI=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/editUserProfile`,reqBody,reqHeader)
}
// validateUserProfileAPI
export const validateUserProfileAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/validateUserProfile`,{},reqHeader)
}
export const orderPlaceAPI=async(reqBody,reqHeader)=>{
    return await commonApi("POST", `${SERVER_URL}/placeOrder`,reqBody,reqHeader);
  }
// getOrderPlaceAPI
export const getOrderPlaceAPI=async(searchKey,reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/getPlaceOrder?search=${searchKey}`,{},reqHeader)
}
// getAdminOrderHistoryAPI 
export const getAdminOrderHistoryAPI =async(searchKey,reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/adminGetPlaceOrder?search=${searchKey}`,{},reqHeader)
}

// updateOrderStatusAPI 
export const updateOrderStatusAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/orders/${id}/status`,reqBody,reqHeader)
}
  

// addContactAPI
export const addContactAPI=async(reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/add-contact`,reqBody)
}

// admin getAllContactAPI
export const getAllContactAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/get-contact`,{},reqHeader)
}
// updateContactStatusAPI 
export const updateContactStatusAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/admin-manage-contact/${id}/edit`,reqBody,reqHeader)
}
// deleteContactAPI
export const deleteContactAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/admin-manage-contact/${id}/delete`,{},reqHeader)
}

export const fetchApprovedContactsAPI =async()=>{
    return await commonApi("GET",`${SERVER_URL}/display-contact`,{})
}
export const fetchAdminDashboardAPI =async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/adminDashboard`,{},reqHeader)
}