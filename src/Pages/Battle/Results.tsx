import { FC, ReactElement, useEffect, useState } from "react";
import Player from "./Player";
import { useSelector, useDispatch } from 'react-redux';
import { showBattle } from "../../state/popular/popular.thunk";
import { updatePlayerData, resetPlayerData, updateBattleResults, setLoading } from "../../state/battle/battle.slice";
import { ErrorT, IRepos } from "../../types/popular.types";
import { AppDispatch, RootState } from "../../state/store";

const Results:FC =():ReactElement=>{
  
    const [error, setError] = useState<ErrorT>(null);

    const dispatch = useDispatch<AppDispatch>();

    const { winner, loser } = useSelector((state:RootState):IRepos => state.battle.battle);

    const playerOneName:string = useSelector(
      (state:RootState):string => state.battle.playerData.playerOneName
    );
    const playerTwoName:string = useSelector(
      (state:RootState):string => state.battle.playerData.playerTwoName
    );
  
    const loading:boolean = useSelector((state:RootState):boolean => state.battle.loading);
  

    useEffect(():void => {
      dispatch(showBattle( {playerOneName, playerTwoName} ));
    }, []);


    if(loading){
        return <p>Loading...</p>
    }
    
    if(error){
        return <p>{error}</p>
    }

    return(
        <div className="row">
            
           {winner && loser?
           <>
           <Player
           label ='Winner'
           player={winner} 
       />
           <Player
               label ='Loser'
               player={loser} 
           /> 
           </>
           :null}
        </div>
    )
}

export default Results;