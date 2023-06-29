import {FC, ReactElement, useEffect } from "react";
import { getRepos } from "../../state/popular/popular.thunk";
import { useNavigate, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { AppDispatch, RootState } from "../../state/store";
import { NavigateParams } from "../../types/popular.types";

const languages:string[] = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

const Tab:FC = ():ReactElement => {

  const dispatch =useDispatch<AppDispatch>()

  const selectedLanguage:string =useSelector((state:RootState):string=>state.popular.selectedLanguage)

  const navigate = useNavigate();
  const location = useLocation();

  const hashParams = new URLSearchParams(location.hash.slice(1));
  const selectedLanguageFromHash: string|null = hashParams.get('language');
 
  useEffect(():void => {
        const updatedHashParams = new URLSearchParams();
        updatedHashParams.set('language', selectedLanguage);
        const updatedHash:string = `#${updatedHashParams.toString()}`;
        // navigate({ hash: updatedHash, replace: true }); replace with
        const navigateParams: NavigateParams = { hash: updatedHash, replace: true };
        navigate(navigateParams);
      }, [navigate, selectedLanguage]);

  useEffect(():void=>{
    dispatch(getRepos(selectedLanguage))
    dispatch(getRepos(selectedLanguageFromHash ||'All'))
  }, [])

  return (
    <ul className="languages">
      {languages.map((language:string, index:number):ReactElement => (
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
