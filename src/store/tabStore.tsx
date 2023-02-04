import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import create from "zustand";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";

export const TABS = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: (
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
    ),
    content: <Dashboard />,
  },
  {
    id: "settings",
    title: "Settings",
    icon: <AdjustmentsHorizontalIcon className="h-6 w-6" />,
    content: <Settings />,
  },
];

type Tab = typeof TABS[number];

interface TabState {
  setActiveTab: (content: Tab) => void;
  activeTab: Tab;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: TABS[0] as TabState["activeTab"],
  setActiveTab: (content) => set({ activeTab: content }),
}));
