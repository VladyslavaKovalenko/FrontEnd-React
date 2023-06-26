import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showBattle } from "../popular/popular.thunk";

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
    loading: true,
    error: null
};

const battleSlice = createSlice({
    name: 'battle',
    initialState,
    reducers:{
        updatePlayerData:(state, action)=>{
            const { id, userName } = action.payload;
            state.playerData = {
                ...state.playerData,
                [`${id}Name`]: userName,
                [`${id}Image`]: `https://github.com/${userName}.png?size200`,
            };
           },
        resetPlayerData:(state, action)=>{
            const { id } = action.payload;
            state.playerData = {
                ...state.playerData,
                [`${id}Name`]: '',
                [`${id}Image`]: null,
        };
        },
        updateBattleResults: (state, action) => {
          const { winner, loser } = action.payload;
                  state.battle = {
                    ...state.battle,
                    winner,
                    loser,
      };
        },
          },
          setLoading: (state, action) => {
            state.loading = action.payload;
          },
    
    extraReducers: (builder) => {
        builder
          .addCase(showBattle.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(showBattle.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
          })
          .addCase(showBattle.rejected, (state, action) => {
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