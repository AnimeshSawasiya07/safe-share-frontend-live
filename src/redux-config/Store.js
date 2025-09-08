import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js"
import newListingSlice from "./newListingSlice.js"
import orderSlice from "./orderSlice.js"

const store = configureStore({
    reducer:{
        User:userSlice,
        newListing:newListingSlice,
        orderDetails:orderSlice
    }
})

export default store;