import Image from "next/image";
import Resources from "../data/resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-600 h-screen w-screen overflow-hidden">
      <div className="w-full font-mono lg:flex h-screen">
        <div className="z-5 text-white px-10 py-5 w-7/12 text-left bg-slate-900/90 rounded-md blackdrop-blur-sm h-2/3 min-h-[350px] ml-24 absolute top-[5rem]">
          <div>
            <h1 className="text-5xl tracking-wider">
              {Resources.HOME_PAGE_HEADER}
            </h1>
            <div className="text-left">
              <div className="mt-5">{Resources.HOME_PAGE_SUB_HEADER}</div>
              <div className="mt-5">{Resources.HOME_PAGE_FLAVOR_TEXT_1}</div>
              <div className="mt-5">
                {Resources.TERMINAL_BEGIN}
                <span className="italic">
                  {Resources.HOME_PAGE_FLAVOR_TEXT_2}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="text-white scale-x-[60%] h-[24px] animate-blink inline-block ml-2"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full font-mono lg:flex h-screen">
        <div className="z-10 px-10 py-5 w-5/12 text-center bg-slate-300 rounded-md blackdrop-blur-sm h-1/3 min-h-[200px] mr-24 absolute bottom-[5rem]">
          <div className="relative h-full w-full">
            <div className="relative top-1/2 -translate-y-1/2">
              <button className="btn bg-blue-800 hover:bg-blue-900">
                {Resources.LOGIN_BTN}
              </button>
              <button className="btn bg-green-800 hover:bg-green-900 mt-10">
                {Resources.SIGNUP_BTN}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
