//import { PostOrSearch } from '../components/Home/PostOrSearch';
import { Page } from '../components/Page';
import { AdvertsSection } from '../components/Home/AdvertsSection';
import { Instructions } from '../components/Home/Instructions';
import { MainArea } from '../components/Home/MainArea';

export function Home() {

  return (
    <Page>
      <div
        style={{
          marginBottom: '100px',
        }}
      >
        {/*<PostOrSearch />*/}
        <MainArea />
        <Instructions />
        <AdvertsSection />
      </div>
    </Page>
  );
}
