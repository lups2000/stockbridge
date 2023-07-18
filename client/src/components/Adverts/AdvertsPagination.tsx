import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { Filters } from './Filters';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Sort } from './Sort';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAdverts } from '../../hooks/useAdverts';
import { AdvertsGrid } from './AdvertsGrid';
import { palette } from '../../utils/colors';
import { Page } from '../Page';

/**
 * Component that gets the advert and manage advert displaying, filters, sorting and pagination.
 */
export const AdvertsPagination: FC = () => {
  const [search, setSearch] = useSearchParams();

  const navigate = useNavigate();

  const [category, setCategory] = useState<string>('');

  const [mapMode, setMapMode] = useState<boolean>(false);

  const getAdverts = useAdverts();

  const adverts = useMemo(() => {
    //UseMemo used to memorize the result of a function (similar to useState)
    return getAdverts.data?.results;
  }, [getAdverts.data]);

  const totalNumberOfPages = useMemo(() => {
    //UseMemo used to memorize the result of a function (similar to useState)
    return getAdverts.data?.totalNumberOfPages ?? 1;
  }, [getAdverts.data]);

  useEffect(() => {
    const cat = search.get('category[in]');
    if (cat !== null && cat !== category) {
      if (cat.includes(',')) {
        //it means that we have selected more than one category
        setCategory('Adverts selected categories');
      } else {
        setCategory(cat);
      }
    } else {
      setCategory('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get('category[in]')]);

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [adverts]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    search.set('page', (selectedItem.selected + 1).toString());
    setSearch(search, { replace: true });
  };

  const handleMapClick = () => {
    setMapMode(!mapMode);
  };

  useEffect(() => {
    search.set('page', '1');
    setSearch(search, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const possibleParamKeys: string[] = [
      'page',
      'category[in]',
      'type',
      'price[gte]',
      'price[lte]',
      'quantity[gte]',
      'quantity[lte]',
      'radius',

      'q', //search

      'sort', //sorting
    ];
    const paramKeys = Array.from(search.keys());

    const areParamsValid = paramKeys.every((key) =>
      possibleParamKeys.includes(key),
    );

    if (areParamsValid) {
      return;
    } else {
      navigate('*'); //not found page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const matches = useMediaQuery('(min-width: 768px)');

  //I am using component <Page> here because I want to display the map full screen.
  return (
    <Page>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: 25,
        }}
      >
        <Stack
          style={{
            display: 'flex',
            flexDirection: matches ? 'row' : 'column',
            marginBottom: 15,
            marginTop: 200,
          }}
        >
          <Filters />
          <AdvertsGrid
            adverts={adverts}
            currentCategory={category}
            totalNumberOfPages={totalNumberOfPages}
            isMapOpen={mapMode}
            handlePageClick={handlePageClick}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              position: 'absolute',
              gap: 30,
              right: 12,
            }}
          >
            <Button
              style={{
                backgroundColor: palette.subSectionsBgAccent,
                border: 'none',
                zIndex: 1000,
              }}
              onClick={handleMapClick}
            >
              {mapMode ? 'Close Map' : 'View on Map'}
            </Button>
            <Sort />
          </div>
        </Stack>
      </div>
    </Page>
  );
};
