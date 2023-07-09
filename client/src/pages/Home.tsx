import { Page } from '../components/Page';
import { Instructions } from '../components/Home/Instructions';
import { MainArea } from '../components/Home/MainArea';
import { TopCategories } from '../components/Home/TopCategories';
import { TopAdverts } from '../components/Home/TopAdverts';

export function Home() {
  return (
    <Page>
      <div>
        <MainArea />
        <Instructions />
        <div style={{ marginTop: 25, marginBottom: 25 }}>
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
