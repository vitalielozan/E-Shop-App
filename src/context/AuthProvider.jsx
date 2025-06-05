import React, { useState, useEffect } from "react";
import { AuthContext } from "./context.js";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const login = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };
  const isLoggedIn = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const updateCheckOut = (checkoutData) => {
    const updatedUser = {
      ...user,
      lastCheckout: checkoutData,
    };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        updateCheckOut,
        isLoggedIn,
        login,
        logout,
        setUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
