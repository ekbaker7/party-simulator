import axios from "axios";
import { ChangePasswordType, NewUserType } from "../lib/dbModels";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { deleteCookie } from "cookies-next";

const useAuth = () => {
  const { user, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const login = async (
    {
      username,
      password,
    }: {
      username: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    try {
      setAuthState({ loading: true, user: null, error: null });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/login`,
        {
          username,
          password,
        }
      );

      setAuthState({ loading: false, user: response.data, error: null });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        user: null,
        error: error.response.data.errorMessage,
      });
    }
  };

  const signUp = async (newUser: NewUserType, handleClose: () => void) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/signup`,
        { ...newUser }
      );
      setAuthState({ loading: false, user: response.data, error: null });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        user: null,
        error: error.response.data.errorMessage,
      });
    }
  };

  const signOut = () => {
    deleteCookie("jwt");
    setAuthState({
      loading: false,
      user: null,
      error: null,
    });
  };

  const changePassword = async (newPasswordInfo: ChangePasswordType) => {
    try {
      setAuthState({ loading: true, user: user, error: null });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/changePassword`,
        { ...newPasswordInfo }
      );
      
      setAuthState({ loading: false, user: user, error: null });

      if (response.data) {
        return { success: true }
      } else {
        return { success: false }
      }
    } catch (error: any) {
      setAuthState({
        loading: false,
        user: user,
        error: error.response.data.errorMessage,
      });
    }
  };

  return {
    login,
    signUp,
    signOut,
    changePassword
  };
};

export default useAuth;
