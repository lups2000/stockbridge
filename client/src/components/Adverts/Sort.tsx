import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { palette } from '../../utils/colors';
import { useSearchParams } from 'react-router-dom';

enum SortTypes {
  NONE = 'none',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  QUANTITY_ASC = 'quantity',
  QUANTITY_DESC = '-quantity',
  DATE_ASC = 'createdAt',
  DATE_DESC = '-createdAt',
}

/**
 * Component that manages the sorting.
 */
export const Sort: FC = () => {
  const [search, setSearch] = useSearchParams();

  const [sortingType, setSortingType] = useState<string>(search.get("sort") ?? SortTypes.NONE);

  const handleClick = (type: SortTypes) => {
    setSortingType(type);

    if (type !== SortTypes.NONE) {
      search.set('sort', type);
      setSearch(search, { replace: true });
    } else {
      search.delete('sort');
      setSearch(search, { replace: true });
    }
  };

  const beautifyType = (type: SortTypes) => {
    if (type === SortTypes.DATE_ASC || type === SortTypes.DATE_DESC) {
      if (type.includes('-')) {
        return type.replace(type, 'Most Recent');
      } else {
        return type.replace(type, 'Least Recent');
      }
    } else { //all other cases I keep the same text
      if (type.includes('-')) {
        return type.replace('-', 'descending ');
      } else {
        if (type !== 'none') {
          return 'ascending ' + type;
        } else {
          return type;
        }
      }
    }
  };

  return (
    <Dropdown style={{zIndex: 1000}}>
      <Dropdown.Toggle
        style={{ backgroundColor: palette.subSectionsBgAccent, border: 'none' }}
        id="dropdown-basic"
      >
        Sort By: {beautifyType(sortingType as SortTypes)}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.values(SortTypes)
          .map((value) => value)
          .map((type, index) => {
            return (
              <Dropdown.Item key={index} onClick={() => handleClick(type)}>
                {beautifyType(type)}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
