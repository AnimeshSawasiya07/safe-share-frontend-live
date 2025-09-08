export const BASE_URL = "http://localhost:3000"

export default {
    SIGN_UP : BASE_URL+"/user/signup",
    SIGN_IN : BASE_URL+"/user/signin",
    GOOGLE_SIGN_IN : BASE_URL+"/user/google-signin",
    CATEGORY_LIST : "/category",
    PRODUCTS_LIST : BASE_URL+"/listing",
    VIEW_PRODUCT :BASE_URL+"/listing",
    SEARCH_PRODUCTS:"/listing/search",
    PLACE_ORDER : "/orderMain/",
    ADD_TO_CART : "/cart/add-to-cart",
    REMOVE_FROM_CART:"/cart/remove",
    PLACE_WHOLE_CART:"/orderMain/place-cart",
    GET_CART : "/cart",
    LIST_ITEM : "/listing",

    MY_ORDERS : "/orderMain",
    ORDERS_ON_MY_LISTING : "/order/seller",
    MY_LISTINGS : "/listing/owner",
    REVIEWS : "/review/user",
    ADD_ADDRESS:"/user/profile/add-address",
    UPDATE_ADDRESS:"/user/profile/update-address",
    REMOVE_ADDRESS:"/user/profile/remove-address",
    UPDATE_USER:"/user/update",
    USER_DETAILS:"/user",
    SEND_RESET_PASSWORD_LINK:"/user/reset-password-link",
    RESET_PASSWORD:"/user/reset-password",
    
}