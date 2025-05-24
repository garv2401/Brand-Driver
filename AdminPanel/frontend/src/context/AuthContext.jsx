import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Optional: useful for auth gating

  const fetchUser = async () => {
    try { 
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(res.data.user); 
      console.log(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <AuthContext.Provider value={{ user, setUser,fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
