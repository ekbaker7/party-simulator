import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-600 h-screen w-screen overflow-hidden">
      <div className="w-full font-mono lg:flex h-screen">
        <div className="z-5 text-white px-10 py-5 w-7/12 text-center bg-slate-900/90 rounded-md blackdrop-blur-sm h-2/3 ml-24 absolute top-[7rem]">
          <div>
            <h1 className="text-5xl tracking-wider">Character Simulator</h1>
            <div className="mt-5">
              A simulator that allows you to generate a party, their
              backgrounds, their relationships, and their fates.
            </div>
            <div className="mt-5">Completely free.</div>
            <div className="mt-5 italic">
              (I don't even know how to make money off of this if I wanted to.)
            </div>
          </div>
        </div>
      </div>
      <div className="w-full font-mono lg:flex h-screen">
        <div className="z-10 px-10 py-5 w-5/12 text-center bg-slate-300 rounded-md blackdrop-blur-sm h-1/3 mr-24 absolute bottom-[7rem]">
          <div className="relative h-full w-full">
            <div className="relative top-1/2 -translate-y-1/2">
              <button className="w-full bg-blue-800 rounded-md p-4 text-white">
                Login
              </button>
              <button className="w-full bg-green-800 rounded-md p-4 text-white mt-10">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
