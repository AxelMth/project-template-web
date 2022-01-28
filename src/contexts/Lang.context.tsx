// eslint-disable-next-line no-use-before-define
import React, { useState, createContext } from 'react';
import { AvailableLang, Lang } from '../lang/Lang';
import lang from '../lang';
import { PropsWithChildren } from '../types/react.type';

interface LangProviderState {
  currentLang: AvailableLang;
  lang: Lang;
}

const initialState: LangProviderState = {
  currentLang: AvailableLang.Fr,
  lang: lang.fr,
};

export const LangContext = createContext<
  [LangProviderState, React.Dispatch<React.SetStateAction<LangProviderState>>]
>([initialState, () => {}]);

export const LangProvider: React.FC<PropsWithChildren> = (
  props: PropsWithChildren,
) => {
  const [state, setState] = useState<LangProviderState>(initialState);
  const { children } = props;
  return (
    <LangContext.Provider value={[state, setState]}>
      {children}
    </LangContext.Provider>
  );
};
