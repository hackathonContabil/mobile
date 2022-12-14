import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext(undefined);

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isSharingBankAccountData, setIsSharingBankAccountData] = useState(false);
  const [user, setUser] = useState({ name: null, email: null, token: null })
  const [isAuth, setIsAuth] = useState(false)

  return <Context.Provider
    value={{
      loading,
      setLoading,
      user,
      setUser,
      isAuth,
      setIsAuth,
      isSharingBankAccountData,
      setIsSharingBankAccountData
    }}
  >
    {children}
  </Context.Provider>;
};

ContextProvider.propTypes = { children: PropTypes.any };

export { Context, ContextProvider };
