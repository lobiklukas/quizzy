import { Transition } from "@headlessui/react";
import {
  ChevronLeftIcon
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { TABS, useTabStore } from "../store/tabStore";

export interface ISidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
  const { activeTab, setActiveTab } = useTabStore((state) => ({
    activeTab: state.activeTab.id,
    setActiveTab: state.setActiveTab,
  }));
  const [isShrinked, setIsShrinked] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width && width < 1024) {
      setIsShrinked(false);
    }
  }, [width]);

  return (
    <div className="lg:drawer-open drawer relative h-full">
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
            "menu h-full relative items-center gap-4 bg-base-100 p-4 text-base-content transition-all duration-300 ease-in-out",
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
          {TABS.map((tab) => (
            <li
              key={tab.id}
              className="w-full transition-all duration-300 ease-in-out"
            >
              <span
                onClick={() => setActiveTab(tab)}
                className={clsx("pl-5", activeTab === tab.id && "active")}
              >
                {tab.icon}
                {!isShrinked && (
                  <span className="transition-none">{tab.title}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
