import React, { FC, useEffect, useState } from 'react';
import { AdvertType, PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../utils/colors';
import { AdvertCard } from './AdvertCard';
import ReactPaginate from 'react-paginate';
import { Title } from '../Text/Title';
import { Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { CustomMap } from './CustomMap';
import '../override.css';
import useMediaQuery from '../../hooks/useMediaQuery';

interface AdvertGridProps {
  adverts: PopulatedAdvert[] | undefined;
  currentCategory: string;
  totalNumberOfPages: number;
  isMapOpen: boolean;
  handlePageClick: (selectedItem: { selected: number }) => void;
}

/**
 * Component to display the grid with all the adverts.
 * @returns
 */
export const AdvertsGrid: FC<AdvertGridProps> = (props) => {
  const [search, setSearch] = useSearchParams();

  const matches = useMediaQuery('(min-width: 749px)');

  const [advertType, setAdvertType] = useState<AdvertType>(
    search.get('type') === 'Ask'
      ? AdvertType.Ask
      : AdvertType.Sell ?? AdvertType.Sell,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (props.adverts) {
      setIsLoading(false);
    }
  }, [props.adverts]);

  useEffect(() => {
    if (advertType === AdvertType.Ask) {
      search.set('type', 'Ask');
    } else {
      search.set('type', 'Sell');
    }
    setSearch(search, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertType, search]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <FadeLoader color={palette.subSectionsBgAccent} />
        </div>
      ) : (
        <div
          className="row"
          style={{
            marginLeft: !props.isMapOpen ? 50 : 2,
            marginRight: !props.isMapOpen ? 50 : 2,
            display: 'flex',
            justifyContent: !props.isMapOpen && matches ? 'left' : 'center',
            flexWrap: 'wrap',
            gap: 50,
          }}
        >
          <Title
            style={{ fontWeight: 500, textAlign: 'center', marginTop: -125 }}
          >
            {!props.currentCategory
              ? 'All Active Adverts'
              : props.currentCategory}
          </Title>
          {props.adverts ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 50,
              }}
            >
              <Button
                style={{
                  border: 'none',
                  backgroundColor: 'white',
                  paddingLeft: 0,
                }}
                onClick={() => setAdvertType(AdvertType.Sell)}
              >
                <BodyText
                  style={{
                    fontSize: 30,
                    fontWeight: 500,
                    color: palette.subSectionsBgAccent,
                    opacity: advertType === AdvertType.Sell ? 1 : 0.5,
                  }}
                >
                  Selling
                </BodyText>
              </Button>
              <Button
                style={{ border: 'none', backgroundColor: 'white' }}
                onClick={() => setAdvertType(AdvertType.Ask)}
              >
                <BodyText
                  style={{
                    fontSize: 30,
                    fontWeight: 500,
                    color: palette.subSectionsBgAccent,
                    opacity: advertType === AdvertType.Ask ? 1 : 0.5,
                  }}
                >
                  Buying
                </BodyText>
              </Button>
            </div>
          ) : undefined}
          {props.isMapOpen ? (
            props.adverts ? (
              <CustomMap adverts={props.adverts} />
            ) : undefined
          ) : undefined}
          {props.adverts ? (
            props.adverts.length > 0 ? (
              props.adverts.map((item, index) => (
                <div
                  className="col-md-4 mb-4"
                  key={item._id}
                  style={{
                    flex: '1 0 300px',
                    maxWidth: '300px',
                    marginBottom: '20px',
                  }}
                >
                  <AdvertCard
                    key={index}
                    id={item._id}
                    name={item.productname}
                    price={item.price}
                    quantity={item.quantity}
                    icon={item.imageurl}
                    description={item.description}
                    prioritized={item.prioritized}
                    creationDate={item.createdAt}
                    fancyEffect={true}
                    category={item.category}
                  />
                </div>
              ))
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100vh',
                }}
              >
                <BodyText
                  style={{
                    color: '#727272',
                    fontSize: 30,
                    textAlign: 'center',
                  }}
                >
                  No results found
                </BodyText>
              </div>
            )
          ) : undefined}
          <ReactPaginate
            previousLabel="<"
            breakLabel="..."
            nextLabel=">"
            onPageChange={props.handlePageClick}
            pageCount={props.totalNumberOfPages}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </>
  );
};
