import React, { useState } from "react";

export type SelectedTabState = {
    selectedProfileSection: number,
    setSelectedProfileSection: (index: number) => void
  };

export const SelectedTabContext = React.createContext<SelectedTabState>({
    selectedProfileSection: 0,
    setSelectedProfileSection: () => null
});

export default SelectedTabContext;

export type SelectedTabContextProviderType = {
    children: React.ReactNode;
  };


export const SelectedTabContextProvider = ({
    children,
  }: SelectedTabContextProviderType) => {

    const [selectedProfileSection, setSelectedProfileSection] = useState(0);

    const tabSettings = 
    {
      selectedProfileSection: selectedProfileSection,
      setSelectedProfileSection: setSelectedProfileSection
    }


  
    return (
      <SelectedTabContext.Provider
        value={{
            selectedProfileSection,
            setSelectedProfileSection
        }}
      >
        {children}
      </SelectedTabContext.Provider>
    );
  };