import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import Loading from "../components/loading";

export const AuthContex = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [destination, setDestination] = useState("/");
  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        navigate(destination);
        setIsLoading(false);
      } else {
        navigate("/login");
        setIsLoading(false);
        setUser({});
      }
    });
    return () => {
      unsubscibed();
    };
  }, [destination]);
  const handleHome = () => {
    setDestination("/");
  };
  const handleCategory = () => {
    setDestination("/category");
  };

  const handleFavorites = () => {
    setDestination("/favorites");
  };

  const handleProfile = () => {
    setDestination("/profile");
  };

  return (
    <AuthContex.Provider
      value={{
        user,
        handleHome,
        handleCategory,
        handleFavorites,
        handleProfile,
      }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContex.Provider>
  );
}
