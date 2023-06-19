import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayerData } from "../../state/battle/battle.action";

const PlayerInput =({id, label})=>{

    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updatePlayerData(id, userName));
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