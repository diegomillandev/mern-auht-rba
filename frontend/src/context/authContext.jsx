import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const {} = useQuery({});
};
