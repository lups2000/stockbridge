import React, { FC, useContext, useState } from 'react';
import userLogo from '../assets/user-logo.svg';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userProfileIcon from '../assets/userProfile.svg';
import logoutIcon from '../assets/logout.svg';
import orderIcon from '../assets/orderBox.svg';
import advertIcon from '../assets/advert.svg';
import premiumIcon from "../assets/premium.svg"
import { ApiClient } from '../api/apiClient';
import { LoginContext } from '../contexts/LoginContext';
import useMediaQuery from '../hooks/useMediaQuery';

interface DropdownItem {
  title: string;
  icon: string;
}

export const UserIconDropdown: FC = () => {
  const matches = useMediaQuery('(min-width: 992px)');
  const { setLoggedIn } = useContext(LoginContext);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const elementsDropdown: DropdownItem[] = [
    {
      title: 'My Adverts',
      icon: advertIcon,
    },
    {
      title: 'Selling',
      icon: orderIcon,
    },
    {
      title: 'Buying',
      icon: orderIcon,
    },
    {
      title: 'Profile',
      icon: userProfileIcon,
    },
    {
      title: 'Premium',
      icon: premiumIcon,
    },
    {
      title: 'Logout',
      icon: logoutIcon,
    },
  ];

  const navigate = useNavigate();

  const toggleDropDown = () => setDropdownOpen(!isDropdownOpen);

  const handleItemClick = (item: string) => {
    //TODO navigation
    if (item === 'Logout') {
      // Handle logout click
      handleLogoutClick();
    }
    setDropdownOpen(false); // Close dropdown
  };

  const DropdownList = elementsDropdown.map((el, index) => (
    <div
      key={index}
      onClick={() => handleItemClick(el.title)}
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
        }}
      />
      <span>{el.title}</span>
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
