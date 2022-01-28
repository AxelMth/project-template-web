import { useContext } from 'react';
import { LangContext } from '../contexts/Lang.context';
import { AvailableLang } from '../lang/Lang';
import lang from '../lang';

export default function useLang(): (currentLang: AvailableLang) => void {
  const [langState, setLangState] = useContext(LangContext);
  function setLang(currentLang: AvailableLang): void {
    setLangState({
      ...langState,
      currentLang,
      lang: lang[currentLang],
    });
  }
  return setLang;
}
