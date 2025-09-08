import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"order",
    initialState:{
        orderData:{}
    },
    reducers:{
        setOrderDetails:(state,action)=>{
            state.orderData = {...state.orderData,...action.payload}
        }
    }
})

export const {setOrderDetails}=slice.actions
export default slice.reducer