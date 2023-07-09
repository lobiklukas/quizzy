import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
// import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import * as React from "react";
import { useSearchStore } from "../store/searchStore";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const MainNavBar: React.FC = () => {
  const { setSearch, search, isSearchEnabled } = useSearchStore((state) => ({
    setSearch: state.setSearch,
    search: state.search,
    isSearchEnabled: state.isSearchEnabled,
  }));
  // const { data: session } = useSession();
    const { push } = useRouter();
  const session = useUser();
  console.log("🚀 ~ file: MainNavBar.tsx:22 ~ session:", session)
  return (
    <div className="navbar flex w-full gap-2 md:mb-8 md:gap-4">
      <div className="flex w-full md:gap-2">
        <div>
          <label
            htmlFor="my-drawer-2"
            className="btn-ghost drawer-button btn p-2 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </label>
        </div>
        {isSearchEnabled && (
          <>
            <MagnifyingGlassIcon className="hidden h-6 w-6 md:block" />
            <div className="relative w-full">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="input-bordered input w-full"
              />
              <button
                className={clsx(
                  "btn-ghost btn-circle btn absolute right-0 transition-all duration-200 ease-in-out",
                  search ? "opacity-100" : "opacity-0"
                )}
                onClick={() => setSearch("")}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="dropdown-end dropdown">
        <label
          tabIndex={0}
          className="btn-ghost btn-circle avatar btn flex w-full flex-nowrap gap-2"
        >
          <div className="w-10 rounded-full">
            {session.user?.imageUrl && (
              <Image
                width={256}
                height={256}
                alt="Profile Picture"
                src={session.user.imageUrl}
              />
            )}
          </div>
          <span className="hidden whitespace-nowrap md:block">
            {session?.user?.username}
          </span>
          <ChevronDownIcon className="hidden h-6 w-6 md:block" />
        </label>
        <ul
          tabIndex={0}
          // eslint-disable-next-line tailwindcss/classnames-order
          className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <li>
        <SignOutButton signOutCallback={()=>push('/')} >
            <button>Logout</button>
        </SignOutButton>
            {/* <a onClick={() => signOut()}>Logout</a> */}
          </li>
        </ul>
      </div>
    </div>
  );
};
