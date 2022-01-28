// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useModal } from '../../hooks/useModal.hook';
import { Color } from '../../types/color.type';
import { Size } from '../../types/size.type';

export interface PropsModal {
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
const Modal: React.FC<PropsModal> = ({
  isActive,
  title,
  body,
  buttons,
}: PropsModal) => {
  const { hideModal } = useModal();
  return (
    <div className={`modal ${(isActive && 'is-active') || ''}`}>
      <div className="modal-background" />
      <div className="modal-card">
        {title && (
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={hideModal}
            />
          </header>
        )}
        <section className="modal-card-body">{body}</section>
        <footer className="modal-card-foot">
          {buttons.map((button) => (
            <button
              key={`${new Date().toISOString()}__${Math.random()}`}
              type="button"
              className={`button is-${button.size} is-${button.color}`}
              onClick={button.handleClick}
            >
              {button.label}
            </button>
          ))}
        </footer>
      </div>
    </div>
  );
};
export default Modal;
