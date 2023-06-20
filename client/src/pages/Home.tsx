import { PostOrSearch } from '../components/Home/PostOrSearch';

import { Page } from '../components/Page';
import { useMediaQuery } from '@mui/material';
import { AdvertsSection } from '../components/Home/AdvertsSection';
import { Instructions } from '../components/Home/Instructions';

export function Home() {
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <Page>
      <div
        style={{
          marginBottom: '100px',
        }}
      >
        <PostOrSearch />
        <Instructions />
        <AdvertsSection />
      </div>
    </Page>
  );
}
