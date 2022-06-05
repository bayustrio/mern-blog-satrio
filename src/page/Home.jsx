import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardBlog from "../components/CardBlog";
import StorySkeleton from "../components/Skeleton/StorySkeleton";
import { getDataPost } from "../Redux/Action/Story-Action";
const Home = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="xl:px-[12rem] px-3 lg:px-[12rem] md:px-[8rem] sm:px-[5rem] dark:bg-darkGray bg-lightYellow w-full min-h-screen">
        <CardBlog />
        {/* <StorySkeleton/> */}
      </div>
    </div>
  );
};

export default Home;
