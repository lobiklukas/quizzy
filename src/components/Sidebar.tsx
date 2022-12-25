import { Transition } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

export interface ISidebarProps {
  children: React.ReactNode;
  activeTab: string;
}

const Sidebar: React.FC<ISidebarProps> = ({ children, activeTab }) => {
  const [isShrinked, setIsShrinked] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width && width < 1024) {
      setIsShrinked(false);
    }
  }, [width]);

  return (
    <div className="drawer-mobile drawer relative">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <button
        onClick={() => setIsShrinked(!isShrinked)}
        className={clsx(
          "btn-primary btn-sm btn-circle btn absolute left-[272px] top-10 z-20 hidden transition-all duration-300 ease-in-out lg:flex",
          isShrinked && "left-[80px]"
        )}
      >
        <ChevronLeftIcon
          className={clsx(
            "h-4 w-4 transition-all duration-300 ease-in-out",
            isShrinked && "rotate-180"
          )}
        />
      </button>
      <div className="drawer-content relative flex flex-col items-center">
        {children}
      </div>
      <div className="drawer-side transition-all duration-1000 ease-in-out">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul
          className={clsx(
            "menu relative items-center gap-4 bg-base-100 p-4 text-base-content transition-all duration-300 ease-in-out",
            isShrinked ? "w-24 " : "w-72"
          )}
        >
          <h1 className="m-4 text-center text-4xl font-bold">
            <span
              className={clsx(
                "text-5xl text-primary",
                isShrinked && "text-4xl"
              )}
            >
              Q
            </span>
            <Transition
              as="span"
              show={!isShrinked}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              uizzy
            </Transition>
          </h1>
          <li className="w-full transition-all duration-100 ease-in-out">
            <span
              className={clsx(activeTab === "dashboard" && "active", "pl-5")}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              {!isShrinked && (
                <span className="transition-none">Dashboard</span>
              )}
            </span>
          </li>
          <li className="w-full transition-all duration-300 ease-in-out">
            <span className={clsx(activeTab === "test" && "active", "pl-5")}>
              <AdjustmentsHorizontalIcon className="h-6 w-6" />
              {!isShrinked && <span className="transition-none">Test</span>}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
