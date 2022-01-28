// eslint-disable-next-line no-use-before-define
import React from 'react';
import { USER_COLUMNS } from '../../constants/Table';
import useColumnFilter from '../../hooks/useColumnFilter.hook';
import useSearch from '../../hooks/useSearch.hook';
import { Color } from '../../types/color.type';
import { Size } from '../../types/size.type';
import { DropdownItemType } from '../elements/Dropdown';
import Notification from '../elements/Notification';
import Table from '../elements/Table';
import { DisplayCriteria } from '../elements/Menu';
import { User } from '../../../shared/User.type';
import { Id } from '../../../shared/Extension.type';
import { Group } from '../../../shared/Group.type';

interface UserTableProps {
  title?: string;
  pageContext?: string;
  users: (User & Id)[];
  columns?: { [key: string]: string };
  actions?: DropdownItemType[];
  newButton?: {
    label: string;
    color: Color;
    size: Size;
    handleClick: () => void;
    displayCriteria?: DisplayCriteria;
  };
  noDataButtonOptions?: {
    label: string;
    handleClick: () => void;
    type: Color;
  };
  submitButtonOptions?: {
    label: string;
    handleClick: (userIds: string[]) => void;
  };
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  pageContext,
  title,
  columns,
  actions,
  newButton,
  submitButtonOptions,
  noDataButtonOptions,
}: UserTableProps) => {
  const [filteredData, searchInput, handleChangeSearch] = useSearch<User & Id>(
    users,
    {
      groups: (gs: Group[]): string => gs.map((g) => g.name).join(' '),
    },
  );
  const [selectedColumnNames, badgeValue, dropdownItems] = useColumnFilter(
    columns || USER_COLUMNS,
    pageContext || 'user',
  );
  return (
    <>
      {users?.length > 0 && (
        <Table
          title={title}
          data={filteredData.map((e: (User & Id) & { groups?: Group[] }) => ({
            ...e,
            groups: e?.groups?.map((g: Group) => (
              <span
                key={`${new Date().toISOString()}__${Math.random()}`}
                className={`tag has-${
                  g.color && typeof g.color === 'string'
                    ? g.color.toLowerCase()
                    : 'light'
                }-background`}
              >
                {g.name}
              </span>
            )),
          }))}
          menuOptions={{
            searchField: {
              searchInput,
              handleChange: handleChangeSearch,
              resetSearch: () => {
                handleChangeSearch('');
              },
            },
            filterColumn: {
              dropdownItems,
              badgeValue,
            },
            actions,
            newButton,
          }}
          selectedColumnNames={selectedColumnNames}
          columnNames={USER_COLUMNS}
          submitButtonOptions={submitButtonOptions}
        />
      )}
      {users?.length === 0 && (
        <div className="columns is-mobile is-centered is-vcentered mt-6">
          <div className="column is-full">
            <Notification
              type="warning"
              message="Vous n'avez aucun collaborateur"
              height={300}
              iconOptions={{
                icon: 'exclamation-triangle',
                size: 'medium',
                type: 'warning',
              }}
              buttonOptions={
                noDataButtonOptions
                  ? {
                      label: noDataButtonOptions.label,
                      handleClick: noDataButtonOptions.handleClick,
                      type: noDataButtonOptions.type,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
UserTable.defaultProps = {
  title: undefined,
  columns: undefined,
  actions: undefined,
  newButton: undefined,
  noDataButtonOptions: undefined,
  submitButtonOptions: undefined,
  pageContext: undefined,
};
export default UserTable;
