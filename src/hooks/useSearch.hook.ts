import { useEffect, useState } from 'react';
import { cleanStringForSearch } from '../toolbox/string';

export default function useSearch<T>(
  data: T[] | null | undefined = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customParser?: Record<string, (arg: any) => string>,
): [T[], string, (s: string) => void] {
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  function handleChangeSearch(search: string): void {
    if (search && data) {
      setFilteredData(
        data.filter((row: T) =>
          Object.entries(row)
            .map(
              (entry) =>
                (customParser &&
                  customParser[entry[0]] &&
                  customParser[entry[0]](entry[1])) ||
                entry[1],
            )
            .filter((e) => typeof e === 'string')
            .some(
              (e: string) =>
                cleanStringForSearch(e).indexOf(
                  cleanStringForSearch(search),
                ) !== -1,
            ),
        ),
      );
    } else {
      setFilteredData(data);
    }
    setSearchInput(search);
  }
  return [filteredData || [], searchInput, handleChangeSearch];
}
