import { fetchPopularrepos } from "../../api"
import { getReposFailureAction, getReposLoadingAction, getReposSuccessAction, updateLanguage } from "./popular.action"
import { updateBattleResults } from "../battle/battle.action"
import { makeBattle } from "../../api"
import { setLoading } from "../battle/battle.action"

export const getRepos =(selectedLanguage)=>(dispatch)=>{
    dispatch(getReposLoadingAction())
    dispatch(updateLanguage(selectedLanguage))

    fetchPopularrepos(selectedLanguage)
    .then(data=>dispatch(getReposSuccessAction(data)))
    .catch(error=>dispatch(getReposFailureAction(error)))
}

export const showBattle = (playerOneName, playerTwoName) => (dispatch) => {

  dispatch(setLoading(true));

  makeBattle([playerOneName, playerTwoName])
    .then(([winner, loser]) => {
      dispatch(updateBattleResults(winner, loser));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setLoading(false));
    })
};
