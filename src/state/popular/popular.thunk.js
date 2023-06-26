import { fetchPopularrepos } from "../../api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateLanguage } from "./popular.slice"
import { updateBattleResults, setLoading } from "../battle/battle.slice"
import { makeBattle, getUserData } from "../../api"

export const getRepos=createAsyncThunk(
  'popular/getRepos',
  async(selectedLanguage, {rejectWithValue, dispatch})=>{
    dispatch(updateLanguage(selectedLanguage))
    try{
      return await fetchPopularrepos(selectedLanguage)
    }
    catch(error){
      return rejectWithValue(error)
    }
  }
)

export const showBattle = createAsyncThunk(
  'battle/showBattle',
  async ( payload, { dispatch }) => {
    const { playerOneName, playerTwoName } = payload;
    try {
      const [ winner, loser ] = await makeBattle([playerOneName, playerTwoName]);
      dispatch(updateBattleResults({ winner, loser })); 
      dispatch(setLoading(false));
    } catch (error) {
    }
  }
);
