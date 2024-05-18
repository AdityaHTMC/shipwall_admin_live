

import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export const addData = createContext();
export const userDelete = createContext();

const ContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({}); // Initialize with an empty object or some default data

  const [useradd, setUseradd] = useState("");
  const [userdelete, setUserdelete] = useState("");
  

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      <addData.Provider value={{ useradd, setUseradd }}>
        <userDelete.Provider value={{ userdelete, setUserdelete }}>
          {children}
        </userDelete.Provider>
      </addData.Provider>
    </LoginContext.Provider>

  );
};

export default ContextProvider;
