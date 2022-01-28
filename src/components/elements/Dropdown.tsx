// eslint-disable-next-line no-use-before-define
import React, { Fragment } from 'react';
import { Color } from '../../types/color.type';
import { Size } from '../../types/size.type';

type DropdownItem = {
  label: string;
  color?: Color;
  handleClick?: (ids?: string[]) => void;
  hasSeparation?: boolean;
  shouldBeDisplayed?: boolean;
};
export type DropdownCheckboxItem = DropdownItem & {
  type: 'checkbox';
  isChecked?: boolean;
};
export type DropdownClickableItem = DropdownItem & {
  type: 'text';
};
export type DropdownItemType = DropdownClickableItem | DropdownCheckboxItem;

export type DropdownButtonTrigger = {
  type: 'button';
  label: string;
  className?: string;
  size?: Size;
  color?: Color;
};
export type DropdownIconTrigger = {
  type: 'icon';
  icon: string;
  className?: string;
  size?: Size;
  color?: Color;
};
export type DropdownTextTrigger = {
  type: 'text';
  label: string;
  className?: string;
  size?: Size;
  color?: Color;
  activeColor?: Color;
};
export type DropdownTriggerType =
  | DropdownButtonTrigger
  | DropdownIconTrigger
  | DropdownTextTrigger;
interface DropdownProps {
  triggerOptions: DropdownTriggerType;
  items: DropdownItemType[];
  badgeOptions?: {
    value: number;
    color?: Color | 'white';
  };
  isDisabled?: boolean;
  float?: 'right' | 'left';
}

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { badgeOptions, isDisabled, items, float, triggerOptions } = props;
  let textTriggerColor = triggerOptions.color;
  if (
    triggerOptions.type === 'text' &&
    triggerOptions.activeColor &&
    badgeOptions &&
    badgeOptions.value &&
    badgeOptions.value > 0
  ) {
    textTriggerColor = triggerOptions.activeColor;
  }
  return (
    <div className={`dropdown is-hoverable is-${float}`}>
      {/* Dropdown trigger */}
      <div className="dropdown-trigger">
        {/* Button trigger */}
        {triggerOptions.type === 'button' && (
          <button
            type="button"
            className={`button ${triggerOptions.className} ${
              triggerOptions.color ? `is-${triggerOptions.color}` : ''
            } ${triggerOptions.size ? `is-${triggerOptions.size}` : ''}`}
            disabled={isDisabled}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{triggerOptions.label}</span>
            {badgeOptions && badgeOptions.value > 0 && (
              <span
                className={`tag ${
                  badgeOptions?.color ? `is-${badgeOptions.color}` : ''
                } ml-2 is-rounded`}
              >
                {badgeOptions.value}
              </span>
            )}
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        )}
        {/* Icon trigger */}
        {triggerOptions.type === 'icon' && (
          <span
            className={`icon ${
              triggerOptions.size ? `is-${triggerOptions.size}` : ''
            } has-text-${triggerOptions.color}`}
          >
            <i className={`fas fa-${triggerOptions.icon}`} aria-hidden="true" />
          </span>
        )}
        {/* Text trigger */}
        {triggerOptions.type === 'text' && (
          <div
            className={`${
              triggerOptions.size ? `is-${triggerOptions.size}` : ''
            } ${triggerOptions.color ? `has-text-${textTriggerColor}` : ''}`}
          >
            {triggerOptions.label}
          </div>
        )}
      </div>
      {/* Dropdown menu */}
      {!isDisabled && (
        <div
          className="dropdown-menu"
          style={{ textAlign: 'left' }}
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            {items
              .filter(
                (item) =>
                  item.shouldBeDisplayed === undefined ||
                  item.shouldBeDisplayed === true,
              )
              .map((item, index: number) => (
                <Fragment key={`${new Date().toISOString()}__${Math.random()}`}>
                  <div
                    onClick={() =>
                      item.handleClick ? item.handleClick() : () => {}
                    }
                    className={`dropdown-item ${
                      item.color ? `is-${item.color}` : ''
                    }`}
                    style={{ cursor: 'pointer' }}
                    aria-hidden="true"
                  >
                    {item.hasSeparation && index > 0 && (
                      <hr className="dropdown-divider" />
                    )}
                    {item.type === 'text' && item.label}
                    {item.type === 'checkbox' && (
                      <div>
                        <input
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={() => {}}
                        />
                        <span className="ml-2">{item.label}</span>
                      </div>
                    )}
                    {item.hasSeparation && index === 0 && (
                      <hr className="dropdown-divider" />
                    )}
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
Dropdown.defaultProps = {
  badgeOptions: undefined,
  isDisabled: false,
  float: 'right',
};
export { Dropdown };
