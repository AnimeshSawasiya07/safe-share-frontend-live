import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"User-Slice",
    initialState:{
        user:{},
        isLoggedIn:false
    },
    reducers:{
        setUser:(state,action)=>{
            
            state.user = action.payload.user
            state.isLoggedIn=true
        },
        signout:(state,action)=>{
            state.user={},
            state.isLoggedIn=false
        }

    }
}) 

export const {setUser,signout} = slice.actions
export default slice.reducer