import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  GetDataSlug,
  handleOnChange,
  postLogin,
} from "../Redux/Action/Auth-Action";
import { createBrowserHistory } from "history";
import { postData } from "../utils/FetchData";
const Login = () => {
  const history = createBrowserHistory();
  const navigate = useNavigate();
  // console.log(history);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Auth.dataAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPass, setConfPass] = useState(false);

  const { username, password, confirmPassword, email } = data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Confirm password not same");
    const data = { history, username, password, email };
    try {
      const { username, password, email, history } = data;
      const url = history.location.search.replace("?", "/");
      const Data = {
        username: username,
        password: password,
        email: email,
      };
      const res = await postData("auth/login", Data);
      if (url) {
        navigate(`${url}`);
      }
      localStorage.setItem("token", res.data.token);
      dispatch(GetDataSlug());
    } catch (err) {
      toast.error(err.response.data.error);
    }
    // dispatch(postLogin(data));
  };
  return (
    <>
      <div className="dark:bg-darkGray bg-lightYellow  bg-center p-4 h-[100vh] items-center">
        <h1 className="text-center text-[3rem] text-slate-800 dark:text-white">
          Login
        </h1>
        <Toaster />
        {/* {loading && <Loading />} */}
        <div className="flex items-center justify-center ">
          <div className="lg:w-[40%] md:w-[40%] border border-gray-300  xl:w-[40%]  w-full px-8 py-6 mt-4 text-left rounded-lg bg-white dark:bg-darkCard dark:border-none">
            <form className="mt-4">
              <div className="mb-4">
                <label className="block dark:text-white text-gray-700 text-sm font-bold mb-2 after:text-red-500 after:content-['*'] htmlFor='username">
                  Email
                </label>
                <input
                  name="account"
                  value={email}
                  onChange={(e) =>
                    dispatch(handleOnChange("email", e.target.value))
                  }
                  className="border border-gray-300 dark:border-none bg-gray-50 dark:bg-darkInput dark:text-white  appearance-none   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer"
                  type="email"
                  placeholder="Email"
                />
                {/* <p className="text-sm m-2 invisible peer-invalid:visible text-red-500">Email invalid</p> */}
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <span className="block dark:text-white text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500">
                  Password
                </span>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) =>
                      dispatch(handleOnChange("password", e.target.value))
                    }
                    className="focus:ring-sky-300 relative  invalid:text-red-500 dark:bg-darkInput  invalid:focus:ring-red-500  appearance-none border border-gray-300 dark:border-none bg-gray-50  rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none dark:text-white"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5  absolute lg:top-2 md:top-2 sm:top-2 top-2 right-[10px] z-[3] dark:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      onClick={() => setShowPassword(!showPassword)}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 lg:top-2 md:top-2 top-2 absolute  right-[10px] z-[3] dark:text-white"
                      fill="none"
                      onClick={() => setShowPassword(!showPassword)}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <span className="block dark:text-white text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500">
                  Confirm password
                </span>
                <div className="relative">
                  <input
                    value={confirmPassword}
                    onChange={(e) =>
                      dispatch(
                        handleOnChange("confirmPassword", e.target.value)
                      )
                    }
                    className="focus:ring-sky-300 relative  invalid:text-red-500 dark:bg-darkInput  invalid:focus:ring-red-500  appearance-none border border-gray-300 dark:border-none bg-gray-50  rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none dark:text-white"
                    type={showConfPass ? "text" : "password"}
                    placeholder="Confirm password"
                  />
                  {showConfPass ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5  absolute lg:top-2 md:top-2 sm:top-2 top-2 right-[10px] z-[3] "
                      fill="none"
                      viewBox="0 0 24 24"
                      onClick={() => setConfPass(!showConfPass)}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 lg:top-2 md:top-2 top-2 absolute  right-[10px] z-[3] dark:text-white"
                      fill="none"
                      onClick={() => setConfPass(!showConfPass)}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full text-bold bg-blue-500 px-[40px] h-[50px] rounded-lg hover:bg-slate-600 text-slate-800"
                  placeholder="Submit"
                >
                  Submit
                </button>
                <Link className="text-blue-500" to="#">
                  Forgot password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
