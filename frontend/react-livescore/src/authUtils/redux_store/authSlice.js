import {createSlice} from '@reduxjs/toolkit';


const authSlice= createSlice({
    name:'auth',
    initialState:{
        isAuthenticated:localStorage.getItem('isAuthenticated') || null,
        username:localStorage.getItem('username') || null,
        avatar:localStorage.getItem('avatar') || null
    },
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.username=action.payload;
            state.avatar=action.payload;
        },
        logout:(state,action)=>{
            state.isAuthenticated=false;
            state.username=null
            state.avatar=null
        },
    },
});

export const {login,logout}= authSlice.actions;
export default authSlice.reducer;