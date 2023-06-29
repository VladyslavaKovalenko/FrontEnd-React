import { AnyAction } from "redux";
import { UPDATE_PLAYER_DATA, RESET_PLAYER_DATA, UPDATE_BATTLE_RESULTS, SET_LOADING } from "./battle.constants";
import { IRepos } from "../../types/popular.types";

export const updatePlayerData = (id:string, userName:string):AnyAction => ({
    type: UPDATE_PLAYER_DATA,
    payload: { id, userName },
  });

  export const resetPlayerData = (id:string):AnyAction => ({
    type: RESET_PLAYER_DATA,
    payload: { id },
  });

  export const updateBattleResults = (winner:IRepos[]|null, loser:IRepos[]|null):AnyAction => {
    return {
      type: UPDATE_BATTLE_RESULTS,
      winner,
      loser
    };
  };

  export const setLoading = (loading:boolean):AnyAction => ({
    type: SET_LOADING,
    loading
  });
  