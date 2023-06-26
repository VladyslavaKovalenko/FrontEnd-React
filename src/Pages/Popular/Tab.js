import {useEffect } from "react";
import { getRepos } from "../../state/popular/popular.thunk";
import { useNavigate, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
// import { updateLanguage } from "../../state/popular/popular.action";
import { updateLanguage } from "../../state/popular/popular.slice";

const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

const Tab = () => {

  const dispatch =useDispatch()
  const selectedLanguage=useSelector(state=>state.popular.selectedLanguage)

  const navigate = useNavigate();
  const location = useLocation();

  const hashParams = new URLSearchParams(location.hash.slice(1));
  const selectedLanguageFromHash = hashParams.get('language');
 
  useEffect(() => {
        const updatedHashParams = new URLSearchParams();
        updatedHashParams.set('language', selectedLanguage);
        const updatedHash = `#${updatedHashParams.toString()}`;
        navigate({ hash: updatedHash, replace: true });
      }, [navigate, selectedLanguage]);

  useEffect(()=>{
    dispatch(getRepos(selectedLanguage))
    dispatch(getRepos(selectedLanguageFromHash ||'All'))
  }, [])

  return (
    <ul className="languages">
      {languages.map((language, index) => (
        <li
          key={index}
          style={{ color: language === selectedLanguage ? '#d0021b' : '#000000' }}
          onClick={(() => dispatch(getRepos(language)))}
        >
          {language}
        </li>
      ))}
    </ul>
  );
};

export default Tab;
