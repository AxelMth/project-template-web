// eslint-disable-next-line no-use-before-define
import React, { useState, createContext } from 'react';
import { Color } from '../types/color.type';
import { PropsWithChildren } from '../types/react.type';
import { Size } from '../types/size.type';

export interface ModalProviderState {
  isActive: boolean;
  title: string;
  body: string | JSX.Element;
  buttons: {
    label: string;
    color: Color;
    size: Size;
    handleClick: () => void;
  }[];
}

const initialState: ModalProviderState = {
  isActive: false,
  title: '',
  body: '',
  buttons: [],
};

export const ModalContext = createContext<
  [ModalProviderState, React.Dispatch<React.SetStateAction<ModalProviderState>>]
>([initialState, () => {}]);

export const ModalProvider: React.FC<PropsWithChildren> = (
  props: PropsWithChildren,
) => {
  const { children } = props;
  const [state, setState] = useState<ModalProviderState>(initialState);
  return (
    <ModalContext.Provider value={[state, setState]}>
      {children}
    </ModalContext.Provider>
  );
};
