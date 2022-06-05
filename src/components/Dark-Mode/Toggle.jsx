import React, { useEffect, useState } from "react";
import { ThemeContext } from "../../config/ThemeContent";
import "./toggle.css";

const Toggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [dark, setDark] = useState(false);

  function isDark() {
    return theme === "dark";
  }

  function toggleTheme(e) {
    setDark(!dark);
    setTheme(e.target.checked ? "dark" : "light");
  }

  return (
    <>
      <label className=" toggler  ">
        <input
          type="checkbox"
          id="checkbox"
          className="opacity-0"
          checked={isDark()}
          onChange={(e) => toggleTheme(e)}
        />
        <span className="ball"></span>
        <div className="sun">☀️</div>

        <div className="moon right-[4px] absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </label>
    </>
  );
};

export default Toggle;
