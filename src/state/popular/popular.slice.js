import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRepos } from "./popular.thunk";
const initialState={
    selectedLanguage: 'All',
    loading: false,
    repos: [],
    error: null
}

const popularSlice = createSlice({
    name: 'popular',
    initialState,
    reducers:{
        updateLanguage:(state, action)=>{
            state.selectedLanguage = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getRepos.pending, state =>{
            state.error=null
            state.loading =true
        });
        builder.addCase(getRepos.fulfilled,
            ( state, { payload}) =>{
            state.repos = payload
            state.loading =false
        });
        builder.addCase(getRepos.rejected,
            ( state, {payload}) =>{
            state.error=payload
            state.loading =false
        });
    }
})

export const{
    updateLanguage,
} = popularSlice.actions

export default popularSlice.reducer