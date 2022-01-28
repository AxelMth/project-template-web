import { useEffect, useState } from 'react';
import { DropdownItemType } from '../components/elements/Dropdown';

export default function useColumnFilter(
  columns: {
    [key: string]: string;
  },
  filterName: string,
): [boolean[], number, DropdownItemType[]] {
  const [selectedColumnNames, setSelectedColumnsNames] = useState(
    Object.values(columns).map(() => true),
  );
  const [isFirstCall, setIsFirstCall] = useState(false);
  useEffect(() => {
    const filterColumnsMemo = localStorage.getItem(
      `${filterName}filterColumns`,
    );
    if (
      !isFirstCall &&
      filterColumnsMemo &&
      filterColumnsMemo.split(',').length === selectedColumnNames.length
    ) {
      setSelectedColumnsNames(
        filterColumnsMemo.split(',').map((e) => e === 'true'),
      );
      setIsFirstCall(true);
    } else {
      localStorage.setItem(
        `${filterName}filterColumns`,
        selectedColumnNames.toString(),
      );
    }
  }, [isFirstCall, selectedColumnNames]);
  const resetSeletedElements = (): void =>
    setSelectedColumnsNames(Object.values(columns).map(() => true));
  const hasAtLeastOneColumnFilterSelected =
    selectedColumnNames.length > 0 &&
    selectedColumnNames.reduce(
      (_hasAtLeastOneColumnFilterSelected, isColumnSelected) =>
        _hasAtLeastOneColumnFilterSelected || isColumnSelected === false,
      false,
    );
  const dropdownItems = Object.values(columns)
    .map(
      (colName, colIndex): DropdownItemType => ({
        type: 'checkbox',
        label: colName,
        handleClick: () => {
          setSelectedColumnsNames(
            selectedColumnNames.map((e, i) => {
              if (i === colIndex) {
                return !selectedColumnNames[colIndex];
              }
              return e;
            }),
          );
        },
        isChecked: selectedColumnNames[colIndex],
      }),
    )
    .concat([
      {
        type: 'text',
        color: 'danger',
        hasSeparation: true,
        handleClick: () => {
          resetSeletedElements();
        },
        label: 'Supprimer les filtres',
        shouldBeDisplayed: hasAtLeastOneColumnFilterSelected,
      },
    ]);
  const badgeValue = dropdownItems.reduce((counter, e) => {
    if (e.type === 'checkbox' && e.isChecked) {
      return counter + 1;
    }
    return counter;
  }, 0);
  return [
    selectedColumnNames,
    badgeValue !== dropdownItems.filter((e) => e.type === 'checkbox').length
      ? badgeValue
      : 0,
    dropdownItems,
  ];
}
