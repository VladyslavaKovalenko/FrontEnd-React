import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeBattle } from "../../api";
import Player from "./Player";

const Results =()=>{
    const location = useLocation()
    const[loading, setLoading]=useState(true)
    const[error, setError] = useState(null)
    const[winner, setWinner] =useState(null)
    const[loser, setLoser]=useState(null)

    useEffect(()=>{
        const params = new URLSearchParams(location.search)

        makeBattle([params.get('playerOneName'), params.get('playersTwoName')])
            .then(([winner, loser])=>{
                setWinner(winner)
                setLoser(loser)
            })
            .catch(error=>setError(error))
            .finally(()=>setLoading(false))
    },[])

    if(loading){
        return <p>loading...</p>
    } 
    if(error){
        return <p>{error}</p>
    }

    return(
        <div className="row">
            <Player
                label ='Winner'
                score ={winner.score}
                profile ={winner.profile}
            />
            <Player
                label ='Loser'
                score ={loser.score}
                profile ={loser.profile}
            />
        </div>
    )
}

export default Results;