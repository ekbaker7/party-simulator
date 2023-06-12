"use client";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Resources from "@/data/resources";
import NavBarItem from "./NavBarItem";

function NavBar() {
  const { loading, user, error } = useContext(AuthenticationContext);
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user]);

  return (
    <nav className="bg-slate-900 text-white p-2 flex justify-between">
      <Link href="/home" className="font-bold text-white font-mono text-2xl">
        { Resources.HOME_PAGE_HEADER }
      </Link>
      <ul className="my-auto text-left cursor-pointer flex-grow">
        <NavBarItem resourceString={Resources.NAVBAR_MENU_ITEM_CHARACTERS } href="/home" />
        <NavBarItem resourceString={Resources.NAVBAR_MENU_ITEM_EVENTS } href="/home" />
      </ul>
      <div>
        {loading ? null : (
          <div className="flex">
            {user && (
              <>
              <Link href="/profile" className="text-white mr-10 my-auto hover:underline">{user.username}</Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-400 text-white mr-3 border p-1 px-4 rounded my-auto"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
