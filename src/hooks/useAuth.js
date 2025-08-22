import { useContext, createContext } from 'react';

// 1. Pindahkan definisi context ke sini
export const AuthContext = createContext(null);

// 2. Definisikan dan ekspor hook di sini
export const useAuth = () => {
  return useContext(AuthContext);
};