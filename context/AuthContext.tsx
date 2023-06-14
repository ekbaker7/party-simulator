"use client";

import { useState, createContext, useEffect } from "react";
import { UserInfoType } from "../data/dbModels";
import axios from 'axios'
import { getCookie } from "cookies-next"

interface State {
  loading: boolean;
  error: string | null;
  user: UserInfoType | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: true,
  user: null,
  error: null,
  setAuthState: () => {},
});

function AuthContext({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    user: null,
    error: null,
  });

  const fetchUser = async () => {
    try { 
      setAuthState({
        loading: true,
        user: null,
        error: null
      });
      const jwt = getCookie("jwt")

      // No user present
      if (!jwt) {
        setAuthState({
          loading: false,
          user: null,
          error: null
        });

        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`

      setAuthState({
        loading: false,
        user: response.data,
        error: null
      });

    } catch (error: any) {
      setAuthState({
        loading: false,
        user: null,
        error: error.response.data.errorMessage,
      });
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthContext;
