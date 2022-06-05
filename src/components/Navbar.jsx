import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toggle from "./Dark-Mode/Toggle";
import { API } from "../utils/FetchData";
import Dropdown from "./Profile/Dropdown";
const Navbar = () => {
  const Auth = useSelector((state) => state.Story.storySlug);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <div className="xl:px-[12rem] lg:px-[12rem] px-3 md:px-[8rem] sm:px-[5rem] w-full dark:bg-darkGray  justify-between bg-lightYellow  h-[50px] flex items-center">
        <div>
          <Link className="xl:text-[1.5rem] dark:text-white " to="/">
            Satrio Blog
          </Link>
        </div>
        <div className="justify-end lg:gap-5 xl:gap-5 md:gap-4 sm:gap-4 gap-3 items-center flex">
          <Toggle />
          <ul className="flex items-center lg:gap-5 xl:gap-5 md:gap-4 sm:gap-4 gap-3">
            {localStorage.getItem("token") ? (
              <>
                <Link className="dark:text-white" to="/createpost">
                  Create Post
                </Link>
                <div className="flex flex-col">
                  <img
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-8 h-8 hover:border hover:border-yellow-500  rounded-full cursor-pointer"
                    src={`${API}userPhotos/${Auth.photo}`}
                  />
                  {showDropdown && (
                    <Dropdown
                      showDropdown={showDropdown}
                      setShowDropdown={setShowDropdown}
                      Auth={Auth}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <Link className="dark:text-white" to="/login">
                  Login
                </Link>
                <Link className="dark:text-white" to="/register">
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
