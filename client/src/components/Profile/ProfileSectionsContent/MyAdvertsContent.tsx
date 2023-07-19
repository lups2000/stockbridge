import React, { useContext, useEffect, useState } from 'react';
import Tabs, {
  AdvertSortCriteria,
  OfferSortCriteria,
} from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import ProductInfoBar from '../ProductInfoBar';
import {
  PopulatedAdvert,
  getAdvertsByUser,
  AdvertStatus,
  Advert,
} from '../../../api/collections/advert';
import NoResultsMessage from '../NoResultsMessage';
import { LoginContext } from '../../../contexts/LoginContext';
import LoadingElementsContent from './LoadingElementsContent';
function sortClosed(adverts: (Advert | PopulatedAdvert)[]) {
  return adverts.sort((a, b) => {
    if (a.status === AdvertStatus.Closed && b.status !== AdvertStatus.Closed) {
      return -1;
    } else {
      if (
        b.status === AdvertStatus.Closed &&
        a.status !== AdvertStatus.Closed
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  });
}
/**
 * Component that displays the content of MyAdverts section.
 */
const MyAdvertsContent: React.FC = () => {
  const [buyingAdverts, setBuyingAdverts] = useState([] as PopulatedAdvert[]);
  const [sellingAdverts, setSellingAdverts] = useState([] as PopulatedAdvert[]);
  const { user } = useContext(LoginContext);

  const [searchText, setSearchText] = useState('');
  const [sortCriteria, setSortCriteria] = useState<
    AdvertSortCriteria | OfferSortCriteria
  >(AdvertSortCriteria.NONE);
  const [isLoading, setIsLoading] = useState(true);
  // False == order asc , True == order desc
  const [sortOrder, setSortOrder] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (user) {
          const fetchedAdverts = await getAdvertsByUser(user?._id);
          let sellingAds = fetchedAdverts.filter((x) => x.type === 'Sell');
          sellingAds = sortClosed(sellingAds) as Advert[];
          setSellingAdverts(sellingAds as PopulatedAdvert[]);
          let buyingAds = fetchedAdverts.filter((x) => x.type === 'Ask');
          buyingAds = sortClosed(buyingAds) as Advert[];
          setBuyingAdverts(buyingAds as PopulatedAdvert[]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Filters the displayed adverts based on the search text and sorts it based on
   * the selected criteria in the specified order
   * @param list the list to be filtered and sorted
   * @returns
   */
  function sortedAndFilteredItems(list: PopulatedAdvert[]): PopulatedAdvert[] {
    let result = list
      .filter((x) =>
        x.productname?.toLowerCase().includes(searchText.toLocaleLowerCase()),
      )
      .sort((a, b) => {
        switch (sortCriteria) {
          case AdvertSortCriteria.NONE:
            return 0;
          case AdvertSortCriteria.NAME:
            return (a.productname ?? '').localeCompare(b.productname ?? '');
          case AdvertSortCriteria.DATE:
            return (a.createdAt ?? '') > (b.createdAt ?? '')
              ? 1
              : (a.createdAt ?? '') < (b.createdAt ?? '')
              ? -1
              : 0;
          case AdvertSortCriteria.PRICE:
            return (a.price ?? 0) - (b.price ?? 0);
          case AdvertSortCriteria.Quantity:
            return (a.quantity ?? 0) - (b.quantity ?? 0);
          default:
            return 0;
        }
      });
    if (sortCriteria === AdvertSortCriteria.NONE) {
      result = sortClosed(list) as PopulatedAdvert[];
    }
    return sortOrder ? result : result.reverse();
  }

  return (
    <div>
      <Tabs
        isOffer={false}
        searchText={searchText}
        setSearchText={setSearchText}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      >
        <ContentTab title="Selling Ads">
        {isLoading ? (
            <LoadingElementsContent />
          ) :
          sellingAdverts.length > 0 ? (
            sortedAndFilteredItems(sellingAdverts).map((product, index) => {
              return (
                <ProductInfoBar
                  key={index}
                  productId={product._id}
                  imageUrl={product.imageurl}
                  name={product.productname}
                  date={product.createdAt?.toString().substring(0, 10)}
                  quantity={product.quantity}
                  price={product.price}
                  highlight={searchText}
                  status={product.status}
                />
              );
            })
          ) : (
            <NoResultsMessage />
          )}
        </ContentTab>
        <ContentTab title="Buying Ads">
        {isLoading ? (
            <LoadingElementsContent />
          ) :
          buyingAdverts.length > 0 ? (
            sortedAndFilteredItems(buyingAdverts).map((product, index) => {
              return (
                <ProductInfoBar
                  key={index}
                  productId={product._id}
                  imageUrl={product.imageurl}
                  name={product.productname}
                  date={product.createdAt!.toString().substring(0, 10)}
                  quantity={product.quantity}
                  price={product.price}
                  highlight={searchText}
                  status={product.status ? product.status : undefined}
                />
              );
            })
          ) : (
            <NoResultsMessage />
          )}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default MyAdvertsContent;
