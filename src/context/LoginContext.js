import React, {useState, useContext} from 'react';

const LoginContext = React.createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  console.log('Context.js', isLoggedIn);
  console.log('Context.js', token);

  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, token, setToken}}>
      {children}
    </LoginContext.Provider>
  );
};
