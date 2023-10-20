// Create a new file called AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(null);

  return (
    <AuthContext.Provider value={{ userCredentials, setUserCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
