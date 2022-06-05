import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setEditUser, setUpdatePassword } from "../../Redux/Action/User-Action";
import { API } from "../../utils/FetchData";

const CardProfile = ({ user }) => {
  const username = useRef(null);
  const email = useRef(null);
  //  ==== STATE  ====
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showConf, setShowConf] = useState(false);
  const [showConfirmNewPass, setShowCOnfirmNewPass] = useState(false);
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [UpdateProfile, setUpdateProfile] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { oldPassword, newPassword, confirmPassword } = password;

  const updateProfile = () => {
    let usernameDefault = user.data?.username;
    let emailDefault = user.data?.email;
    let imageDefault = user.data?.email;
    let data = {
      username,
      email,
      image,
      usernameDefault,
      imageDefault,
      emailDefault,
    };
    dispatch(setEditUser(data));
  };

  function handleClick() {
    if (update) {
      handleSubmitPassword();
      //   setUpdate(false);
    } else {
      updateProfile();
    }
  }

  const handleSubmitPassword = () => {
    dispatch(
      setUpdatePassword({
        oldPassword,
        setUpdate,
        newPassword,
        setPassword,
        confirmPassword,
      })
    );
  };

  //   change password
  const handleChangePassword = (e) => {
    setUpdate(true);
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  return (
    <div className="w-full">
      <div className=" min-h-screen w-full  justify-center gap-4  lg:flex-row flex-col flex  h-auto dark:bg-darkGray">
        <Toaster />
        <div className="mt-5 flex border-[1px] dark:border-[#4A5463] justify-center lg:min-h-[70vh] rounded-md bg-white shadow-md p-3  flex-col mx-auto dark:bg-darkCard w-full ">
          <h1 className="text-[1.5rem] font-semibold dark:text-white text-center">
            Setting Profile
          </h1>
          <div className="w-full">
            <div className=" w-full flex-col text-center flex justify-center">
              <div className="lg:w-[40%] mx-auto border-3 dark:border-[#6B7280]">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : `${API}userPhotos/${user.data?.photo}`
                  }
                  className=" border-3 bg-Abuabu dark:bg-[#6B7280] object-cover w-17 lg:h-32  rounded-full w-36 h-36 lg:w-32 mx-auto l lg:rounded-full"
                />
              </div>
              <div className="flex justify-center w-full">
                <label className="w-[50%] lg:w-[40%] mt-3 h-[7vh] dark:text-white flex justify-center items-center dark:bg-BgInput dark:border-gray-500  bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
                  <div>
                    <svg
                      className="lg:w-6 w-5 h-5 sm:w-6 md:w-6 dark:text-[#6B7280]  my-auto mx-auto lg:h-6 md:h-6 sm:h-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <p className="text-center dark:text-[#6B7280] m-auto">
                      Select a file
                    </p>
                  </div>
                  <input
                    onChange={(e) => {
                      const files = e.target.files[0];
                      setImage(files);
                      setImagePreview(URL.createObjectURL(files));
                    }}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-3 lg:flex md:flex sm:flex md:items-center sm:items-center lg:items-center">
            <div className="w-[120px]">
              <h2 className="lg:text-[0.9rem] md:text-[0.9rem] sm:text-[0.9rem] text-md dark:text-white">
                Username
              </h2>
            </div>
            <input
              className="px-2  focus:outline-none focus:ring-0 bg-slate-200  dark:text-white w-full h-[35px] rounded-md dark:border dark:border-slate-400 dark:bg-darkInput "
              type="text"
              ref={username}
              defaultValue={user?.data?.username}
              placeholder="Enter your Username"
            />
          </div>
          <div className="mt-3 lg:flex md:flex sm:flex md:items-center sm:items-center lg:items-center items-center">
            <div className="w-[120px]">
              <h2 className="lg:text-[0.9rem] md:text-[0.9rem] sm:text-[0.9rem] text-md dark:text-white">
                Email
              </h2>
            </div>
            <input
              className="px-2 focus:outline-none bg-slate-200 h-[35px] dark:text-white w-full rounded-md dark:border-lightDark dark:border dark:border-slate-400 dark:bg-darkInput "
              type="email"
              ref={email}
              defaultValue={user?.data?.email}
              placeholder="Enter your Username"
            />
          </div>

          <div className="mt-3 lg:flex md:flex sm:flex md:items-center sm:items-center lg:items-center ">
            <h2 className="lg:text-[0.9rem] md:text-[0.9rem] sm:text-[0.9rem] text-md dark:text-white">
              Old Password
            </h2>
            <div className="relative w-full">
              <input
                className="focus:outline-none bg-slate-200 px-2 h-[35px]  dark:text-white w-full rounded-md dark:border-lightDark dark:bg-darkInput dark:border dark:border-slate-400 "
                type={show ? "text" : "password"}
                value={oldPassword}
                name="oldPassword"
                onChange={handleChangePassword}
                placeholder="Enter your Username"
              />
              {show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:top-2 cursor-pointer md:top-2 top-2 h-5 w-5 absolute  right-[10px] z-[3] dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => setShow(!show)}
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
                  className="h-5 w-5 cursor-pointer lg:top-2 md:top-2 sm:top-2 absolute block my-auto top-2 dark:text-white right-[10px] z-[3]"
                  fill="none"
                  onClick={() => setShow(!show)}
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

          {/* EYE OFF */}
          <div className="mt-3 lg:flex md:flex sm:flex md:items-center sm:items-center lg:items-center">
            <h2 className="lg:text-[0.9rem] md:text-[0.9rem] sm:text-[0.9rem] text-md dark:text-white">
              New Password
            </h2>
            <div className="relative w-full">
              <input
                name="newPassword"
                className="focus:outline-none bg-slate-200 px-2 peer h-[35px]  dark:text-white w-full rounded-md dark:bg-darkInput dark:border dark:border-slate-400 "
                type={showConf ? "text" : "password"}
                value={newPassword}
                onChange={handleChangePassword}
                placeholder="Enter your Username"
              />
              {showConf ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer lg:top-2 md:top-2 sm:top-2 absolute block my-auto top-2 dark:text-white right-[10px] z-[3]"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => setShowConf(!showConf)}
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
                  className="h-5 w-5 cursor-pointer lg:top-2 md:top-2 sm:top-2 absolute block my-auto top-2 dark:text-white right-[10px] z-[3]"
                  fill="none"
                  onClick={() => setShowConf(!showConf)}
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
              {/* {confirmPassword !== password && (
                  <p className="text-red-500">
                    Ups confirm password is the not same
                  </p>
                )} */}
            </div>
          </div>

          {/* confirm new password */}
          <div className="mt-3 lg:flex md:flex sm:flex md:items-center sm:items-center lg:items-center">
            <h2 className="lg:text-[0.9rem] md:text-[0.9rem] sm:text-[0.9rem] text-md dark:text-white">
              New Password
            </h2>
            <div className="relative w-full">
              <input
                className="focus:outline-none bg-slate-200 px-2 peer h-[35px]  dark:text-white w-full rounded-md dark:bg-darkInput dark:border dark:border-slate-400 "
                type={showConfirmNewPass ? "text" : "password"}
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChangePassword}
                placeholder="Enter your Username"
              />
              {showConfirmNewPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer lg:top-2 md:top-2 sm:top-2 absolute block my-auto top-2 dark:text-white right-[10px] z-[3]"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => setShowCOnfirmNewPass(!showConfirmNewPass)}
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
                  className="focus:outline-none h-5 w-5 cursor-pointer lg:top-2 md:top-2 sm:top-2 absolute block my-auto top-2 dark:text-white right-[10px] z-[3]"
                  fill="none"
                  onClick={() => setShowCOnfirmNewPass(!showConfirmNewPass)}
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
              {confirmPassword !== newPassword && (
                <p className="text-red-500">
                  Ups confirm password is the not same
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleClick}
            className={` mt-3 w-[150px] shadow-lg hover:bg-blue-600 text-[1.2rem] h-[45px] rounded-md bg-blue-500 text-white mx-auto`}
          >
            Update {update ? "Password" : ""}
          </button>
        </div>
        <div className="lg:w-[70%] xl:w-[70%] md:w-[70%] w-full overflow-y-auto mt-5 ">
          {/* <BlogId /> */}
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
