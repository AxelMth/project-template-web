import { useContext } from 'react';
import { ModalContext, ModalProviderState } from '../contexts/Modal.context';

export function useModal(): {
  displayModal: ({ title, body, buttons }: ModalProviderState) => void;
  hideModal: () => void;
} {
  const [modalState, setModalState] = useContext(ModalContext);
  function displayModal({ title, body, buttons }: ModalProviderState): void {
    setModalState({
      isActive: true,
      title,
      body,
      buttons,
    });
  }
  function hideModal(): void {
    setModalState({
      ...modalState,
      isActive: false,
    });
  }
  return { displayModal, hideModal };
}

export enum ModalCTA {
  CANCEL = 'CANCEL',
  CONFIRM = 'CONFIRM',
}

export function useConfirmationModal(): (
  body: string | JSX.Element,
) => Promise<ModalCTA> {
  const { displayModal, hideModal } = useModal();
  return (body: string | JSX.Element) =>
    new Promise((resolve) => {
      displayModal({
        isActive: true,
        title: 'Confirmation de la suppression',
        body,
        buttons: [
          {
            label: 'Annuler',
            color: 'light',
            size: 'normal',
            handleClick: () => {
              hideModal();
              resolve(ModalCTA.CANCEL);
            },
          },
          {
            label: 'Oui',
            color: 'danger',
            size: 'normal',
            handleClick: () => {
              hideModal();
              resolve(ModalCTA.CONFIRM);
            },
          },
        ],
      });
    });
}
