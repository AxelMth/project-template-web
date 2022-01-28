// eslint-disable-next-line no-use-before-define
import React, { useState, createContext } from 'react';
import { Color } from '../types/color.type';
import { DefaultColor } from '../constants/Color';
import { PropsWithChildren } from '../types/react.type';

interface SnackbarProviderState {
  shouldBeDisplayed: boolean;
  message: string | null;
  color: Color;
}

const initialState: SnackbarProviderState = {
  shouldBeDisplayed: false,
  color: DefaultColor,
  message: null,
};
export const SnackbarContext = createContext<
  [
    SnackbarProviderState,
    React.Dispatch<React.SetStateAction<SnackbarProviderState>>,
  ]
>([initialState, () => {}]);

export const SnackbarProvider: React.FC<PropsWithChildren> = (
  props: PropsWithChildren,
) => {
  const { children } = props;
  const [state, setState] = useState<SnackbarProviderState>(initialState);
  return (
    <SnackbarContext.Provider value={[state, setState]}>
      {children}
    </SnackbarContext.Provider>
  );
};
