// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Color } from '../../types/color.type';
import { Size } from '../../types/size.type';
import { Dropdown, DropdownItemType } from './Dropdown';
import SearchBar from './SearchBar';

export enum DisplayCriteria {
  HAS_AT_LEAST_ONE_SELECTED_ELEMENT,
}
export type MenuOptions = {
  searchField?: {
    searchInput: string;
    handleChange: (search: string) => void;
    resetSearch: () => void;
  };
  filterColumn?: {
    dropdownItems: DropdownItemType[];
    badgeValue: number;
  };
  actions?: DropdownItemType[];
  newButton?: {
    label: string;
    color: Color;
    size: Size;
    handleClick: (ids?: string[]) => void;
    displayCriteria?: DisplayCriteria;
  };
};
export interface MenuProps {
  menuOptions?: MenuOptions;
  selectedElementIds?: string[];
}

const Menu: React.FC<MenuProps> = ({
  menuOptions,
  selectedElementIds,
}: MenuProps) => {
  const shouldDisplayFilterColumnsDropdown = menuOptions?.filterColumn;
  const shouldDisplayActionsDropdown =
    menuOptions?.actions &&
    menuOptions?.actions.length > 0 &&
    (selectedElementIds?.length || 0) !== 0;
  const numberOfSelectedElements = selectedElementIds?.length || 0;
  const isAtLeastOneElementSelected = numberOfSelectedElements >= 1;
  return (
    <>
      {menuOptions && (
        <div className="columns is-fullwidth is-mobile is-centered is-vcentered mb-5">
          {/* Search field */}
          {menuOptions?.searchField && (
            <div className="column">
              <SearchBar
                searchInput={menuOptions?.searchField.searchInput}
                placeholder="Rechercher un champ"
                handleChange={(s: string) => {
                  menuOptions?.searchField?.handleChange(s);
                }}
              />
            </div>
          )}
          {/* Filter column */}
          {shouldDisplayFilterColumnsDropdown && menuOptions?.filterColumn && (
            <div className="column is-narrow">
              <Dropdown
                triggerOptions={{
                  type: 'text',
                  label: 'Colonnes',
                  size: 'normal',
                  color: 'black',
                  activeColor: 'link',
                }}
                badgeOptions={{
                  value: menuOptions?.filterColumn.badgeValue,
                }}
                items={menuOptions?.filterColumn.dropdownItems}
                float="right"
              />
            </div>
          )}
          {/* Actions */}
          {shouldDisplayActionsDropdown && menuOptions?.actions && (
            <div className="column is-narrow">
              <Dropdown
                triggerOptions={{
                  type: 'button',
                  label: 'Actions',
                  size: 'normal',
                  color: 'primary',
                }}
                badgeOptions={{
                  color: 'danger',
                  value: numberOfSelectedElements,
                }}
                items={menuOptions?.actions.map((e) => ({
                  ...e,
                  type: 'text',
                  label: e.label,
                  handleClick: () =>
                    e.handleClick && e.handleClick(selectedElementIds),
                }))}
                isDisabled={!isAtLeastOneElementSelected}
                float="right"
              />
            </div>
          )}
          {/* New button */}
          {menuOptions?.newButton && (
            <div className="column is-narrow">
              <button
                type="button"
                className={`button ${
                  menuOptions.newButton.color
                    ? `is-${menuOptions.newButton.color}`
                    : ''
                } ${
                  menuOptions.newButton.size
                    ? `is-${menuOptions.newButton.size}`
                    : ''
                }`}
                onClick={() => {
                  menuOptions.newButton?.handleClick(selectedElementIds || []);
                }}
                disabled={
                  menuOptions.newButton?.displayCriteria ===
                    DisplayCriteria.HAS_AT_LEAST_ONE_SELECTED_ELEMENT &&
                  !isAtLeastOneElementSelected
                }
              >
                {menuOptions.newButton.label}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
Menu.defaultProps = {
  menuOptions: undefined,
  selectedElementIds: [],
};
export default Menu;
