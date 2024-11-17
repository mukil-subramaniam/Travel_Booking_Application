// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       checkAuthStatus();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/auth/me');
//       setUser(response.data);
//     } catch (error) {
//       localStorage.removeItem('token');
//       delete axios.defaults.headers.common['Authorization'];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     const response = await axios.post('http://localhost:5000/api/auth/login', {
//       email,
//       password
//     });
//     const { token, user } = response.data;
//     localStorage.setItem('token', token);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     setUser(user);
//     return user;
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me');
      setUser(response.data);
      setIsLoggedIn(true); // User is logged in
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setIsLoggedIn(false); // User is not logged in
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    setIsLoggedIn(true); // Set logged-in state to true
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsLoggedIn(false); // Reset logged-in state on logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
