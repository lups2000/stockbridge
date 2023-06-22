import React, { FC, useContext, useState } from 'react';
import userLogo from '../assets/user-logo.svg';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userProfileIcon from '../assets/userProfile.svg';
import logoutIcon from '../assets/logout.svg';
import orderIcon from '../assets/orderBox.svg';
import advertIcon from '../assets/advert.svg';
import { ApiClient } from '../api/apiClient';
import { LoginContext } from '../contexts/LoginContext';

interface DropdownItem {
  title: string;
  icon: string;
}

export const UserIconDropdown: FC = () => {
  const { setLoggedIn } = useContext(LoginContext);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const elementsDropdown: DropdownItem[] = [
    {
      title: 'Profile',
      icon: userProfileIcon,
    },
    {
      title: 'Orders',
      icon: orderIcon,
    },
    {
      title: 'Adverts',
      icon: advertIcon,
    },
    {
      title: 'Logout',
      icon: logoutIcon,
    },
  ];

  const navigate = useNavigate();

  const toggleDropDown = () => setDropdownOpen(!isDropdownOpen);

  const handleItemClick = (item: string) => {
    if (item === 'Profile') {
      // Handle profile click
      navigate('/userInfo');
    } else if (item === 'Logout') {
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
        style={{ marginRight: 8 }}
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

  return (
    <div style={{ position: 'relative' }}>
      <Image
        src={userLogo}
        alt="user info"
        width={45}
        height={45}
        style={{ cursor: 'pointer' }}
        onClick={toggleDropDown}
      />
      {isDropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 5,
            backgroundColor: 'white',
            border: '1px solid gray',
            borderRadius: 10,
            //padding: '10px',
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
