import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export function obterUrlBase() {
  return "https://e2e2-201-86-41-92.ngrok-free.app";
}

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
    } catch (error) {
      console.error("Erro ao salvar o token:", error);
    }
  };


  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
    } catch (error) {
      console.error("Erro ao remover o token:", error);
    }
  };

  const value = {
    userToken,
    isLoading,
    setUserToken,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
