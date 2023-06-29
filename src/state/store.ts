import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import popular from './popular/popular.slice';
import battle from './battle/battle.slice';
import { createLogger } from "redux-logger"

const store = configureStore({
    reducer:{
        popular,
        battle
    },
    middleware: ()=>
        getDefaultMiddleware().concat(
            createLogger({
                collapsed:true
            })
        )
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;