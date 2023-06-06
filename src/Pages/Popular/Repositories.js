import React, { useState, useEffect } from "react";
import { fetchPopularrepos } from "../../api";
import { useLocation } from 'react-router-dom';
import LoaderOverlay from "./Loader";

const Repositories = () => {
  const location = useLocation();
  const hashParams = new URLSearchParams(location.hash.slice(1));
  const selectedLanguageFromHash = hashParams.get('language');

  const [selectedLanguage, setselectedLanguage] = useState(selectedLanguageFromHash || 'All');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tabSwitching, setTabSwitching] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTabSwitching(true);
    fetchPopularrepos(selectedLanguage)
      .then(data => setRepos(data))
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false);
        setTabSwitching(false);
      });
  }, [selectedLanguage]);

  useEffect(() => {
    setselectedLanguage(selectedLanguageFromHash || 'All');
  }, [selectedLanguageFromHash]);

  return (
    <>
      <ul className="popular-list">
            {repos.map((repo, index)=>{
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
                            <li>{repo.stargazers_count} stars</li>
                        </ul>

                    </li>
                )
                })}
        </ul>
      <LoaderOverlay active={loading || tabSwitching} />
    </>
  );
};

export default Repositories;
