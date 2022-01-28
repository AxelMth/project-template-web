// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import { Id } from '../../../shared/Extension.type';
import Menu, { MenuOptions } from './Menu';
import Notification from './Notification';

interface TableProps<T> {
  columnNames: { [key: string]: string };
  data: T[];
  title?: string;
  menuOptions?: MenuOptions;
  selectedColumnNames?: boolean[];
  submitButtonOptions?: {
    label: string;
    handleClick: (ids: string[]) => void;
  };
}

function Table<T extends Id>({
  columnNames,
  data,
  selectedColumnNames,
  submitButtonOptions,
  title,
  menuOptions,
}: TableProps<T>): JSX.Element {
  const [selectedElements, setSelectedElements] = useState<boolean[]>(
    data.map(() => false),
  );
  const resetSeletedElements = (): void =>
    setSelectedElements(data.map(() => false));
  useEffect(() => {
    resetSeletedElements();
  }, [data]);
  function areAllElementsSelected(): boolean {
    return (
      selectedElements.length !== 0 &&
      selectedElements.reduce(
        (_areAllElementsSelected, isElementSelected) =>
          _areAllElementsSelected && isElementSelected,
        true,
      )
    );
  }
  const numberOfSelectedElements = selectedElements.filter((e) => e).length;
  const isAtLeastOneElementSelected = numberOfSelectedElements >= 1;
  const selectedElementIds = data
    .filter((_, i) => selectedElements[i] === true)
    .map((e) => e._id);
  return (
    <>
      <div className="columns is-multiline is-mobile is-centered is-vcentered">
        {title && (
          <div className="column is-full mb-4">
            <div className="title">{title}</div>
          </div>
        )}
      </div>
      <Menu menuOptions={menuOptions} selectedElementIds={selectedElementIds} />
      {/* No result banner */}
      {data?.length === 0 && menuOptions?.searchField && (
        <Notification
          message="Aucun élément ne correspond à votre recherche"
          type="warning"
          buttonOptions={{
            label: 'Réinitialiser la recherche',
            type: 'link',
            handleClick: menuOptions.searchField.resetSearch,
          }}
          iconOptions={{
            icon: 'exclamation-triangle',
            size: 'large',
            type: 'warning',
          }}
        />
      )}
      {/* Data table */}
      {data?.length > 0 && (
        <div className="columns is-centered">
          <div className="column is-full">
            <div className="table-container has-rounded-border">
              <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                  <tr>
                    <th
                      onClick={() => {
                        const isChecked = areAllElementsSelected();
                        setSelectedElements(data.map(() => !isChecked));
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={areAllElementsSelected()}
                        onChange={() => {}}
                      />
                    </th>
                    {Object.values(columnNames)
                      .filter(
                        (_, colIndex) =>
                          !selectedColumnNames || selectedColumnNames[colIndex],
                      )
                      .map((key: string) => (
                        <th key={`${key}__${Math.random()}`}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map(
                    (
                      row: Record<string, string>,
                      rowIndex: number,
                    ): JSX.Element => (
                      <tr
                        key={`${new Date().toISOString()}__${Math.random()}`}
                        className={`${
                          selectedElements[rowIndex] ? 'is-selected' : ''
                        }`}
                      >
                        <th
                          onClick={() =>
                            setSelectedElements(
                              selectedElements.map((e: boolean, i: number) => {
                                if (i === rowIndex) {
                                  return !e;
                                }
                                return e;
                              }),
                            )
                          }
                        >
                          <input
                            type="checkbox"
                            checked={selectedElements[rowIndex]}
                            onChange={() => {}}
                          />
                        </th>
                        {Object.keys(columnNames)
                          .filter(
                            (_, colIndex) =>
                              !selectedColumnNames ||
                              selectedColumnNames[colIndex],
                          )
                          .map((col: string) => (
                            <td
                              key={`${new Date().toISOString()}__${Math.random()}`}
                            >
                              {row[col]}
                            </td>
                          ))}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Submit button */}
      {isAtLeastOneElementSelected && submitButtonOptions && (
        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            className="button is-primary"
            onClick={() =>
              submitButtonOptions &&
              submitButtonOptions.handleClick(selectedElementIds)
            }
          >
            {submitButtonOptions.label}
          </button>
        </div>
      )}
    </>
  );
}
Table.defaultProps = {
  title: undefined,
  selectedColumnNames: undefined,
  submitButtonOptions: undefined,
  menuOptions: undefined,
};
export default Table;
