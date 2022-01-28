// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import { Color } from '../../types/color.type';
import useSnackbar from '../../hooks/useSnackbar.hook';
import './Snackbar.scss';

interface SnackbarProps {
  shouldDisplay: boolean;
  message?: string;
  color?: Color;
}

const Snackbar: React.FC<SnackbarProps> = ({
  shouldDisplay,
  message,
  color,
}: SnackbarProps) => {
  const { hideSnackbar } = useSnackbar();
  const [animation, setAnimation] = useState('');
  const [isSnackbarDisplayed, setIsSnackbarDisplayed] = useState(false);
  useEffect(() => {
    if (shouldDisplay === true) {
      setIsSnackbarDisplayed(true);
      setAnimation('enter 500ms linear');
      setTimeout(() => {
        setAnimation('leave 500ms linear');
        setTimeout(() => {
          hideSnackbar();
          setIsSnackbarDisplayed(false);
        }, 400);
      }, 2000);
    }
  }, [shouldDisplay]);
  return (
    <>
      {isSnackbarDisplayed && (
        <div
          className={`snackbar ${color ? `is-${color}` : ''}`}
          style={{ animation }}
        >
          <div className="text">{message}</div>
        </div>
      )}
    </>
  );
};
Snackbar.defaultProps = {
  color: 'primary',
  message: undefined,
};
export default Snackbar;
