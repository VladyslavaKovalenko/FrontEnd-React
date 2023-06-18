import { fetchPopularrepos } from "../../api"
import { getReposFailureAction, getReposLoadingAction, getReposSuccessAction, updateLanguage } from "./popular.action"
import { updateBattleResults } from "../battle/battle.action"
import { makeBattle } from "../../api"

export const getRepos =(selectedLanguage)=>(dispatch)=>{
    dispatch(getReposLoadingAction())
    dispatch(updateLanguage(selectedLanguage))

    fetchPopularrepos(selectedLanguage)
    .then(data=>dispatch(getReposSuccessAction(data)))
    .catch(error=>dispatch(getReposFailureAction(error)))
}

export const performBattle = (location, playerOneName, playerTwoName) => {
    return (dispatch) => {

      const params = new URLSearchParams(location.search);
  
      makeBattle([playerOneName, playerTwoName])
        .then(([winner, loser]) => {
          dispatch(updateBattleResults(winner, loser));
        })
        .catch((error) => {
          throw new Error(error)
        })
    };
  };