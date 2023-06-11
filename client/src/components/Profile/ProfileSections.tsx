import useMediaQuery from './../../hooks/useMediaQuery';
import { FC } from 'react';
import { LeftTab } from './LeftTab';
import questionIcon from './../../assets/question-circle.svg';
import premiumIcon from './../../assets/bookmark-star.svg';
import storeIcon from './../../assets/shop.svg';
import buyingIcon from './../../assets/box-seam.svg';
import advertIcon from './../../assets/cash-stack.svg';
import sellingIcon from './../../assets/cash-coin.svg';

export type ProfileSectionsProps = {
  text: string;
  icon: any;
}[];

const leftTabs: {
  key: string;
  text: string;
  icon: any;
  isSelected: boolean;
}[] = [
  {
    key: 'My Adverts',
    text: 'My Adverts',
    icon: advertIcon,
    isSelected: false,
  },
  {
    key: 'Selling',
    text: 'Selling',
    icon: sellingIcon,
    isSelected: true,
  },
  {
    key: 'Buying',
    text: 'Buying',
    icon: buyingIcon,
    isSelected: false,
  },
  {
    key: 'Store Details',
    text: 'Store Details',
    icon: storeIcon,
    isSelected: false,
  },
  {
    key: 'Premium',
    text: 'Premium',
    icon: premiumIcon,
    isSelected: false,
  },
  {
    key: 'Help and FAQ',
    text: 'Help and FAQ',
    icon: questionIcon,
    isSelected: false,
  },
];

export const ProfileSections: FC = () => {
  const matches = useMediaQuery('(min-width: 768px)');
  return (
    <div
      className="profile-section-container"
      style={{
        position: 'relative',
        left: 0,
        height: '100em',
        //width: "100em",
        borderRadius: 15,
        //backgroundColor: palette.subSectionsBgLighter,
        alignItems: 'center',
        display: matches ? 'flex' : 'none',
        flexDirection: 'column',
      }}
    >
      <div
        className="sections-container"
        style={{
          marginTop: '40%',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {leftTabs.map((section, _) => {
          return (
            <LeftTab
              key={section.key}
              message={section.text}
              icon={section.icon}
              isSelected={section.isSelected}
            />
          );
        })}
      </div>
    </div>
  );
};
