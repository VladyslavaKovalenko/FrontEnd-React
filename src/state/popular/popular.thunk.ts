// import { fetchPopularrepos } from "../../api"
import { fetchPopularRepos } from "../../api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateLanguage } from "./popular.slice"
import { updateBattleResults, setLoading } from "../battle/battle.slice"
import { makeBattle } from "../../api"

export const getRepos=createAsyncThunk(
  'popular/getRepos',
  async(selectedLanguage:string, {rejectWithValue, dispatch}):Promise<any>=>{
    dispatch(updateLanguage(selectedLanguage))
    try{
      return await fetchPopularRepos(selectedLanguage)
    }
    catch(error){
      return rejectWithValue(error)
    }
  }
)

export const showBattle = createAsyncThunk(
  'battle/showBattle',
  async (payload: {
    playerOneName: string;
    playerTwoName: string;
  }, { dispatch }): Promise<void> => {
    const { playerOneName, playerTwoName } = payload;
    try {
      const [winner, loser] = await makeBattle([playerOneName, playerTwoName]);
      dispatch(updateBattleResults({ winner, loser }));
      dispatch(setLoading(false));
    } catch (error) {
      throw new Error()
    }
  }
);
