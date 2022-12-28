import create from "zustand";

interface SearchState {
  search: string;
  setSearch: (search: string) => void;
  isSearchEnabled: boolean;
  setIsSearchEnabled: (isSearchEnabled: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  isSearchEnabled: true,
  setIsSearchEnabled: (isSearchEnabled) => set({ isSearchEnabled }),
}));
