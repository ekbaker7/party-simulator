"use client";

import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoginModalInputs from "./LoginModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../../context/AuthContext";
import { CircularProgress, Alert } from "@mui/material";
import Resources from "@/data/resources";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
};

function LoginModal({ isSignIn }: { isSignIn: boolean }) {
  const { loading, user, error } = useContext(AuthenticationContext);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { login, signUp } = useAuth();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (loading) {
      setDisabled(true);
      return;
    }

    if (isSignIn) {
      if (inputs.password && inputs.username) {
        setDisabled(false);
        return;
      }
    } else {
      if (inputs.password && inputs.email && inputs.username && inputs.confirmPassword) {
        setDisabled(false);
        return;
      }
    }

    setDisabled(true);
  }, [inputs, loading]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (isSignIn) {
      await login(
        { username: inputs.username, password: inputs.password },
        handleClose
      );
    } else {
      await signUp(
        {
          email: inputs.email,
          password: inputs.password,
          username: inputs.username,
          confirmPassword: inputs.confirmPassword,
        },
        handleClose
      );
    }
  };

  return (
    <div>
      <button
        className={renderContent(
          "btn bg-blue-800 hover:bg-blue-900",
          "btn bg-green-800 hover:bg-green-900 mt-10"
        )}
        onClick={handleOpen}
      >
        {renderContent(Resources.LOGIN_BTN, Resources.SIGNUP_BTN)}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-slate-600">
          {loading ? (
            <div className="px-2 py-24 h-[600px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px] font-mono">
              {error && (
                <Alert severity="error" className="mb-9">
                  {error}
                </Alert>
              )}
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center border-b mb-10 text-white">
                  {renderContent(
                    Resources.LOGIN_PROMPT,
                    Resources.SIGNUP_PROMPT
                  )}
                </h2>
                <LoginModalInputs
                  inputs={inputs}
                  isSignIn={isSignIn}
                  handleChangeInput={handleChangeInput}
                />
                <button
                  disabled={disabled}
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  onClick={handleClick}
                >
                  {renderContent(
                    Resources.LOGIN_BTN,
                    Resources.CREATE_ACCOUNT_BTN
                  )}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default LoginModal;
