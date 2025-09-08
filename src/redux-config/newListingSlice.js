import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"add-new-listing",
    initialState:{
        addListing:{}
    },
    reducers:{
        newListing:(state,action)=>{
           state.addListing = {...state.addListing,...action.payload}
        }
    }
})

export const {newListing} = slice.actions
export default slice.reducer