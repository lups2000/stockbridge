import React, { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { BodyText } from '../Text/BodyText';

enum SortTypes {
  NONE = 'Default',
  PRICE = 'Price',
  QUANTITY = 'Quantity',
  DATE = 'Date',
}

/**
 * Component that manages the sorting.
 */
export const Sort: FC = () => {
  const [search, setSearch] = useSearchParams();

  const [sortingType, setSortingType] = useState<string>(
    search.get('sort') ?? SortTypes.NONE,
  );
  // False == order asc , True == order desc
  const [sortOrder, setSortOrder] = useState(false);

  const sortingTypes = Object.values(SortTypes);

  useEffect(() => {
    let type: string = '';
    if (sortOrder) {
      //desc order
      switch (sortingType) {
        case SortTypes.NONE:
          type = '';
          break;
        case SortTypes.PRICE:
          type = 'price';
          break;
        case SortTypes.QUANTITY:
          type = 'quantity';
          break;
        case SortTypes.DATE:
          type = 'createdAt';
          break;
      }
    } else {
      //asc order
      switch (sortingType) {
        case SortTypes.NONE:
          type = '';
          break;
        case SortTypes.PRICE:
          type = '-price';
          break;
        case SortTypes.QUANTITY:
          type = '-quantity';
          break;
        case SortTypes.DATE:
          type = '-createdAt';
          break;
      }
    }
    if (type !== '') {
      search.set('sort', type);
      setSearch(search, { replace: true });
    } else {
      search.delete('sort');
      setSearch(search, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder, sortingType]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentType = event.target.value as SortTypes;

    setSortingType(currentType);

    if (currentType !== SortTypes.NONE) {
      search.set('sort', currentType);
      setSearch(search, { replace: true });
    } else {
      search.delete('sort');
      setSearch(search, { replace: true });
    }
  };

  const handleToggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 34,
        zIndex: 1000,
      }}
    >
      <BodyText
        style={{
          color: '#f86c6c',
          fontWeight: '500',
          fontSize: 23,
          marginBottom: 0,
          marginRight: 10,
        }}
      >
        Sort by
      </BodyText>
      <select
        onChange={handleSortChange}
        style={{
          padding: 6,
          borderRadius: 8,
          borderColor: '#f86c6c',
          color: 'grey',
          height: 34,
          width: 100,
        }}
      >
        {sortingTypes.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Button
        style={{
          alignSelf: 'center',
          background: 'none',
          border: 'none',
        }}
        onClick={handleToggleSortOrder}
      >
        <i
          className={sortOrder ? 'bi bi-sort-down' : 'bi bi-sort-up'}
          style={{
            color: '#f76c6c',
            fontSize: 33,
          }}
        />
      </Button>
    </div>
  );
};
