import { FC, ReactElement } from "react";
import LoaderOverlay from "./Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ErrorT, IRepos, ReposT } from "../../types/popular.types";


const Repositories:FC = ():ReactElement => {

    const loading : boolean= useSelector((state:RootState):boolean=>state.popular.loading)
    const repos: ReposT= useSelector((state:RootState):ReposT=>state.popular.repos)
    const error: ErrorT= useSelector((state:RootState):ErrorT=>state.popular.error)

  return (
    <>
      <ul className="popular-list">
            {repos.map((repo:IRepos, index:number):ReactElement=>{
                return(
                    <li key={repo.id} className="popular-item">
                        <div className="popular-rank">#{index+1}</div>
                        <ul className="space-list-items">
                            <li>
                                <img className="avatar" src={repo.owner.avatar_url} alt="Avatar"/>
                            </li>
                            <li>
                                <a href={repo.html_url} target="_blank">{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count}stars</li>
                        </ul>

                    </li>
                )
                })}
        </ul>
      <LoaderOverlay  active={loading} />
    </>
  );
};

export default Repositories;