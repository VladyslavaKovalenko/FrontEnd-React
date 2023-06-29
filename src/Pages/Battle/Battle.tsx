import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayerData, resetPlayerData } from "../../state/battle/battle.slice";
import { FC, ReactElement } from "react";
import { AppDispatch, RootState } from "../../state/store";

interface PlayerData {
    playerOneName: string,
    playerOneImage: string | null,
    playerTwoName: string,
    playerTwoImage: string | null,
  }

const Battle :FC= () :ReactElement=>{

    const dispatch = useDispatch<AppDispatch>();
    
    const playerData:PlayerData = useSelector<RootState, PlayerData>((state) => state.battle.playerData);

    const handleSubmit = (id:string, userName:string):void => {
    dispatch(updatePlayerData({id, userName}))
    }

  const handleReset = (id:string):void => {
    dispatch(resetPlayerData(id))
    }

    return(
        <div>
        <div className="row">
        {playerData.playerOneImage  ?
            <PlayerPreview
                avatar ={playerData.playerOneImage}
                userName={playerData.playerOneName}
                >
                <button className="reset" onClick={()=>handleReset("playerOne")}>Reset</button>
                </PlayerPreview>:
             <PlayerInput
                id='playerOne'
                label='Player 1'
                onSubmit ={handleSubmit}
            /> }
            
          {playerData.playerTwoImage?  
           <PlayerPreview
                avatar ={playerData.playerTwoImage}
                userName={playerData.playerTwoName}
           >
            <button className="reset" onClick={()=>handleReset('playerTwo')}>Reset</button>
           </PlayerPreview>:
             <PlayerInput 
                id='playerTwo'
                label='Player 2'
                onSubmit ={handleSubmit}
            />}
        </div> 
         {playerData.playerOneImage && playerData.playerTwoImage ?
            <Link to={{
                pathname:'results',
                search:`?playerOneName=${playerData.playerOneName}&playerTwoName=${playerData.playerTwoName}`
        }} 
            className="button">
                Battle
            </Link> :
            null
    }
        </div>
    )
}

export default Battle;