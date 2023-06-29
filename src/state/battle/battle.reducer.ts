import { UPDATE_PLAYER_DATA, RESET_PLAYER_DATA, UPDATE_BATTLE_RESULTS, SET_LOADING } from "./battle.constants";
import { IBattleStore } from "../../types/battle.types";
import { AnyAction } from "redux";

const initialState: IBattleStore = {
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
    loading: true,
    error:null
    
  };
  
export const battleReducer = (state:IBattleStore = initialState, action:AnyAction) => {
    switch (action.type) {
      case UPDATE_PLAYER_DATA: {
        const { id, userName } = action.payload;
        console.log(action.payload, `action payload reducer`)
        return {
          ...state,
          playerData: { 
            // нужно для того, чтобы предыдущие данные не сбрасывались и сохранялтсь с новыми
            ...state.playerData,
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
              winner:action.winner,
              loser: action.loser
            },
          };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading
      };
    }
      default:
        return state;
    }
  };


