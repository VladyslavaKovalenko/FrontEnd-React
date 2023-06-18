import { UPDATE_PLAYER_DATA, RESET_PLAYER_DATA, UPDATE_BATTLE_RESULTS } from "./battle.constants";

export const updatePlayerData = (id, userName) => ({
    type: UPDATE_PLAYER_DATA,
    payload: { id, userName },
  });
  
  export const resetPlayerData = (id) => ({
    type: RESET_PLAYER_DATA,
    payload: { id },
  });

  export const updateBattleResults = (winner, loser) => {
    return {
      type: UPDATE_BATTLE_RESULTS,
      winner,
      loser
    };
  };
