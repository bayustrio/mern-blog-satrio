import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataUser } from "../Redux/Action/User-Action";
import { Toaster } from "react-hot-toast";
import CardProfile from "../components/Profile/CardProfile";
import StoryDetail from "../components/Profile/StoryDetail";
const Profile = () => {
  // STATE
  const [showConf, setShowConf] = useState(false);
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.User.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataUser());
  }, [dispatch]);
  return (
    <>
      <div className=" xl:px-[12rem] lg:px-[12rem] md:px-[8rem] px-2 sm:px-[5rem] w-full dark:bg-darkGray   bg-lightYellow  min-h-sreen flex lg:flex-row md:flex-row xl:flex-row justify-center items-center">
        <div className="w-full">
          <CardProfile user={user} />
        </div>
      </div>
    </>
  );
};

export default Profile;
