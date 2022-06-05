import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StoryDetail from "./StoryDetail";

const Dropdown = ({ Auth, showDropdown, setShowDropdown }) => {
  const navigate = useNavigate();
  return (
    <div className="ease-linear duration-75 ">
      <div className="absolute top-12 xl:right-[12rem] shadow lg:right-[12rem] md:right-[8rem] sm:right-[5rem] right-2 dark:bg-darkInput bg-gray-50 hover:rounded-lg overflow-hidden w-[10rem] h-[6rem] rounded-lg">
        <div className="flex flex-col ">
          <div className="flex p-2 items-center cursor-pointer hover:bg-slate-100">
            <Link
              to={`/profile/${Auth.username}`}
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full dark:text-white"
            >
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Profile
              </div>
            </Link>
          </div>

          <div className="mt-4">
            <button
              onClick={(e) => {
                setShowDropdown(!showDropdown);
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="py-1 rounded text-white mx-auto block px-7 bg-red-400"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
