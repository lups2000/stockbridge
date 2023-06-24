//import { PostOrSearch } from '../components/Home/PostOrSearch';
import { Page } from '../components/Page';
//import { AdvertsSection } from '../components/Home/AdvertsSection';
import { Instructions } from '../components/Home/Instructions';
import { MainArea } from '../components/Home/MainArea';
import { TopCategories } from '../components/Home/TopCategories';
import { TopAdverts } from '../components/Home/TopAdverts';

export function Home() {
  return (
    <Page>
      <div>
        {/*<PostOrSearch />*/}
        <MainArea />
        <Instructions />
        {/*<AdvertsSection />*/}
        <div style={{marginTop: 25, marginBottom: 25}}>
          <div>
            <TopCategories />
          </div>
          <div>
            <TopAdverts />
          </div>
        </div>
      </div>
    </Page>
  );
}
