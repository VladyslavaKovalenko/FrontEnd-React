import { Link } from "react-router-dom";
import PlayerPreview from "./PlayerPreview";
import { memo } from "react";

const Player =memo(({label, player})=>{
    return(
        <div>
            <h1 className="header">{label}</h1>
            <h3 style={{textAlign:'center'}}>Score: {player.score}</h3>
            <PlayerPreview avatar={player.profile.avatar_url} username={player.profile.login}>
                 <ul className="space-list-items">
                    {player.profile.name?<li>{player.profile.name}</li>:null}
                    {player.profile.location?<li>{player.profile.location}</li>:null}
                    {player.profile.company?<li>{player.profile.company}</li>:null}
                    <li>Followers: {player.profile.followers}</li>
                    <li>Following: {player.profile.following}</li>
                    <li>Public Repos: {player.profile.public_repos}</li>
                    {player.profile.blog?<li>
                        <Link to={player.profile.blog} target ='_blank'>{player.profile.blog}</Link>
                    </li>:null}
                </ul> 
            </PlayerPreview>
        </div>
    )
})

export default Player;