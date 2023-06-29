import { isImportClause } from "typescript"
import { SET_SELECTED_LANGUAGE } from "./popular.constants"
import { GET_REPOS_FAILURE, GET_REPOS_LOADING, GET_REPOS_SUCCESS } from "./popular.constants"
import { IPopularStore } from "../../types/popular.types"
import { AnyAction } from "redux"

const initialState:IPopularStore={
    selectedLanguage: 'All',
    loading: false,
    repos: [],
    error: null
}

export const popularReducer =(state:IPopularStore  = initialState, action:AnyAction) : IPopularStore=>{
    switch(action.type){
        case SET_SELECTED_LANGUAGE:
            return{
                ...state,
                selectedLanguage:action.payload,
            }
        
        case GET_REPOS_LOADING:
            return{
                 ...state,
                error:null,
                loading: true,
            }

        case GET_REPOS_SUCCESS:
            return{
                 ...state,
                loading: false,
                repos: action.payload
            }
        case GET_REPOS_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default popularReducer;