"use client";

import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type TUserSession = {
  user: User | null;
  expires?: string;
};

const AuthContext = createContext<TUserSession | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setUser(session?.user || null);
      setLoading(false);
    }
  }, [session, status, loading]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext<TUserSession | null>(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
