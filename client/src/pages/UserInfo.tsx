import { useContext, useEffect, ReactElement } from 'react';
import { Page } from '../components/Page';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { palette } from '../utils/colors';
import useMediaQuery from './../hooks/useMediaQuery';
import { ProfileSectionTab } from '../components/ContentTabs/ProfileSectionTab';
import MyAdvertsContent from '../components/Profile/ProfileSectionsContent/MyAdvertsContent';
import SellingContent from '../components/Profile/ProfileSectionsContent/SellingContent';
import BuyingContent from '../components/Profile/ProfileSectionsContent/BuyingContent';
import PremiumContent from '../components/Profile/ProfileSectionsContent/PremiumContent';
import HelpQaContent from '../components/Profile/ProfileSectionsContent/HelpQaContent';
import StoreDetailsForm from '../components/Profile/StoreDetails/StoreDetailsForm';
import { LoginContext } from '../contexts/LoginContext';
import { Spinner } from 'react-bootstrap';
import SelectedTabContext from '../contexts/SelectedTabContext';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';

/**
 * Contains the tabs displayed on the sidebar of the profile page and their corresponding content
 */
const leftTabs: {
  text: string;
  link: string;
  icon: string;
  content: ReactElement;
  isSelected: boolean;
}[] = [
  {
    text: 'My Adverts',
    link: 'MyAdverts',
    icon: 'bi-cash-stack',
    content: <MyAdvertsContent />,
    isSelected: false,
  },
  {
    text: 'Selling',
    link: 'Selling',
    icon: 'bi-cash-coin',
    content: <SellingContent />,
    isSelected: true,
  },
  {
    text: 'Buying',
    link: 'Buying',
    icon: 'bi-box-seam',
    content: <BuyingContent />,
    isSelected: false,
  },
  {
    text: 'Store Details',
    link: 'StoreDetails',
    icon: 'bi-shop',
    content: <StoreDetailsForm />,
    isSelected: false,
  },
  {
    text: 'Premium',
    link: 'Premium',
    icon: 'bi-bookmark-star',
    content: <PremiumContent />,
    isSelected: false,
  },
  {
    text: 'Help And FAQ',
    link: 'HelpAndFAQ',
    icon: 'bi-question-circle',
    content: <HelpQaContent children={[]} />,
    isSelected: false,
  },
];

/**
 * The page containing the user information (profile): Ads, Offers, Subsriptions...
 */
export function UserInfo() {
  const history = createBrowserHistory();
  const { loggedIn, isLoading } = useContext(LoginContext);
  const matches = useMediaQuery('(min-width: 1070px)');
  const tabContext = useContext(SelectedTabContext);
  const navigate = useNavigate();

  /**
   * Sets the link to the active tab.
   */
  useEffect(() => {
    // If not logged in, redirect to home page
    if (!loggedIn) {
      navigate('/signIn');
    }

    try {
      history.push(`?${leftTabs[tabContext.selectedProfileSection].link}`);
    } catch {
      navigate('/404'); //not found page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabContext.selectedProfileSection]);

  return (
    <Page>
      <ProfileHeader />

      <div className="row" style={{ maxWidth: '100%' }}>
        <div
          className={
            matches
              ? 'col-2 profile-section-container'
              : 'profile-section-container justify-content-center'
          }
          style={{
            left: 0,
            paddingRight: 0,
            minHeight: matches ? '70em' : '',
            backgroundColor: palette.subSectionsBgLighter,
            alignItems: 'center',
            display: 'flex',
            flexDirection: matches ? 'column' : 'row',
          }}
        >
          <div
            className="sections-container"
            style={{
              marginTop: matches ? '40%' : '',
              flexDirection: 'column',
              gap: 0,
              width: '100%',
            }}
          >
            {leftTabs.map((section, sectionIndex) => {
              return (
                <ProfileSectionTab
                  key={sectionIndex}
                  title={section.text}
                  icon={section.icon}
                  index={sectionIndex}
                  selectedTab={tabContext.selectedProfileSection}
                  setSelectedTab={tabContext.setSelectedProfileSection}
                />
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <Spinner
            animation="grow"
            role="status"
            style={{ position: 'absolute', left: '50%', top: '50%' }}
          />
        ) : (
          <div
            className={matches ? 'col-10' : ''}
            style={{ paddingTop: '5em' }}
          >
            {leftTabs[tabContext.selectedProfileSection].content}
          </div>
        )}
      </div>
    </Page>
  );
}
