import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayerData, resetPlayerData } from "../../state/battle/battle.action";


const Battle = () =>{

    const dispatch = useDispatch();
    const playerData = useSelector((state) => state.battleReducer.playerData);

    const handleSubmit = (id, userName) => {
    dispatch(updatePlayerData(id, userName));
  };

  const handleReset = (id) => {
    dispatch(resetPlayerData(id));
  };

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
                id='PlayerOne'
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
                id='PlayerTwo'
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