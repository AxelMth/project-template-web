// eslint-disable-next-line no-use-before-define
import React from 'react';
import { PropsWithChildren } from '../../types/react.type';
import Jumbotron from './Jumbotron';

interface LoadingProps extends PropsWithChildren {
  isLoading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  children,
  isLoading,
}: LoadingProps) => {
  if (isLoading === true) {
    return (
      <div className="columns is-centered">
        <div className="column is-flex is-justify-content-center is-align-items-center is-fullheight">
          <i className="fas fa-circle-notch fa-spin fa-3x" />
        </div>
      </div>
    );
  }
  return (
    <div className="is-fullheight">
      <Jumbotron>{children}</Jumbotron>
    </div>
  );
};
Loading.defaultProps = {
  isLoading: true,
};
export default Loading;
