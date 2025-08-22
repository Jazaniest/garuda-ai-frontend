import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, refreshToken } from '../api/userAPI';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await refreshToken();
        setCurrentUser(response.data.name);
        //eslint-disable-next-line
      } catch (error) {
        console.log("Tidak ada sesi aktif atau token refresh gagal.");
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await loginUser(email, password);
      setCurrentUser(response.data.name);
      return true;
    } catch (error) {
      console.error("Login gagal:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login Gagal!");
      return false;
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      await registerUser(name, email, password);
      return true;
    } catch (error) {
      console.error("Registrasi gagal:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Registrasi Gagal!");
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout gagal:", error.response?.data?.message || error.message);
      setCurrentUser(null);
    }
  }, []);

  const value = useMemo(() => ({
    currentUser,
    loading,
    login,
    register,
    logout
  }), [currentUser, loading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};