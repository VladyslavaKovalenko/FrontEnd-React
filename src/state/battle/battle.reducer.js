import { UPDATE_PLAYER_DATA, RESET_PLAYER_DATA, UPDATE_BATTLE_RESULTS } from "./battle.constants";

const initialState = {
    playerData: {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null,
    },
    battle: {
        winner: null,
        loser: null,
      },
  };
  
export const battleReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PLAYER_DATA: {
        const { id, userName } = action.payload;
        return {
          ...state,
          playerData: {
            [`${id}Name`]: userName,
            [`${id}Image`]: `https://github.com/${userName}.png?size200`,
          },
        };
      }
      case RESET_PLAYER_DATA: {
        const { id } = action.payload;
        return {
          ...state,
          playerData: {
            ...state.playerData,
            [`${id}Name`]: "",
            [`${id}Image`]: null,
          },
        };}
    case UPDATE_BATTLE_RESULTS: {
        return {
            ...state,
            battle: {
              ...state.battle,
              winner: action.winner,
              loser: action.loser,
            },
          };
    }
      default:
        return state;
    }
  };


