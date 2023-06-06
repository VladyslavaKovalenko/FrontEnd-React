import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

const Tab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hashParams = new URLSearchParams(location.hash.slice(1));
  const selectedLanguageFromHash = hashParams.get('language');

  const [selectedLanguage, setselectedLanguage] = useState(selectedLanguageFromHash || 'All');
 
  useEffect(() => {
        const updatedHashParams = new URLSearchParams();
        updatedHashParams.set('language', selectedLanguage);
        const updatedHash = `#${updatedHashParams.toString()}`;
        navigate({ hash: updatedHash, replace: true });
      }, [navigate, selectedLanguage]);

  const handleLanguageClick = language => {
    if (language !== selectedLanguage) {
      setselectedLanguage(language);
    }
  };

  return (
    <ul className="languages">
      {languages.map((language, index) => (
        <li
          key={index}
          style={{ color: language === selectedLanguage ? '#d0021b' : '#000000' }}
          onClick={() => handleLanguageClick(language)}
        >
          {language}
        </li>
      ))}
    </ul>
  );
};

export default Tab;
