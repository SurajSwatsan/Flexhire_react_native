import React, { createContext, useState } from 'react';

// Create the context
export const ProfileContext = createContext();

// Create the provider component
export const ProfileProvider = ({ children }) => {
  const [isUpdatedProfile, setIsUpdatedProfile] = useState(false);

  // Toggle function
  const toggleIsUpdatedProfile = () => {
    setIsUpdatedProfile((prev) => !prev);
  };

  return (
    <ProfileContext.Provider value={{ isUpdatedProfile, toggleIsUpdatedProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
