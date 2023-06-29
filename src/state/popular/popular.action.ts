import { Action, AnyAction } from "redux"
import { GET_REPOS_FAILURE, GET_REPOS_LOADING, GET_REPOS_SUCCESS, SET_SELECTED_LANGUAGE } from "./popular.constants"
import { ReposT } from "../../types/popular.types"

export const getReposLoadingAction=():Action=>({
    type: GET_REPOS_LOADING
})

export const getReposSuccessAction=(payload:ReposT):AnyAction=>({
    type: GET_REPOS_SUCCESS,
    payload
})

export const getReposFailureAction=(payload:string):AnyAction=>({
    type: GET_REPOS_FAILURE,
    payload
})

