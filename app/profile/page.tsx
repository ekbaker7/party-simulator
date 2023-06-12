"use client";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { AuthenticationContext } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import PasswordChangeInputs from "@/components/profile-page/PasswordChangeInputs";
import { Alert } from "@mui/material";
import Resources from "@/data/resources";

function ProfilePage(props: any) {
  const { loading, user, error } = useContext(AuthenticationContext);
  const [disabled, setDisabled] = useState(true);
  const [successAlert, setSuccessAlert] = useState("");

  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { changePassword } = useAuth();

  useEffect(() => {
    if (loading) {
      setDisabled(true);
      return;
    }

    if (inputs.oldPassword && inputs.newPassword && inputs.confirmPassword) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [inputs, loading]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const clearInputs = () => {
    setInputs({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleClick = async () => {
    if (user && inputs.newPassword !== inputs.oldPassword) {
      const response = await changePassword({
        username: user.username,
        oldPassword: inputs.oldPassword,
        newPassword: inputs.newPassword,
        confirmPassword: inputs.confirmPassword,
      });

      if (response?.success) {
        setSuccessAlert("Password changed successfully!");
        clearInputs();
      }
    }
  };

  return (
    <div className="bg-slate-600 h-[calc(100vh-50px)] w-full overflow-hidden">
      {successAlert && (
        <Alert severity="success" className="mb-9">
          {successAlert}
        </Alert>
      )}
      {error && (
        <Alert severity="error" className="mb-9">
          {error}
        </Alert>
      )}
      <div className="flex justify-between items-center h-full w-full p-10 overflow-hidden">
        {user && (
          <div className="bg-slate-900 text-white m-auto text-center p-4">
            <h1 className="text-3xl border-b">
              {Resources.PROFILE_HELLO_PROMPT} {user.username}!
            </h1>
            <h2 className="font-xl mt-5">
              {Resources.PROFILE_CHANGE_PASSWORD_HEADER}
            </h2>
            <div className="text-black">
              <PasswordChangeInputs
                inputs={inputs}
                handleChangeInput={handleChangeInput}
              />
            </div>
            <div className="">
              <button
                className="btn bg-green-500"
                disabled={disabled}
                onClick={handleClick}
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
