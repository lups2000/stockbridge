import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { palette } from '../../../utils/colors';

export enum SortTypes {
  NONE = 'none',
  DATE_ASC = 'Date (ascending)',
  DATE_DESC = 'Date (descending)',
  RATING_ASC = 'Rating (ascending)',
  RATING_DESC = 'Rating (descending)',
}

interface SortProps {
    onModalitySelected: (type: SortTypes) => void
}

export const Sort: FC<SortProps> = (props) => {
  const [sortingType, setSortingType] = useState<SortTypes>(SortTypes.NONE);


  const handleClick = (type: SortTypes) => {
    setSortingType(type)
    props.onModalitySelected(type)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{ backgroundColor: palette.subSectionsBgAccent, border: 'none' }}
        id="dropdown-basic"
      >
        Sort By: {sortingType}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.values(SortTypes)
          .map((value) => value)
          .map((type, index) => {
            return (
              <Dropdown.Item key={index} onClick={() => handleClick(type)}>
                {type}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
