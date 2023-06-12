"use client";

import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

import LoginModal from "./LoginModal";

function LoginArea() {
  const router = useRouter();
  const { loading, user, error } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
    
  }, [loading, user]);

  return (
    <div className="w-full font-mono lg:flex h-screen">
      <div className="z-10 px-10 py-5 w-5/12 text-center bg-slate-300 rounded-md blackdrop-blur-sm h-1/3 min-h-[200px] mr-24 absolute bottom-[5rem]">
        <div className="relative h-full w-full">
          {!loading && (
            <div className="relative top-1/2 -translate-y-1/2">
              <LoginModal isSignIn={true} />
              <LoginModal isSignIn={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginArea;
