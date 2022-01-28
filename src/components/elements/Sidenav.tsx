// eslint-disable-next-line no-use-before-define
import React from 'react';
import { PropsWithChildren } from '../../types/react.type';
import './Sidenav.scss';

interface SidenavProps extends PropsWithChildren {
  className: string;
  shouldBeDisplayed: boolean;
  depth: 1 | 2;
}

const Sidenav: React.FC<SidenavProps> = ({
  children,
  className,
  depth,
  shouldBeDisplayed,
}: SidenavProps) => {
  return (
    <>
      {(shouldBeDisplayed && (
        <>
          <div
            className={`column ${className}`}
            style={{
              maxWidth:
                (depth === 1 && '250px') || (depth === 2 && '200px') || 'none',
            }}
          >
            <div className={`sidenav is-depth-${depth} p-5`}>{children}</div>
          </div>
        </>
      )) || <>{children}</>}
    </>
  );
};
export default Sidenav;
