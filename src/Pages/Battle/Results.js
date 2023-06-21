import { useEffect, useState } from "react";
import Player from "./Player";
import { useSelector, useDispatch } from 'react-redux';
import { showBattle } from "../../state/popular/popular.thunk";

const Results =()=>{
    const[error, setError] = useState(null)

    const dispatch = useDispatch()
    const winner = useSelector(state=>state.battleReducer.battle.winner)
    const loser = useSelector(state=>state.battleReducer.battle.loser)

    const playerOneName = useSelector(state=>state.battleReducer.playerData.playerOneName)
    const playerTwoName = useSelector(state=>state.battleReducer.playerData.playerTwoName)
    
    const battle = useSelector(state=>state.battleReducer.battle)
    const loading =useSelector(state=>state.battleReducer.loading)

    useEffect(() => {
        dispatch(showBattle(playerOneName, playerTwoName))
      }, []);

    if(loading){
        return <p>Loading...</p>
    }
    
    if(error){
        return <p>{error}</p>
    }

    return(
        <div className="row">
            
           {winner&&loser?
           <>
           <Player
           label ='Winner'
           player={battle.winner} 
       />
           <Player
               label ='Loser'
               player={battle.loser} 
           /> 
           </>
           :null}
        </div>
    )
}

export default Results;