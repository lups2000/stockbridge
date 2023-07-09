import React, { FC, useEffect, useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Filters } from './Filters';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Sort } from './Sort';
import { useSearchParams } from 'react-router-dom';
import { useAdverts } from '../../hooks/useAdverts';
import { AdvertsGrid } from './AdvertsGrid';

/**
 * Component that gets the advert and manage advert displaying, filters, sorting and pagination.
 */
export const AdvertsPagination: FC = () => {
  const [search, setSearch] = useSearchParams();

  const [category, setCategory] = useState<string>('');

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
      setCategory(cat);
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

  useEffect(() => {
    search.set("page","1")
    setSearch(search,{replace: true})
    console.log("ciao")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matches = useMediaQuery('(min-width: 768px)');

  return (
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
          handlePageClick={handlePageClick}
        />
        <div style={{ position: 'absolute', right: 20 }}>
          <Sort />
        </div>
      </Stack>
    </div>
  );
};
