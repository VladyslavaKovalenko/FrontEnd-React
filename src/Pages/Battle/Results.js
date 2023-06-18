import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeBattle } from "../../api";
import Player from "./Player";
import { useSelector, useDispatch } from 'react-redux';
import { updateBattleResults } from "../../state/battle/battle.action";
import { performBattle } from "../../state/popular/popular.thunk";

const Results =()=>{

    const location = useLocation();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const playerOneName = useSelector((state) => state.battleReducer.playerData.playerOneName);
    const playerTwoName = useSelector((state) => state.battleReducer.playerData.playerTwoName);

    useEffect(() => {
      dispatch(performBattle(location, playerOneName, playerTwoName));
    }, [dispatch, location, playerOneName, playerTwoName]);
  
    
      if (loading) {
        return <p>loading...</p>;
      }
      if (error) {
        return <p>{error}</p>;
      }

    return(
        <div className="row">
            <Player label="Winner" />
            <Player label="Loser" />
        </div>
    )
}

export default Results;