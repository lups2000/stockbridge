import { FC, useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Advert, getAllAdverts } from '../../api/collections/advert';
import { Title } from '../Text/Title';
import { Filters } from './Filters';
import Tabs from '../ContentTabs/Tabs';
import ContentTab from '../ContentTabs/ContentTab';
import { AdvertsTabContent } from './AdvertsTabContent';
const AdvertsSection: FC = () => {
  const [adverts, setAdverts] = useState([] as Advert[]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedAdverts = await getAllAdverts();
      setAdverts(fetchedAdverts);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        marginTop: '100px',
        marginBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title style={{ fontSize: 36, textAlign: 'center', paddingTop: 20 }}>
        Active Adverts
      </Title>
      <Stack
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '15px',
          marginTop: '30px',
        }}
      >
        <Filters />
        <div
          style={{
            width: '100%',
          }}
        >
          <div
            style={{
              marginLeft: '5%',
            }}
          >
            <Tabs>
              <ContentTab title="Selling">
                <AdvertsTabContent
                  adverts={adverts.filter((a) => a.type === 'Sell')}
                />
              </ContentTab>
              <ContentTab title="Buying">
                <AdvertsTabContent
                  adverts={adverts.filter((a) => a.type === 'Ask')}
                />
              </ContentTab>
            </Tabs>
          </div>
        </div>
      </Stack>
    </div>
  );
};

export { AdvertsSection };
