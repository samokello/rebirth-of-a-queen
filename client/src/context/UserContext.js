import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user', err);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
