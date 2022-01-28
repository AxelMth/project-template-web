// eslint-disable-next-line no-use-before-define
import React from 'react';
import { DOCUMENT_COLUMNS } from '../../constants/Table';
import useColumnFilter from '../../hooks/useColumnFilter.hook';
import useSearch from '../../hooks/useSearch.hook';
import { Color } from '../../types/color.type';
import { Size } from '../../types/size.type';
import { DropdownItemType } from '../elements/Dropdown';
import Notification from '../elements/Notification';
import Table from '../elements/Table';
import { DisplayCriteria } from '../elements/Menu';
import { Document } from '../../../shared/Document.type';
import { Id } from '../../../shared/Extension.type';

interface DocumentTableProps {
  title: string;
  documents: (Document & Id)[];
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
const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  title,
  actions,
  newButton,
  submitButtonOptions,
  noDataButtonOptions,
}: DocumentTableProps) => {
  const [filteredData, searchInput, handleChangeSearch] = useSearch<
    Document & Id
  >(documents);
  const [selectedColumnNames, badgeValue, dropdownItems] = useColumnFilter(
    DOCUMENT_COLUMNS,
    'document',
  );
  return (
    <>
      {documents?.length > 0 && (
        <Table
          title={title}
          data={filteredData}
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
          columnNames={DOCUMENT_COLUMNS}
          submitButtonOptions={submitButtonOptions}
        />
      )}
      {documents?.length === 0 && (
        <div className="columns is-mobile is-centered is-vcentered mt-6">
          <div className="column is-full">
            <Notification
              type="warning"
              message="Vous n'avez aucun document"
              height={300}
              iconOptions={{
                icon: 'exclamation-triangle',
                size: 'large',
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
DocumentTable.defaultProps = {
  actions: undefined,
  newButton: undefined,
  noDataButtonOptions: undefined,
  submitButtonOptions: undefined,
};
export default DocumentTable;
