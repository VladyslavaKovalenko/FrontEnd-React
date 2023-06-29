import { ActionReducerMapBuilder, AnyAction, createSlice, Slice } from "@reduxjs/toolkit";
import { showBattle } from "../popular/popular.thunk";
import { IBattleStore } from "../../types/battle.types";

const initialState:IBattleStore = {
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
    error: null
};

const battleSlice:Slice<IBattleStore> = createSlice({
    name: 'battle',
    initialState,
    reducers:{
        updatePlayerData:(state:IBattleStore, action:AnyAction):void=>{
            const { id, userName } = action.payload;
            state.playerData = {
                ...state.playerData,
                [`${id}Name`]: userName,
                [`${id}Image`]: `https://github.com/${userName}.png?size200`,
            };
           },
        resetPlayerData:(state:IBattleStore, action:AnyAction):void=>{
            const { id } = action.payload;
            state.playerData = {
                ...state.playerData,
                [`${id}Name`]: '',
                [`${id}Image`]: null,
        };
        },
        updateBattleResults: (state:IBattleStore, action:AnyAction):void => {
          const { winner, loser } = action.payload;
                  state.battle = {
                    ...state.battle,
                    winner,
                    loser,
      };
        },
        setLoading: (state:IBattleStore, action:AnyAction):void => {
            state.loading = action.payload;
          }
        },
    
    extraReducers: (builder:ActionReducerMapBuilder<IBattleStore>):void => {
        builder
          .addCase(showBattle.pending, (state:IBattleStore):void => {
            state.loading = true;
            state.error = null;
          })
          .addCase(showBattle.fulfilled, (state:IBattleStore):void => {
            state.loading = false;
            state.error = null;
          })
          .addCase(showBattle.rejected, (state:IBattleStore, action:AnyAction):void => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
})

export const{
    updatePlayerData,
    resetPlayerData,
    updateBattleResults,
    setLoading
} = battleSlice.actions

export default battleSlice.reducer