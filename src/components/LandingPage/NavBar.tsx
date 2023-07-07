import Link from "next/link";
import { ThemeSwitch } from "../ThemeSwitch";

const pages = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "About",
    href: "/blog",
  },
];

interface INavBarProps {
  theme: string;
  setTheme: (theme: string) => void;
}

function NavBar({ theme, setTheme }: INavBarProps) {
  return (
    <div className="navbar fixed z-10 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {pages.map(({ name, href }) => (
              <li key={name}>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn-ghost btn text-xl normal-case">
          <span className="text-3xl text-primary">Q</span>
          uizzy
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {pages.map(({ name, href }) => (
            <li key={name}>
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <Link href="./app" className="btn-primary btn">
          Get started
        </Link>
        <div>
          <ThemeSwitch
            type="dropdown"
            theme={theme}
            setTheme={setTheme}
            small
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
