// eslint-disable-next-line no-use-before-define
import React from 'react';
import { PropsWithChildren } from '../../types/react.type';

const Loading: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return <div className="p-3">{children}</div>;
};
export default Loading;
