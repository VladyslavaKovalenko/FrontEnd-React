import { useEffect, useState } from "react";
import Player from "./Player";
import { useSelector, useDispatch } from 'react-redux';
import { showBattle } from "../../state/popular/popular.thunk";
import { updatePlayerData, resetPlayerData, updateBattleResults, setLoading } from "../../state/battle/battle.slice";

const Results =()=>{
  
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { winner, loser } = useSelector((state) => state.battle.battle);

    const playerOneName = useSelector(
      (state) => state.battle.playerData.playerOneName
    );
    const playerTwoName = useSelector(
      (state) => state.battle.playerData.playerTwoName
    );
  
    const loading = useSelector((state) => state.battle.loading);
  

    useEffect(() => {
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