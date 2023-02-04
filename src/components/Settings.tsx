import Image from "next/image";
import * as React from "react";
import { themes } from "../data";
import { useSearchStore } from "../store/searchStore";
import { ThemeSwitch } from "./ThemeSwitch";

const PreviewImages = [
  {
    title: "Dashboard",
    src: "dashboard.png",
    alt: "dashboard-preview",
  },
  {
    title: "Learn",
    src: "learn.png",
    alt: "learn-preview",
  },
  {
    title: "Quiz",
    src: "quiz.png",
    alt: "quiz-preview",
  },
];

const Settings: React.FC = () => {
  const [theme, setTheme] = React.useState(
    (window.localStorage.getItem("theme") || themes[0]?.id) ?? ""
  );

  const setIsSearchEnabled = useSearchStore(
    (state) => state.setIsSearchEnabled
  );

  React.useEffect(() => {
    setIsSearchEnabled(false);
    return () => {
      setIsSearchEnabled(true);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-2 p-8">
      <h1 className="text-4xl font-bold">Settings</h1>
      <span className="divider" />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div>
          <h4 className="text-2xl font-bold">Appearance</h4>
          <h5>Interface theme</h5>
          <p>Select a theme for the interface</p>
        </div>
        <ThemeSwitch type="select" theme={theme} setTheme={setTheme} />
      </div>
      <div className="mt-4">
        <h4 className="text-2xl font-bold">Previews</h4>
        <div className="mt-2 flex gap-4">
          {PreviewImages.map(({ src, alt, title }) => (
            <div key={alt}>
              <Image
                src={`/screenshots/${theme}/${src}`}
                alt={alt}
                className="rounded border border-base-300"
                width={300}
                height={300}
              />
              <p className="mt-1 text-base-content/80">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
