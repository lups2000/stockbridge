import React, { useState } from 'react';

export type SelectedTabState = {
  selectedProfileSection: number;
  setSelectedProfileSection: (index: number) => void;
};

export const SelectedTabContext = React.createContext<SelectedTabState>({
  selectedProfileSection: 0,
  setSelectedProfileSection: () => null,
});

export default SelectedTabContext;

export type SelectedTabContextProviderType = {
  children: React.ReactNode;
};

export const SelectedTabContextProvider = ({
  children,
}: SelectedTabContextProviderType) => {
  // For losing the context after a page refresh
  let selectTab = 0;
  switch (window.location.search) {
    case '?MyAdverts':
      selectTab = 0;
      break;
    case '?Selling':
      selectTab = 1;
      break;
    case '?Buying':
      selectTab = 2;
      break;
    case '?StoreDetails':
      selectTab = 3;
      break;
    case '?Premium':
      selectTab = 4;
      break;
    case '?HelpAndFAQ':
      selectTab = 5;
      break;
    default:
      selectTab = 0;
      break;
  }

  const [selectedProfileSection, setSelectedProfileSection] =
    useState(selectTab);

  return (
    <SelectedTabContext.Provider
      value={{
        selectedProfileSection,
        setSelectedProfileSection,
      }}
    >
      {children}
    </SelectedTabContext.Provider>
  );
};
