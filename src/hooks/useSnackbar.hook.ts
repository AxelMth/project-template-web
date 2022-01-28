import { useContext } from 'react';
import { SnackbarContext } from '../contexts/Snackbar.context';
import { DefaultColor } from '../constants/Color';
import { Color } from '../types/color.type';

export default function useSnackbar(): {
  displaySnackbar: (message: string, color: Color) => void;
  hideSnackbar: () => void;
} {
  const [notificationState, setSnackbarState] = useContext(SnackbarContext);
  function displaySnackbar(message: string, color: Color): void {
    setSnackbarState({
      ...notificationState,
      shouldBeDisplayed: true,
      color,
      message,
    });
  }
  function hideSnackbar(): void {
    setSnackbarState({
      ...notificationState,
      shouldBeDisplayed: false,
      color: DefaultColor,
      message: null,
    });
  }
  return { displaySnackbar, hideSnackbar };
}
