// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Color } from '../../types/color.type';
import { Size } from '../../types/size.type';
import { Dropdown, DropdownItemType } from './Dropdown';

interface NotificationProps {
  message: string;
  type: Color | null;
  height?: number;
  iconOptions?: {
    icon: string;
    size: Size;
    type: Color;
  };
  buttonOptions?: {
    label: string;
    handleClick: () => void;
    type: Color;
  };
  dropdownOptions?: {
    label: string;
    items: DropdownItemType[];
    color: Color;
  };
}

const Notification: React.FC<NotificationProps> = (
  props: NotificationProps,
) => {
  const {
    buttonOptions,
    dropdownOptions,
    height,
    iconOptions,
    message,
    type,
  } = props;
  return (
    <div
      className={`notification ${type ? `is-${type}` : ''} is-light p-6`}
      style={{
        minHeight: `${height}px`,
        textAlign: 'center',
      }}
    >
      <div className="columns is-multiline is-vcentered is-centered">
        <div className="column is-full">
          {/* Icon */}
          {iconOptions && (
            <span
              className={`icon has-text-${iconOptions.type} ${
                iconOptions.size ? `is-${iconOptions.size}` : ''
              } mr-5`}
            >
              <i
                className={`fas ${
                  iconOptions.icon ? `fa-${iconOptions.icon}` : ''
                } fa-2x`}
              />
            </span>
          )}
          {/* Message */}
        </div>
        <div className="column is-full">
          <div className="subtitle is-5">{message}</div>
        </div>
        {/* Button */}
        {buttonOptions && (
          <div className="column is-full">
            <button
              type="button"
              className={`button is-${buttonOptions.type}`}
              onClick={() => buttonOptions?.handleClick()}
            >
              {buttonOptions.label}
            </button>
          </div>
        )}
        {/* Dropdown */}
        {dropdownOptions && (
          <div className="column is-full">
            <Dropdown
              triggerOptions={{
                type: 'button',
                label: dropdownOptions.label,
                color: dropdownOptions.color,
              }}
              items={dropdownOptions.items}
            />
          </div>
        )}
      </div>
    </div>
  );
};
Notification.defaultProps = {
  height: 150,
  iconOptions: undefined,
  buttonOptions: undefined,
  dropdownOptions: undefined,
};
export default Notification;
