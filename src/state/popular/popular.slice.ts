import { ActionReducerMapBuilder, AnyAction, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { getRepos } from "./popular.thunk";
import { IPopularStore } from "../../types/popular.types";

const initialState:IPopularStore={
    selectedLanguage: 'All',
    loading: false,
    repos: [],
    error: null
}

const popularSlice:Slice<IPopularStore> = createSlice({
    name: 'popular',
    initialState,
    reducers:{
        updateLanguage:(state:IPopularStore, action:AnyAction):void=>{
            state.selectedLanguage = action.payload
        }
    },
    extraReducers: (builder:ActionReducerMapBuilder<IPopularStore>):void=>{
        builder.addCase(getRepos.pending, (state:IPopularStore):void =>{
            state.error=null
            state.loading =true
        });
        builder.addCase(getRepos.fulfilled,
            ( state:IPopularStore, { payload}:AnyAction):void =>{
            state.repos = payload
            state.loading =false
        });
        builder.addCase(getRepos.rejected,
            ( state:IPopularStore, {payload}:AnyAction):void =>{
            state.error=payload
            state.loading =false
        });
    }
})

export const{
    updateLanguage,
} = popularSlice.actions

export default popularSlice.reducer