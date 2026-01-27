import { createContext, useState, useEffect } from "react";
import { dumyData } from "../dumyData";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(dumyData.users));
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    const found = JSON.parse(localStorage.getItem("users")).find(
      u => u.email === email && u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return found; 
    }

    return null; 
  };

  // اضفت هنا navigate كـ argument
  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("user");
    if (navigate) navigate("/login"); // redirect للـ login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
