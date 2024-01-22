/* eslint-disable react-refresh/only-export-components */
import { type FC, createContext, type ReactNode, useState, useEffect } from 'react';
import { type RegisterSchema } from './pages/RegisterPage';

interface StoreContextType {
  users: RegisterSchema[];
  setUsers: React.Dispatch<React.SetStateAction<RegisterSchema[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const store = createContext<StoreContextType>({
  users: [],
  setUsers: () => [],
  isLoggedIn: false,
  setIsLoggedIn: () => true || false
});

const StoreProvider: FC<{ children: ReactNode }> = (props) => {
  const [users, setUsers] = useState<RegisterSchema[]>(() =>
    JSON.parse(localStorage.getItem('users') ?? '[]')
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <store.Provider
      value={{
        users,
        setUsers,
        isLoggedIn,
        setIsLoggedIn
      }}>
      {props.children}
    </store.Provider>
  );
};

export default StoreProvider;
