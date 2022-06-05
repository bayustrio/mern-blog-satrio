import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { API } from "../utils/FetchData";
import CardSkeleton from "./Skeleton/CardSkeleton";
import { getDataPost } from "../Redux/Action/Story-Action";
import ReactMarkdown from "react-markdown";
const CardBlog = () => {
  // STATE
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Story.data);
  // const loading = useSelector((state) => state.Alert.loading);
  useEffect(() => {
    dispatch(getDataPost(setLoading));
  }, [dispatch]);

  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 justify-center ">
        {data.data?.map((item, idx) => (
          <div key={idx}>
            {loading ? (
              <CardSkeleton />
            ) : (
              <div
                key={idx}
                className="flex flex-col w-[100%] rounded bg-white dark:bg-darkInput h-[22rem] overflow-hidden"
              >
                <div className="h-[35vh] overflow-hidden">
                  <img
                    className="object-contain"
                    src={`${API}/storyImages/${item.image}`}
                  />
                </div>
                <div className="px-2 mt-2">
                  <div className="flex gap-2 py-2 items-center">
                    <div>
                      <img
                        className="w-7 h-7 my-auto block rounded-full "
                        src={`${API}userPhotos/${item.author?.photo}`}
                      />
                    </div>
                    <div className=" ">
                      <p className="text-sm dark:text-white leading-3 p-0 m-0 font-semibold">
                        {item.author?.username}
                      </p>
                      <p className="text-sm text-slate-400">
                        {moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`blogdetail/${item.slug}`}
                    className="text-md  font-semibold cursor-pointer text-blue-500"
                  >
                    {item.title.slice(0, 50) + ""}
                  </Link>
                  {/* <div dangerouslySetInnerHTML={{ _html: item.content }} /> */}
                  <ReactMarkdown
                    className="text-black dark:text-white"
                    children={item.content.slice(0, 55) + "..."}
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 dark:text-white text-[#747574] cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span className="text-[0.8rem] my-2 dark:text-white">
                      {item?.likeCount}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardBlog;
