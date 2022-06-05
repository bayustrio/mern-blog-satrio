import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  DeleteStory,
  getDataStory,
  LikeStory,
} from "../Redux/Action/Story-Action";
import { API } from "../utils/FetchData";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import moment from "moment";
import { a11yDark as dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "prismjs/themes/prism-tomorrow.css";
import ReactMarkdown from "react-markdown";
import Comments from "../components/Comments";
//  STYLE
import "./slug.css";
import CommentItems from "../components/Comment/CommentItems";
import toast, { Toaster } from "react-hot-toast";
import StorySkeleton from "../components/Skeleton/StorySkeleton";
const DetailStory = () => {
  const { slug } = useParams();
  // const user = useSelector((state) => state.Story.slug);
  const detailStory = useSelector((state) => state.Story.detailStory);
  const data = useSelector((state) => state.Story.storySlug);
  const likeStatus = useSelector((state) => state.Story.likeStatus);
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.Comments.Comment);
  const loading = useSelector((state) => state.Alert.loading);

  const [toLike, setToLike] = useState(false);

  useEffect(() => {
    dispatch(getDataStory({ data, slug }));
    detailStory?.data?.likes?.map((item) => setToLike(item._id));
  }, [dispatch]);

  //   HANDLE LIKE
  const handleLike = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(LikeStory({ data, slug }));
    } else {
      toast.error("Please Login");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(DeleteStory({ data, slug }));
  };

  return (
    <div className="xl:px-[12rem] px-3 dark:bg-darkGray bg-lightYellow lg:px-[12rem] md:px-[8rem] sm:px-[5rem] w-full min-h-screen">
      <Toaster />
      <div className="flex flex-col w-full ">
        {loading ? (
          <StorySkeleton />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 mb-5">
                <img
                  className="w-10 h-10 rounded-full"
                  src={`${API}/userPhotos/${detailStory?.data?.author.photo}`}
                />
                <div className="flex flex-col ">
                  <h1 className="dark:text-white font-semibold">
                    {detailStory?.data?.author?.username}
                  </h1>
                  <p className="dark:text-white">
                    {moment(detailStory?.data?.createdAt).format("MMM Do YY")}
                  </p>
                </div>
              </div>
              <div>
                {data?._id === detailStory.data?.author?._id && (
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleDelete}
                      className="h-5 w-5 text-red-500 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <Link to={`/createpost/${slug}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded ">
              <img
                className="rounded"
                src={`${API}/storyImages/${detailStory?.data?.image}`}
              />
            </div>
            <h1 className="font-semibold lg:text-[2.3rem] xl:text-[2.3rem] sm:text-[1.5rem] md:text-[1.5rem] text-[1.5rem] dark:text-white text-center">
              {detailStory.data?.title}
            </h1>
            <ReactMarkdown
              children={detailStory?.data?.content}
              className="dark:text-white mt-4"
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      showLineNumbers
                      children={String(children).replace(/\n$/, "")}
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <pre className="line-numbers">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
              }}
            />
            <div className="my-5 flex gap-1">
              {likeStatus ? (
                <svg
                  onClick={handleLike}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 dark:text-white text-[#747574] cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              ) : (
                <svg
                  onClick={handleLike}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 dark:text-white text-[#747574] cursor-pointer"
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
              )}
              <p className="dark:text-white">{detailStory?.data?.likeCount}</p>
              {/* ===== COMMENTS */}
              <div className="pl-4 relative flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 dark:text-white text-[#747574] cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="dark:text-white">{comment?.length}</p>
              </div>
            </div>
            {data._id ? (
              <Comments />
            ) : (
              <Link
                className="text-blue-500 text-[1.2rem] my-3"
                to={`/login?blogdetail/${slug}`}
              >
                Please Login
              </Link>
            )}
            <CommentItems />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailStory;
