import React, { FC, useContext, useState } from 'react';
import userLogo from '../assets/user-logo.svg';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../assets/logout.svg';
import { ApiClient } from '../api/apiClient';
import { LoginContext } from '../contexts/LoginContext';
import useMediaQuery from '../hooks/useMediaQuery';
import questionIcon from '../assets/question-circle.svg';
import premiumIcon from '../assets/bookmark-star.svg';
import storeIcon from '../assets/shop.svg';
import buyingIcon from '../assets/box-seam.svg';
import advertIcon from '../assets/cash-stack.svg';
import sellingIcon from '../assets/cash-coin.svg';

enum DropdownItemType {
  ADVERTS = 'My Adverts',
  SELLING = 'Selling',
  BUYING = 'Buying',
  PROFILE = 'Store Details',
  PREMIUM = 'Premium',
  HELP = 'Help',
  LOGOUT = 'Logout',
}

interface DropdownItem {
  index: number;
  type: DropdownItemType;
  icon: string;
}

export const UserIconDropdown: FC = () => {
  const matches = useMediaQuery('(min-width: 992px)');
  const { setLoggedIn } = useContext(LoginContext);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const elementsDropdown: DropdownItem[] = [
    {
      index: 0,
      type: DropdownItemType.ADVERTS,
      icon: advertIcon,
    },
    {
      index: 1,
      type: DropdownItemType.SELLING,
      icon: sellingIcon,
    },
    {
      index: 2,
      type: DropdownItemType.BUYING,
      icon: buyingIcon,
    },
    {
      index: 3,
      type: DropdownItemType.PROFILE,
      icon: storeIcon,
    },
    {
      index: 4,
      type: DropdownItemType.PREMIUM,
      icon: premiumIcon,
    },
    {
      index: 5,
      type: DropdownItemType.HELP,
      icon: questionIcon,
    },
    {
      index: 6,
      type: DropdownItemType.LOGOUT,
      icon: logoutIcon,
    },
  ];

  const navigate = useNavigate();

  const toggleDropDown = () => setDropdownOpen(!isDropdownOpen);

  const handleItemClick = (item: DropdownItem) => {
    if (item.type === DropdownItemType.LOGOUT) {
      // Handle logout click
      handleLogoutClick();
    } else {
      navigate(`/userInfo?select=${item.index}`);
    }
    setDropdownOpen(false); // Close dropdown
  };

  const DropdownList = elementsDropdown.map((el, index) => (
    <div
      key={index}
      onClick={() => handleItemClick(el)}
      style={{
        cursor: 'pointer',
        textAlign: 'center',
        padding: 8,
        transition: 'background-color 0.3s',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f1f1f1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Image
        src={el.icon}
        alt="icon"
        width={16}
        height={16}
        style={{
          marginRight: 8,
          filter: el.type !== 'Logout' ? 'invert(100%)' : undefined,
        }}
      />
      <span>{el.type}</span>
    </div>
  ));

  const handleLogoutClick = () => {
    new ApiClient()
      .post('/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setLoggedIn(false);
        navigate('/'); //come back to homepage
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDropdownMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div
      style={{ position: 'relative', height: 40 }}
      onMouseEnter={handleDropdownMouseEnter}
      onMouseLeave={handleDropdownMouseLeave}
    >
      <Image
        src={userLogo}
        alt="user info"
        width={40}
        height={40}
        style={{
          cursor: 'pointer',
          position: matches ? undefined : 'absolute',
          right: matches ? undefined : 0,
        }}
        onClick={toggleDropDown}
      />
      {isDropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: 'white',
            border: '1px solid gray',
            borderRadius: 10,
            overflow: 'auto',
            width: 150,
            zIndex: 2,
          }}
        >
          {DropdownList}
        </div>
      )}
    </div>
  );
};
