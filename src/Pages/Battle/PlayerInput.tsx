import { ChangeEvent, FC, FormEvent, ReactElement, useState} from "react";
import { useDispatch } from "react-redux";
import { updatePlayerData } from "../../state/battle/battle.slice";

interface IProp{
    id:string,
    label:string,
    onSubmit:(id:string, userName:string)=>void
}

const PlayerInput:FC<IProp> =({id, label, onSubmit}):ReactElement=>{

    const dispatch = useDispatch();
    const [userName, setUserName] = useState<string>('');

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault();
        dispatch(updatePlayerData({ id, userName }));
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
            onChange={(event:ChangeEvent<HTMLInputElement>)=>
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