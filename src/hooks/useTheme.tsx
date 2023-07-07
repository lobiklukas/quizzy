import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

function getPreferredColorScheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  }
  return "light";
}

export const useTheme = () => {
  const savedTheme = useLocalStorage("theme", getPreferredColorScheme());

  useEffect(() => {
    const prefTheme = savedTheme[0] as unknown as string;
    if (prefTheme) {
      setTheme(prefTheme);
    }
  }, []);
  const [theme, setTheme] = useState("light");
  const handleThemeChange = (theme: string) => {
    setTheme(theme);
  };

  return { theme, setTheme: handleThemeChange };
};
