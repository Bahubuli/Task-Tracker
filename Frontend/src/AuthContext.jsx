import React, { createContext, useContext, useState } from "react";
import { API } from "./constants";
const AuthContext = createContext();
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const logout = () => {
    setUser(null);
  };

  async function signup(userData) {
      try {
        const res = await fetch(API + "auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
        credentials: 'include',
      });
       const data = await res.json();
        setUser(data);
        toast.success("sign up successful!")
      } catch (error) {
        setError(error);
      }
  }

  async function login(loginInfo) {
    try {
        const res = await fetch(API + "auth/login", {
            method: "POST",
            body: JSON.stringify(loginInfo),
            headers: { "content-type": "application/json" },
            credentials: 'include',
          });
      const data = await res.json();
      toast.success("logged in  Successfully");

      setUser(data);
    } catch (err) {
      setError(error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      <ToastContainer/>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
