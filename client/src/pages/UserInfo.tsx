import React from 'react';
import { Page } from '../components/Page';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import '../styles/userInfo.css';
import { palette } from '../utils/colors';

import useMediaQuery from './../hooks/useMediaQuery';
import { useState, ReactElement } from 'react';

import { ProfileSectionTab } from '../components/ContentTabs/ProfileSectionTab';
import MyAdvertsContent from '../components/Profile/ProfileSectionsContent/MyAdvertsContent';
import SellingContent from '../components/Profile/ProfileSectionsContent/SellingContent';
import BuyingContent from '../components/Profile/ProfileSectionsContent/BuyingContent';
import PremiumContent from '../components/Profile/ProfileSectionsContent/PremiumContent';
import HelpQaContent from '../components/Profile/ProfileSectionsContent/HelpQaContent';
import StoreDetailsForm from '../components/Profile/StoreDetails/StoreDetailsForm';

/**
 * Contains the tabs displayed on the sidebar of the profile page and their corresponding content
 */
const leftTabs: {
  text: string;
  icon: string;
  content: ReactElement;
  isSelected: boolean;
}[] = [
  {
    text: 'My Adverts',
    icon: 'bi-cash-stack',
    content: <MyAdvertsContent children={[]} />,
    isSelected: false,
  },
  {
    text: 'Selling',
    icon: 'bi-cash-coin',
    content: <SellingContent children={[]} />,
    isSelected: true,
  },
  {
    text: 'Buying',
    icon: 'bi-box-seam',
    content: <BuyingContent children={[]} />,
    isSelected: false,
  },
  {
    text: 'Store Details',
    icon: 'bi-shop',
    content: <StoreDetailsForm />,
    isSelected: false,
  },
  {
    text: 'Premium',
    icon: 'bi-bookmark-star',
    content: <PremiumContent children={[]} />,
    isSelected: false,
  },
  {
    text: 'Help and FAQ',
    icon: 'bi-question-circle',
    content: <HelpQaContent children={[]} />,
    isSelected: false,
  },
];

/**
 * The page containing the user information (profile): Ads, Offers, Subsriptions...
 */
export function UserInfo() {
  const matches = useMediaQuery('(min-width: 768px)');
  const [selectedProfileSection, setSelectedProfileSection] = useState(0);

  return (
    <Page>
      <ProfileHeader />

      <div className="row">
        <div
          className="col-2 profile-section-container"
          style={{
            left: 0,
            minHeight: '100em',
            height: '100%',
            backgroundColor: palette.subSectionsBgLighter,
            alignItems: 'center',
            display: matches ? 'flex' : 'none',
            flexDirection: 'column',
          }}
        >
          <div
            className="sections-container"
            style={{
              marginTop: '40%',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {leftTabs.map((section, sectionIndex) => {
              return (
                <ProfileSectionTab
                  title={section.text}
                  icon={section.icon}
                  index={sectionIndex}
                  selectedTab={selectedProfileSection}
                  setSelectedTab={setSelectedProfileSection}
                />
              );
            })}
          </div>
        </div>

        <div className="col-10" style={{ paddingTop: '5em' }}>
          {leftTabs[selectedProfileSection].content}
        </div>
      </div>
    </Page>
  );
}
