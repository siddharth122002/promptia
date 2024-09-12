"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <div className="p-4 flex justify-between">
      <Link href="/" className="flex gap-3">
        <Image src="/assets/logo.svg" width={30} height={30} alt="prompts" />
        <p className="font-bold text-xl md:flex hidden">Promptia</p>
      </Link>
      {/* desktop */}
      <div className="md:flex hidden">
        {session ? (
          <div className="flex gap-3 items-center">
            <Link
              href="/create-prompt"
              className="bg-orange-600 px-3 rounded-full transition-all duration-300 hover:text-orange-600 hover:bg-transparent"
            >
              <button>create</button>
            </Link>
            <button
              onClick={() => signOut()}
              className="hover:bg-orange-600 hover:text-white px-3 rounded-full text-orange-600 transition-all duration-300 "
            >
              sign out
            </button>
            <Link href={`/profile/${session.user.id}`}>
              <Image
                src={session.user?.image}
                width={35}
                height={35}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="bg-orange-600 hover:bg-orange-700 cursor-pointer px-3 rounded-lg"
                >
                  Sign in with Github
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden">
        {session ? (
          <div className="flex">
            <Image
              src={session.user?.image}
              width={35}
              height={35}
              alt="profile"
              className="rounded-full"
              onClick={() => setToggle(!toggle)}
            />

            {toggle && (
              <>
                <div className="shadow-xl bg-zinc-800 absolute right-4 top-20 flex flex-col justify-center items-center gap-3 w-2/4 rounded-lg p-3">
                  <Link
                    href={`/profile/${session.user.id}`}
                    className=""
                    onClick={() => setToggle(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className=""
                    onClick={() => setToggle(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggle(false);
                      signOut();
                    }}
                    className=" text-orange-700 "
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              signIn("github");
            }}
            className="bg-orange-600 hover:bg-orange-700 cursor-pointer px-3 rounded-lg"
          >
            Sign in with Github
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
