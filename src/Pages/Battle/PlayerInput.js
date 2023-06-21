import { useState} from "react";
import { useDispatch } from "react-redux";
import { updatePlayerData } from "../../state/battle/battle.action";

const PlayerInput =({id, label})=>{

    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    console.log(userName, `username playerInput`)

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updatePlayerData(id, userName));
        console.log(dispatch(updatePlayerData(id, userName)), `handleSubmit playerInput`)
    };

    return(
        <form className="column" onSubmit={handleSubmit}>
            <label className="header" htmlFor={label}>{label}</label>
            <input 
            id={label}
            type='text'
            placeholder="Github UserName"
            autoComplete="off"
            value={userName}
            onChange={(event)=>
               setUserName(event.target.value)
            }
            />
           <button
           className="button"
           type="submit"
           disabled={!userName.length}
           >
            Submit
           </button>
        </form>
    )
}

export default PlayerInput;